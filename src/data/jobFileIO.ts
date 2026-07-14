import type { Dispatch } from 'react';
import type { Action } from '../state/store';
import type { Job } from '../types/jbi';
import { parseJbi, serializeJob, fileNameFromPath, type ParsedInstHeader } from './jbiFormat';

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
    if (result.paramFileFound) {
      dispatch({
        type: 'SHOW_TOAST',
        toast: { text: `Opened ${fileNameFromPath(result.filePath)}`, kind: 'success' },
      });
    } else {
      dispatch({
        type: 'SHOW_TOAST',
        toast: { text: 'ALL.prm is not found in the folder of job.', kind: 'warning' },
      });
    }
  } catch (err) {
    dispatch({ type: 'SHOW_TOAST', toast: { text: `Failed to open job: ${(err as Error).message}`, kind: 'error' } });
  }
}

async function writeJob(
  dispatch: Dispatch<Action>,
  job: Job,
  instHeader: ParsedInstHeader | undefined,
  filePath: string,
): Promise<void> {
  const api = window.jobEditor;
  if (!api) {
    unavailableToast(dispatch);
    return;
  }
  const content = serializeJob(job, instHeader);
  await api.writeJobFile(filePath, content);
  dispatch({ type: 'JOB_SAVED', filePath, fileName: fileNameFromPath(filePath) });
  dispatch({ type: 'SHOW_TOAST', toast: { text: `Saved ${fileNameFromPath(filePath)}`, kind: 'success' } });
}

export async function saveJobFlow(
  dispatch: Dispatch<Action>,
  job: Job,
  instHeader: ParsedInstHeader | undefined,
): Promise<void> {
  const api = window.jobEditor;
  if (!api) {
    unavailableToast(dispatch);
    return;
  }
  try {
    if (job.filePath) {
      await writeJob(dispatch, job, instHeader, job.filePath);
    } else {
      await saveJobAsFlow(dispatch, job, instHeader);
    }
  } catch (err) {
    dispatch({ type: 'SHOW_TOAST', toast: { text: `Failed to save job: ${(err as Error).message}`, kind: 'error' } });
  }
}

export async function saveJobAsFlow(
  dispatch: Dispatch<Action>,
  job: Job,
  instHeader: ParsedInstHeader | undefined,
): Promise<void> {
  const api = window.jobEditor;
  if (!api) {
    unavailableToast(dispatch);
    return;
  }
  try {
    const filePath = await api.saveAsDialog(`${job.header.name}.JBI`);
    if (!filePath) return;
    await writeJob(dispatch, job, instHeader, filePath);
  } catch (err) {
    dispatch({ type: 'SHOW_TOAST', toast: { text: `Failed to save job: ${(err as Error).message}`, kind: 'error' } });
  }
}
