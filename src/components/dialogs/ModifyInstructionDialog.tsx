import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppState } from '../../state/store';
import { buildInstructionText, parseInstructionLine, type InstructionField } from '../../data/instructions';
import { DetailEditFields } from './DetailEditFields';
import './dialogs.css';

interface ModifyInstructionDialogProps {
  onClose: () => void;
}

export function ModifyInstructionDialog({ onClose }: ModifyInstructionDialogProps) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const line = state.job.lines.find((l) => l.lineNo === state.selectedLine);
  const parsed = line ? parseInstructionLine(line.text) : { name: '', fields: [] };
  const [fields, setFields] = useState<InstructionField[]>(parsed.fields);

  if (!line) return null;
  const lineNo = line.lineNo;

  function handleChange(i: number, value: string) {
    setFields((prev) => prev.map((f, idx) => (idx === i ? { ...f, value } : f)));
  }

  function handleOk() {
    dispatch({ type: 'UPDATE_LINE', lineNo, text: buildInstructionText(parsed.name, fields) });
    onClose();
  }

  return (
    <Modal title="Detail Edit" onClose={onClose} width={320}>
      <DetailEditFields name={parsed.name} fields={fields} onChange={handleChange} />
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
