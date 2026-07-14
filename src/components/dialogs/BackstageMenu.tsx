import type { ReactNode } from 'react';
import './BackstageMenu.css';
import { useAppDispatch, useAppState } from '../../state/store';
import { RECENT_FILES } from '../../data/mockJob';
import { openJobFlow, saveJobFlow, saveJobAsFlow } from '../../data/jobFileIO';
import {
  IconInsertPlus,
  IconFolderOpen,
  IconSaveDisk,
  IconRecentFile,
  IconTrash,
  IconBatchFolder,
  IconClose,
  IconPrinter,
  IconPreview,
  IconHelp,
} from '../icons/Icons';

interface BackstageMenuProps {
  onClose: () => void;
}

export function BackstageMenu({ onClose }: BackstageMenuProps) {
  const dispatch = useAppDispatch();
  const state = useAppState();

  const items: { label: string; icon: ReactNode; onClick?: () => void; disabled?: boolean }[] = [
    {
      label: 'Create Job(N)',
      icon: <IconInsertPlus size={16} />,
      onClick: () => {
        onClose();
        dispatch({ type: 'OPEN_DIALOG', name: 'createJob' });
      },
    },
    {
      label: 'Select Job(O)...',
      icon: <IconFolderOpen size={16} />,
      onClick: () => {
        onClose();
        void openJobFlow(dispatch);
      },
    },
    {
      label: 'Save(S)',
      icon: <IconSaveDisk size={16} />,
      onClick: () => {
        onClose();
        void saveJobFlow(dispatch, state.job, state.instHeader);
      },
    },
    {
      label: 'Save As(A)...',
      icon: <IconRecentFile size={16} />,
      onClick: () => {
        onClose();
        void saveJobAsFlow(dispatch, state.job, state.instHeader);
      },
    },
    { label: 'Delete Job(D)...', icon: <IconTrash size={16} /> },
    { label: 'Batch Change Folder Name(G)', icon: <IconBatchFolder size={16} /> },
    { label: 'Close(C)', icon: <IconClose size={16} />, onClick: onClose },
    { label: 'Print(P)', icon: <IconPrinter size={16} /> },
    { label: 'Print Preview(V)', icon: <IconPreview size={16} /> },
  ];

  return (
    <div className="backstage-overlay" onMouseDown={onClose}>
      <div className="backstage-window" onMouseDown={(e) => e.stopPropagation()}>
        <div className="backstage-actions">
          {items.map((item) => (
            <button key={item.label} className="backstage-action" disabled={item.disabled} onClick={item.onClick}>
              <span className="backstage-action-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="backstage-spacer" />
          <button className="backstage-action backstage-help">
            <span className="backstage-action-icon">
              <IconHelp size={16} />
            </span>
            Help(H)
          </button>
        </div>
        <div className="backstage-recent">
          <div className="backstage-recent-title">Recent files</div>
          <div className="backstage-recent-list">
            {RECENT_FILES.map((f, i) => (
              <div key={f} className="backstage-recent-item">
                <span className="backstage-recent-index">{i + 1}</span>
                <IconRecentFile size={14} />
                {f}
              </div>
            ))}
          </div>
        </div>
        <button className="backstage-exit" onClick={onClose}>
          <IconClose size={13} /> Exit(X)
        </button>
      </div>
    </div>
  );
}
