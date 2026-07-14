import './Ribbon.css';
import { useAppState, useAppDispatch, type RibbonTab } from '../../state/store';
import { RibbonButton, RibbonCheckbox } from './RibbonButton';
import { RibbonDropdown } from './RibbonDropdown';
import { parseInstructionLine } from '../../data/instructions';
import { linesToTextModeContent, parseTextModeContent, validateInstructionText } from '../../data/textMode';
import { saveJobFlow } from '../../data/jobFileIO';
import {
  IconDocument,
  IconDocumentPencil,
  IconDocumentGear,
  IconGauge,
  IconClipboard,
  IconScissors,
  IconCopy,
  IconReverse,
  IconFind,
  IconLockClosed,
  IconLockOpen,
  IconComment,
  IconCommentOff,
  IconInsertPlus,
  IconDocumentPencil as IconModify,
  IconCheckCircle,
  IconGear,
  IconFolderOpen,
  IconTag,
  IconPin,
  IconLink,
  IconEye,
  IconGlobe,
  IconMinus,
  IconEquals,
  IconPlusLarge,
} from '../icons/Icons';

function RibbonGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ribbon-group">
      <div className="ribbon-group-content">{children}</div>
      <div className="ribbon-group-label">{label}</div>
    </div>
  );
}

export function Ribbon() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const hasSelection = state.selectedLine !== null;
  const isLineEditing = state.lineEditor !== null;
  const isTextMode = state.editMode === 'text';

  const setTab = (tab: RibbonTab) => dispatch({ type: 'SET_RIBBON_TAB', tab });

  function handleModifyInstruction() {
    const line = state.job.lines.find((l) => l.lineNo === state.selectedLine);
    if (!line) return;
    const parsed = parseInstructionLine(line.text);
    dispatch({ type: 'OPEN_LINE_EDITOR', mode: 'modify', name: parsed.name, fields: parsed.fields });
  }

  function handleSwitchToStandard() {
    if (isTextMode) {
      dispatch({ type: 'REPLACE_LINES', lines: parseTextModeContent(state.textModeContent) });
    }
    dispatch({ type: 'SET_EDIT_MODE', mode: 'standard' });
  }

  function handleSwitchToText() {
    dispatch({ type: 'SET_TEXT_MODE_CONTENT', content: linesToTextModeContent(state.job.lines) });
    dispatch({ type: 'SET_EDIT_MODE', mode: 'text' });
  }

  function showLog(messages: ReturnType<typeof validateInstructionText>) {
    dispatch({ type: 'SET_LOG_MESSAGES', messages });
    dispatch({ type: 'OPEN_VIEW', key: 'logViewer' });
  }

  function handleCheckInstruction() {
    const errors = validateInstructionText(state.textModeContent);
    showLog(errors.length > 0 ? errors : [{ lineNo: null, text: 'File check is complete.' }]);
  }

  function handleCompile() {
    const errors = validateInstructionText(state.textModeContent);
    if (errors.length > 0) {
      showLog(errors);
      return;
    }
    const lines = parseTextModeContent(state.textModeContent);
    dispatch({ type: 'REPLACE_LINES', lines });
    showLog([{ lineNo: null, text: 'File check is complete.' }]);
    void saveJobFlow(dispatch, { ...state.job, lines }, state.instHeader);
  }

  return (
    <div className="ribbon">
      <div className="ribbon-tabs">
        <button
          className={`ribbon-tab ${state.activeRibbonTab === 'home' ? 'active' : ''}`}
          onClick={() => setTab('home')}
        >
          Home
        </button>
        <button
          className={`ribbon-tab ${state.activeRibbonTab === 'settings' ? 'active' : ''}`}
          onClick={() => setTab('settings')}
        >
          Settings
        </button>
      </div>

      {state.activeRibbonTab === 'home' && (
        <div className="ribbon-panel">
          <RibbonGroup label="Edit Mode">
            <RibbonButton icon={<IconDocument />} label="Standard(S)" onClick={handleSwitchToStandard} />
            <RibbonButton icon={<IconDocumentPencil />} label="Text(T)" onClick={handleSwitchToText} />
            <RibbonDropdown
              icon={<IconGauge />}
              label="Level of Inform(L)"
              options={[
                { key: 'reduction', label: 'Reduction(S)', icon: <IconMinus size={14} /> },
                { key: 'standard', label: 'Standard(N)', icon: <IconEquals size={14} /> },
                { key: 'extension', label: 'Extension(L)', icon: <IconPlusLarge size={14} /> },
              ]}
              onSelect={(key) =>
                dispatch({ type: 'SET_LEVEL_OF_INFORM', level: key as 'reduction' | 'standard' | 'extension' })
              }
            />
          </RibbonGroup>

          <RibbonGroup label="Edit">
            <div className="ribbon-col">
              <RibbonButton
                icon={<IconClipboard />}
                label="Paste(V)"
                disabled={isTextMode}
                onClick={() => dispatch({ type: 'PASTE_LINE' })}
              />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton
                size="small"
                icon={<IconScissors size={15} />}
                label="Cut(X)"
                disabled={isTextMode}
                onClick={() => dispatch({ type: 'CUT_LINE' })}
              />
              <RibbonButton
                size="small"
                icon={<IconCopy size={15} />}
                label="Copy(C)"
                disabled={isTextMode}
                onClick={() => dispatch({ type: 'COPY_LINE' })}
              />
              <RibbonButton size="small" icon={<IconReverse size={15} />} label="Reverse(R)" disabled={isTextMode} />
            </div>
            <div className="ribbon-col">
              <RibbonButton
                icon={<IconFind />}
                label="Find(F)"
                disabled={isTextMode}
                onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'findJump' })}
              />
            </div>
            <div className="ribbon-col">
              <RibbonButton
                icon={<IconGauge />}
                label="Modify Speed(P)"
                disabled={isTextMode}
                onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'modifySpeed' })}
              />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton
                size="small"
                icon={<IconLockClosed size={15} />}
                label="Edit Lock(D)"
                disabled={!hasSelection || isTextMode}
                onClick={() => dispatch({ type: 'TOGGLE_EDIT_LOCK' })}
              />
              <RibbonButton
                size="small"
                icon={<IconComment size={15} />}
                label="Comment(G)"
                disabled={!hasSelection || isTextMode}
                onClick={() => dispatch({ type: 'TOGGLE_COMMENT_MARK' })}
              />
              <RibbonButton
                size="small"
                icon={<IconLockOpen size={15} />}
                label="Clear all Edit Lock(A)"
                disabled={isTextMode}
                onClick={() => dispatch({ type: 'CLEAR_ALL_EDIT_LOCKS' })}
              />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton
                size="small"
                icon={<IconCommentOff size={15} />}
                label="Clear all mark of comment(B)"
                disabled={isTextMode}
                onClick={() => dispatch({ type: 'CLEAR_ALL_COMMENT_MARKS' })}
              />
              <RibbonButton
                size="small"
                icon={<IconInsertPlus size={15} />}
                label="Insert Instruction(I)"
                disabled={isLineEditing || isTextMode}
                onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'insertInstruction' })}
              />
              <RibbonButton
                size="small"
                icon={<IconModify size={15} />}
                label="Modify Instruction(J)"
                disabled={!hasSelection || isLineEditing || isTextMode}
                onClick={handleModifyInstruction}
              />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton
                size="small"
                icon={<IconCheckCircle size={15} />}
                label="Check instruction(E)"
                disabled={!isTextMode}
                onClick={handleCheckInstruction}
              />
              <RibbonButton
                size="small"
                icon={<IconGear size={15} />}
                label="Compile(K)"
                disabled={!isTextMode}
                onClick={handleCompile}
              />
            </div>
          </RibbonGroup>

          <RibbonGroup label="View">
            <div className="ribbon-col">
              <RibbonButton icon={<IconFolderOpen />} label="Open Job(O)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'backstage' })} />
            </div>
            <div className="ribbon-col">
              <RibbonButton icon={<IconTag />} label="Header(H)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'header' })} />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonCheckbox
                label="Job all display(W)"
                checked={state.view.jobAllDisplay}
                onChange={() => dispatch({ type: 'TOGGLE_VIEW', key: 'jobAllDisplay' })}
              />
              <RibbonCheckbox
                label="Log viewer(Y)"
                checked={state.view.logViewer}
                onChange={() => dispatch({ type: 'TOGGLE_VIEW', key: 'logViewer' })}
              />
              <RibbonCheckbox
                label="Statusbar(Z)"
                checked={state.view.statusBar}
                onChange={() => dispatch({ type: 'TOGGLE_VIEW', key: 'statusBar' })}
              />
            </div>
          </RibbonGroup>
        </div>
      )}

      {state.activeRibbonTab === 'settings' && (
        <div className="ribbon-panel">
          <RibbonGroup label="Settings">
            <RibbonButton icon={<IconDocumentGear />} label="Condition File Edit(E)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'conditionFile' })} />
            <RibbonButton icon={<IconPin />} label="Position variable(P)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'positionVariable' })} />
            <RibbonButton icon={<IconLink />} label="Match Control Group(G)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'matchControlGroup' })} />
            <RibbonButton icon={<IconEye />} label="View settings(D)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'displaySetting' })} />
            <RibbonButton icon={<IconGlobe />} label="Change Language(L)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'selectLanguage' })} />
          </RibbonGroup>
        </div>
      )}
    </div>
  );
}
