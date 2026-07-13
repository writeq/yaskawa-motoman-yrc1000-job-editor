import { Modal } from '../Modal/Modal';
import './dialogs.css';

interface ConditionFileDialogProps {
  onClose: () => void;
}

export function ConditionFileDialog({ onClose }: ConditionFileDialogProps) {
  return (
    <Modal title="Condition File Edit" onClose={onClose} width={320}>
      <p>No condition file loaded for this control group.</p>
      <div className="modal-actions">
        <button className="btn btn-primary" onClick={onClose}>
          Ok
        </button>
      </div>
    </Modal>
  );
}
