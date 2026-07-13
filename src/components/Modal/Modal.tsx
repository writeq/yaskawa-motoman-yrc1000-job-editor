import type { ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
  title: string;
  icon?: ReactNode;
  onClose: () => void;
  children: ReactNode;
  width?: number;
}

export function Modal({ title, icon, onClose, children, width }: ModalProps) {
  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="modal-window"
        style={width ? { width } : undefined}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-titlebar">
          <span className="modal-title">
            {icon && <span className="modal-title-icon">{icon}</span>}
            {title}
          </span>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
