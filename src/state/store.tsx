import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import type { ControlGroupDef, Job, JobHeader } from '../types/jbi';
import { createMockJob } from '../data/mockJob';
import type { ParsedInstHeader } from '../data/jbiFormat';

export type RibbonTab = 'home' | 'settings';
export type EditMode = 'standard' | 'text';
export type LevelOfInform = 'reduction' | 'standard' | 'extension';

export type DialogName =
  | 'backstage'
  | 'findJump'
  | 'insertInstruction'
  | 'modifyInstruction'
  | 'header'
  | 'createJob'
  | 'modifySpeed'
  | 'positionVariable'
  | 'matchControlGroup'
  | 'selectGroup'
  | 'selectRobot'
  | 'displaySetting'
  | 'selectLanguage'
  | 'conditionFile';

export interface Toast {
  text: string;
  kind: 'success' | 'error';
}

export interface AppState {
  job: Job;
  instHeader: ParsedInstHeader | undefined;
  activeRibbonTab: RibbonTab;
  editMode: EditMode;
  levelOfInform: LevelOfInform;
  selectedLine: number | null;
  clipboard: string | null;
  view: { jobAllDisplay: boolean; logViewer: boolean; statusBar: boolean };
  openDialogs: Set<DialogName>;
  language: string;
  controlGroups: ControlGroupDef[];
  logMessages: string[];
  toast: Toast | null;
}

function initialState(): AppState {
  return {
    job: createMockJob(),
    instHeader: undefined,
    activeRibbonTab: 'home',
    editMode: 'standard',
    levelOfInform: 'standard',
    selectedLine: 1,
    clipboard: null,
    view: { jobAllDisplay: false, logViewer: false, statusBar: true },
    openDialogs: new Set(),
    language: 'English',
    controlGroups: [{ name: 'R1', firstControlGroup: 'R1:ROBOT1', secondControlGroup: '**', master: '**' }],
    logMessages: [],
    toast: null,
  };
}

export type Action =
  | { type: 'SET_RIBBON_TAB'; tab: RibbonTab }
  | { type: 'SET_EDIT_MODE'; mode: EditMode }
  | { type: 'SET_LEVEL_OF_INFORM'; level: LevelOfInform }
  | { type: 'SELECT_LINE'; lineNo: number | null }
  | { type: 'TOGGLE_VIEW'; key: keyof AppState['view'] }
  | { type: 'OPEN_DIALOG'; name: DialogName }
  | { type: 'CLOSE_DIALOG'; name: DialogName }
  | { type: 'CLOSE_ALL_DIALOGS' }
  | { type: 'COPY_LINE' }
  | { type: 'CUT_LINE' }
  | { type: 'PASTE_LINE' }
  | { type: 'TOGGLE_EDIT_LOCK' }
  | { type: 'CLEAR_ALL_EDIT_LOCKS' }
  | { type: 'TOGGLE_COMMENT_MARK' }
  | { type: 'CLEAR_ALL_COMMENT_MARKS' }
  | { type: 'INSERT_LINE'; text: string }
  | { type: 'UPDATE_LINE'; lineNo: number; text: string }
  | { type: 'UPDATE_HEADER'; header: Partial<JobHeader> }
  | { type: 'CREATE_JOB'; name: string; jobFolder: string; controlGroup: string }
  | { type: 'LOAD_JOB'; job: Job; instHeader: ParsedInstHeader }
  | { type: 'JOB_SAVED'; filePath: string; fileName: string }
  | { type: 'SET_LANGUAGE'; language: string }
  | { type: 'SET_CONTROL_GROUPS'; groups: ControlGroupDef[] }
  | { type: 'SHOW_TOAST'; toast: Toast }
  | { type: 'CLEAR_TOAST' }
  | { type: 'LOG'; message: string };

function renumber(lines: Job['lines']): Job['lines'] {
  return lines.map((l, i) => ({ ...l, lineNo: i }));
}

function baseReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_RIBBON_TAB':
      return { ...state, activeRibbonTab: action.tab };
    case 'SET_EDIT_MODE':
      return { ...state, editMode: action.mode };
    case 'SET_LEVEL_OF_INFORM':
      return { ...state, levelOfInform: action.level };
    case 'SELECT_LINE':
      return { ...state, selectedLine: action.lineNo };
    case 'TOGGLE_VIEW':
      return { ...state, view: { ...state.view, [action.key]: !state.view[action.key] } };
    case 'OPEN_DIALOG':
      return { ...state, openDialogs: new Set(state.openDialogs).add(action.name) };
    case 'CLOSE_DIALOG': {
      const next = new Set(state.openDialogs);
      next.delete(action.name);
      return { ...state, openDialogs: next };
    }
    case 'CLOSE_ALL_DIALOGS':
      return { ...state, openDialogs: new Set() };
    case 'COPY_LINE': {
      const line = state.job.lines.find((l) => l.lineNo === state.selectedLine);
      return line ? { ...state, clipboard: line.text } : state;
    }
    case 'CUT_LINE': {
      const line = state.job.lines.find((l) => l.lineNo === state.selectedLine);
      if (!line) return state;
      const lines = renumber(state.job.lines.filter((l) => l.lineNo !== state.selectedLine));
      return {
        ...state,
        clipboard: line.text,
        job: { ...state.job, lines },
        selectedLine: lines[0]?.lineNo ?? null,
      };
    }
    case 'PASTE_LINE': {
      if (state.clipboard === null || state.selectedLine === null) return state;
      const idx = state.job.lines.findIndex((l) => l.lineNo === state.selectedLine);
      const lines = [...state.job.lines];
      lines.splice(idx + 1, 0, { lineNo: 0, text: state.clipboard, isEditLocked: false, isCommentMarked: false });
      return { ...state, job: { ...state.job, lines: renumber(lines) }, selectedLine: idx + 1 };
    }
    case 'TOGGLE_EDIT_LOCK':
      return {
        ...state,
        job: {
          ...state.job,
          lines: state.job.lines.map((l) =>
            l.lineNo === state.selectedLine ? { ...l, isEditLocked: !l.isEditLocked } : l,
          ),
        },
      };
    case 'CLEAR_ALL_EDIT_LOCKS':
      return {
        ...state,
        job: { ...state.job, lines: state.job.lines.map((l) => ({ ...l, isEditLocked: false })) },
      };
    case 'TOGGLE_COMMENT_MARK':
      return {
        ...state,
        job: {
          ...state.job,
          lines: state.job.lines.map((l) =>
            l.lineNo === state.selectedLine ? { ...l, isCommentMarked: !l.isCommentMarked } : l,
          ),
        },
      };
    case 'CLEAR_ALL_COMMENT_MARKS':
      return {
        ...state,
        job: { ...state.job, lines: state.job.lines.map((l) => ({ ...l, isCommentMarked: false })) },
      };
    case 'INSERT_LINE': {
      const idx =
        state.selectedLine !== null
          ? state.job.lines.findIndex((l) => l.lineNo === state.selectedLine)
          : state.job.lines.length - 1;
      const lines = [...state.job.lines];
      lines.splice(idx + 1, 0, { lineNo: 0, text: action.text, isEditLocked: false, isCommentMarked: false });
      return { ...state, job: { ...state.job, lines: renumber(lines) }, selectedLine: idx + 1 };
    }
    case 'UPDATE_LINE':
      return {
        ...state,
        job: {
          ...state.job,
          lines: state.job.lines.map((l) => (l.lineNo === action.lineNo ? { ...l, text: action.text } : l)),
        },
      };
    case 'UPDATE_HEADER':
      return { ...state, job: { ...state.job, header: { ...state.job.header, ...action.header } } };
    case 'CREATE_JOB':
      return {
        ...state,
        job: {
          fileName: `${action.name}.JBI`,
          filePath: null,
          isDirty: true,
          rawPositionSection: [],
          header: {
            name: action.name,
            comment: '',
            jobFolder: action.jobFolder,
            dateTime: new Date().toLocaleString(),
            sizeBytes: 16,
            controlGroup: action.controlGroup,
            locale: {
              byte: 0,
              integer: 0,
              double: 0,
              real: 0,
              string: 0,
              robotPosition: 0,
              basePosition: 0,
              stationPosition: 0,
            },
          },
          lines: [
            { lineNo: 0, text: 'NOP', isEditLocked: false, isCommentMarked: false },
            { lineNo: 1, text: 'END', isEditLocked: false, isCommentMarked: false },
          ],
        },
        instHeader: undefined,
        selectedLine: 0,
      };
    case 'LOAD_JOB':
      return {
        ...state,
        job: action.job,
        instHeader: action.instHeader,
        selectedLine: action.job.lines[0]?.lineNo ?? null,
        clipboard: state.clipboard,
      };
    case 'JOB_SAVED':
      return {
        ...state,
        job: { ...state.job, filePath: action.filePath, fileName: action.fileName, isDirty: false },
      };
    case 'SET_LANGUAGE':
      return { ...state, language: action.language };
    case 'SET_CONTROL_GROUPS':
      return { ...state, controlGroups: action.groups };
    case 'SHOW_TOAST':
      return { ...state, toast: action.toast };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    case 'LOG':
      return { ...state, logMessages: [...state.logMessages, action.message] };
    default:
      return state;
  }
}

const DIRTYING_ACTIONS = new Set<Action['type']>([
  'CUT_LINE',
  'PASTE_LINE',
  'TOGGLE_EDIT_LOCK',
  'CLEAR_ALL_EDIT_LOCKS',
  'TOGGLE_COMMENT_MARK',
  'CLEAR_ALL_COMMENT_MARKS',
  'INSERT_LINE',
  'UPDATE_LINE',
  'UPDATE_HEADER',
]);

function reducer(state: AppState, action: Action): AppState {
  const next = baseReducer(state, action);
  if (next.job !== state.job && DIRTYING_ACTIONS.has(action.type) && !next.job.isDirty) {
    return { ...next, job: { ...next.job, isDirty: true } };
  }
  return next;
}

const StateContext = createContext<AppState | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useAppState(): AppState {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStoreProvider');
  return ctx;
}

export function useAppDispatch(): Dispatch<Action> {
  const ctx = useContext(DispatchContext);
  if (!ctx) throw new Error('useAppDispatch must be used within AppStoreProvider');
  return ctx;
}
