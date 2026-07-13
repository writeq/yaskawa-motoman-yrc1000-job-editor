import './Ribbon.css';
import { useAppState, useAppDispatch, type RibbonTab } from '../../state/store';
import { RibbonButton, RibbonCheckbox } from './RibbonButton';
import { RibbonDropdown } from './RibbonDropdown';

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

  const setTab = (tab: RibbonTab) => dispatch({ type: 'SET_RIBBON_TAB', tab });

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
              icon="📄"
              label="Standard(S)"
              onClick={() => dispatch({ type: 'SET_EDIT_MODE', mode: 'standard' })}
            />
            <RibbonButton
              icon="📝"
              label="Text(T)"
              onClick={() => dispatch({ type: 'SET_EDIT_MODE', mode: 'text' })}
            />
            <RibbonDropdown
              icon="🎚"
              label="Level of Inform(L)"
              options={[
                { key: 'reduction', label: 'Reduction(S)', icon: '➖' },
                { key: 'standard', label: 'Standard(N)', icon: '⏹' },
                { key: 'extension', label: 'Extension(L)', icon: '➕' },
              ]}
              onSelect={(key) =>
                dispatch({ type: 'SET_LEVEL_OF_INFORM', level: key as 'reduction' | 'standard' | 'extension' })
              }
            />
          </RibbonGroup>

          <RibbonGroup label="Edit">
            <div className="ribbon-col">
              <RibbonButton icon="📋" label="Paste(V)" onClick={() => dispatch({ type: 'PASTE_LINE' })} />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton size="small" icon="✂" label="Cut(X)" onClick={() => dispatch({ type: 'CUT_LINE' })} />
              <RibbonButton size="small" icon="⧉" label="Copy(C)" onClick={() => dispatch({ type: 'COPY_LINE' })} />
              <RibbonButton size="small" icon="↕" label="Reverse(R)" />
            </div>
            <div className="ribbon-col">
              <RibbonButton icon="🔍" label="Find(F)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'findJump' })} />
            </div>
            <div className="ribbon-col">
              <RibbonButton
                icon="V=a"
                label="Modify Speed(P)"
                onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'modifySpeed' })}
              />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton
                size="small"
                icon="🔒"
                label="Edit Lock(D)"
                disabled={!hasSelection}
                onClick={() => dispatch({ type: 'TOGGLE_EDIT_LOCK' })}
              />
              <RibbonButton
                size="small"
                icon="💬"
                label="Comment(G)"
                disabled={!hasSelection}
                onClick={() => dispatch({ type: 'TOGGLE_COMMENT_MARK' })}
              />
              <RibbonButton
                size="small"
                icon="🔓"
                label="Clear all Edit Lock(A)"
                onClick={() => dispatch({ type: 'CLEAR_ALL_EDIT_LOCKS' })}
              />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton
                size="small"
                icon="🚫"
                label="Clear all mark of comment(B)"
                onClick={() => dispatch({ type: 'CLEAR_ALL_COMMENT_MARKS' })}
              />
              <RibbonButton
                size="small"
                icon="➕"
                label="Insert Instruction(I)"
                onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'insertInstruction' })}
              />
              <RibbonButton
                size="small"
                icon="✏"
                label="Modify Instruction(J)"
                disabled={!hasSelection}
                onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'modifyInstruction' })}
              />
            </div>
            <div className="ribbon-col ribbon-col-stack">
              <RibbonButton size="small" icon="✔" label="Check instruction(E)" disabled />
              <RibbonButton size="small" icon="⚙" label="Compile(K)" disabled />
            </div>
          </RibbonGroup>

          <RibbonGroup label="View">
            <div className="ribbon-col">
              <RibbonButton icon="📂" label="Open Job(O)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'backstage' })} />
            </div>
            <div className="ribbon-col">
              <RibbonButton icon="🏷" label="Header(H)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'header' })} />
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
            <RibbonButton icon="📄⚙" label="Condition File Edit(E)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'conditionFile' })} />
            <RibbonButton icon="📍" label="Position variable(P)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'positionVariable' })} />
            <RibbonButton icon="🔗" label="Match Control Group(G)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'matchControlGroup' })} />
            <RibbonButton icon="👁" label="View settings(D)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'displaySetting' })} />
            <RibbonButton icon="🌐A" label="Change Language(L)" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'selectLanguage' })} />
          </RibbonGroup>
        </div>
      )}
    </div>
  );
}
