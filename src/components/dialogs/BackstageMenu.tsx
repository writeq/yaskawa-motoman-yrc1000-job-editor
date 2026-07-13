import './BackstageMenu.css';
import { useAppDispatch, useAppState } from '../../state/store';
import { RECENT_FILES } from '../../data/mockJob';

interface BackstageMenuProps {
  onClose: () => void;
}

export function BackstageMenu({ onClose }: BackstageMenuProps) {
  const dispatch = useAppDispatch();
  const state = useAppState();

  const items: { label: string; onClick?: () => void; disabled?: boolean }[] = [
    {
      label: 'Create Job(N)',
      onClick: () => {
        onClose();
        dispatch({ type: 'OPEN_DIALOG', name: 'createJob' });
      },
    },
    { label: 'Select Job(O)...' },
    {
      label: 'Save(S)',
      onClick: () => {
        dispatch({ type: 'LOG', message: `Saved ${state.job.fileName}` });
        onClose();
      },
    },
    { label: 'Save As(A)...' },
    { label: 'Delete Job(D)...' },
    { label: 'Batch Change Folder Name(G)' },
    { label: 'Close(C)', onClick: onClose },
    { label: 'Print(P)' },
    { label: 'Print Preview(V)' },
  ];

  return (
    <div className="backstage-overlay" onMouseDown={onClose}>
      <div className="backstage-window" onMouseDown={(e) => e.stopPropagation()}>
        <div className="backstage-actions">
          {items.map((item) => (
            <button key={item.label} className="backstage-action" disabled={item.disabled} onClick={item.onClick}>
              {item.label}
            </button>
          ))}
          <div className="backstage-spacer" />
          <button className="backstage-action backstage-help">❔ Help(H)</button>
        </div>
        <div className="backstage-recent">
          <div className="backstage-recent-title">Recent files</div>
          <div className="backstage-recent-list">
            {RECENT_FILES.map((f, i) => (
              <div key={f} className="backstage-recent-item">
                <span className="backstage-recent-index">{i + 1}</span>
                {f}
              </div>
            ))}
          </div>
        </div>
        <button className="backstage-exit" onClick={onClose}>
          ✕ Exit(X)
        </button>
      </div>
    </div>
  );
}
