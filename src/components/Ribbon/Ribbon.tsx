import './Ribbon.css';
import { useAppState, useAppDispatch, type RibbonTab } from '../../state/store';
import { RibbonButton, RibbonCheckbox } from './RibbonButton';
import { RibbonDropdown } from './RibbonDropdown';
import { parseInstructionLine } from '../../data/instructions';
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

  const setTab = (tab: RibbonTab) => dispatch({ type: 'SET_RIBBON_TAB', tab });

  function handleModifyInstruction() {
    const line = state.job.lines.find((l) => l.lineNo === state.selectedLine);
    if (!line) return;
    const parsed = parseInstructionLine(line.text);
    dispatch({ type: 'OPEN_LINE_EDITOR', mode: 'modify', name: parsed.name, fields: parsed.fields });
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
            <RibbonButton
              icon={<IconDocument />}
              label="Standard(S)"
              onClick={() => dispatch({ type: 'SET_EDIT_MODE', mode: 'standard' })}
            />
            <RibbonButton
              icon={<IconDocumentPencil />}
              label="Text(T)"
              onClick={() => dispatch({ type: 'SET_EDIT_MODE', mode: 'text' })}
            />
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
              <RibbonButton icon={<IconClipboard />} label="Paste(V)" onClick={() => dispatch({ type: 'PASTE_LINE' })} />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton size="small" icon={<IconScissors size={15} />} label="Cut(X)" onClick={() => dispatch({ type: 'CUT_LINE' })} />
              <RibbonButton size="small" icon={<IconCopy size={15} />} label="Copy(C)" onClick={() => dispatch({ type: 'COPY_LINE' })} />
              <RibbonButton size="small" icon={<IconReverse size={15} />} label="Reverse(R)" />
            </div>
            <div className="ribbon-col">
              <RibbonButton icon={<IconFind />} label="Find(F)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'findJump' })} />
            </div>
            <div className="ribbon-col">
              <RibbonButton
                icon={<IconGauge />}
                label="Modify Speed(P)"
                onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'modifySpeed' })}
              />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton
                size="small"
                icon={<IconLockClosed size={15} />}
                label="Edit Lock(D)"
                disabled={!hasSelection}
                onClick={() => dispatch({ type: 'TOGGLE_EDIT_LOCK' })}
              />
              <RibbonButton
                size="small"
                icon={<IconComment size={15} />}
                label="Comment(G)"
                disabled={!hasSelection}
                onClick={() => dispatch({ type: 'TOGGLE_COMMENT_MARK' })}
              />
              <RibbonButton
                size="small"
                icon={<IconLockOpen size={15} />}
                label="Clear all Edit Lock(A)"
                onClick={() => dispatch({ type: 'CLEAR_ALL_EDIT_LOCKS' })}
              />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton
                size="small"
                icon={<IconCommentOff size={15} />}
                label="Clear all mark of comment(B)"
                onClick={() => dispatch({ type: 'CLEAR_ALL_COMMENT_MARKS' })}
              />
              <RibbonButton
                size="small"
                icon={<IconInsertPlus size={15} />}
                label="Insert Instruction(I)"
                disabled={isLineEditing}
                onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'insertInstruction' })}
              />
              <RibbonButton
                size="small"
                icon={<IconModify size={15} />}
                label="Modify Instruction(J)"
                disabled={!hasSelection || isLineEditing}
                onClick={handleModifyInstruction}
              />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton size="small" icon={<IconCheckCircle size={15} />} label="Check instruction(E)" disabled />
              <RibbonButton size="small" icon={<IconGear size={15} />} label="Compile(K)" disabled />
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
