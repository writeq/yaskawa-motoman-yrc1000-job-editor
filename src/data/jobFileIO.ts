import type { Dispatch } from 'react';
import type { Action, AppState } from '../state/store';
import { parseJbi, serializeJob, fileNameFromPath } from './jbiFormat';

function unavailableToast(dispatch: Dispatch<Action>) {
  dispatch({
    type: 'SHOW_TOAST',
    toast: { text: 'File dialogs require the desktop app (not available in the browser preview).', kind: 'error' },
  });
}

export async function openJobFlow(dispatch: Dispatch<Action>): Promise<void> {
  const api = window.jobEditor;
  if (!api) {
    unavailableToast(dispatch);
    return;
  }
  try {
    const result = await api.openJobDialog();
    if (!result) return;
    const { job, instHeader } = parseJbi(result.content, result.filePath);
    dispatch({ type: 'LOAD_JOB', job, instHeader });
    dispatch({ type: 'SHOW_TOAST', toast: { text: `Opened ${fileNameFromPath(result.filePath)}`, kind: 'success' } });
  } catch (err) {
    dispatch({ type: 'SHOW_TOAST', toast: { text: `Failed to open job: ${(err as Error).message}`, kind: 'error' } });
  }
}

async function writeJob(dispatch: Dispatch<Action>, state: AppState, filePath: string): Promise<void> {
  const api = window.jobEditor;
  if (!api) {
    unavailableToast(dispatch);
    return;
  }
  const content = serializeJob(state.job, state.instHeader);
  await api.writeJobFile(filePath, content);
  dispatch({ type: 'JOB_SAVED', filePath, fileName: fileNameFromPath(filePath) });
  dispatch({ type: 'SHOW_TOAST', toast: { text: `Saved ${fileNameFromPath(filePath)}`, kind: 'success' } });
}

export async function saveJobFlow(dispatch: Dispatch<Action>, state: AppState): Promise<void> {
  const api = window.jobEditor;
  if (!api) {
    unavailableToast(dispatch);
    return;
  }
  try {
    if (state.job.filePath) {
      await writeJob(dispatch, state, state.job.filePath);
    } else {
      await saveJobAsFlow(dispatch, state);
    }
  } catch (err) {
    dispatch({ type: 'SHOW_TOAST', toast: { text: `Failed to save job: ${(err as Error).message}`, kind: 'error' } });
  }
}

export async function saveJobAsFlow(dispatch: Dispatch<Action>, state: AppState): Promise<void> {
  const api = window.jobEditor;
  if (!api) {
    unavailableToast(dispatch);
    return;
  }
  try {
    const filePath = await api.saveAsDialog(`${state.job.header.name}.JBI`);
    if (!filePath) return;
    await writeJob(dispatch, state, filePath);
  } catch (err) {
    dispatch({ type: 'SHOW_TOAST', toast: { text: `Failed to save job: ${(err as Error).message}`, kind: 'error' } });
  }
}
