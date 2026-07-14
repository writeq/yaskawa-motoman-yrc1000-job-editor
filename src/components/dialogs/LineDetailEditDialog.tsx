import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppState } from '../../state/store';
import type { InstructionField } from '../../data/instructions';
import { DetailEditFields } from './DetailEditFields';
import { IconDocumentPencil } from '../icons/Icons';
import './dialogs.css';

interface LineDetailEditDialogProps {
  onClose: () => void;
}

export function LineDetailEditDialog({ onClose }: LineDetailEditDialogProps) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const editor = state.lineEditor;
  const [fields, setFields] = useState<InstructionField[]>(editor?.fields ?? []);

  if (!editor) return null;

  function handleChange(i: number, value: string) {
    setFields((prev) => prev.map((f, idx) => (idx === i ? { ...f, value } : f)));
  }

  function handleOk() {
    dispatch({ type: 'UPDATE_LINE_EDITOR_FIELDS', fields });
    onClose();
  }

  return (
    <Modal title="Detail Edit" icon={<IconDocumentPencil size={16} />} onClose={onClose} width={320}>
      <DetailEditFields name={editor.name} fields={fields} onChange={handleChange} />
      <div className="modal-actions">
        <button className="btn btn-primary" onClick={handleOk}>
          Ok
        </button>
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
