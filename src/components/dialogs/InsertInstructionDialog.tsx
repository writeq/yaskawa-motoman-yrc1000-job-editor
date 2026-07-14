import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch } from '../../state/store';
import {
  INSTRUCTION_CATEGORIES,
  INSTRUCTIONS_BY_CATEGORY,
  INSTRUCTION_TEMPLATES,
  type InstructionCategory,
} from '../../data/instructions';
import { IconInsertPlus } from '../icons/Icons';
import './dialogs.css';

interface InsertInstructionDialogProps {
  onClose: () => void;
}

type Step = 'category' | 'instruction';

export function InsertInstructionDialog({ onClose }: InsertInstructionDialogProps) {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<Step>('category');
  const [category, setCategory] = useState<InstructionCategory | null>(null);
  const [instName, setInstName] = useState<string | null>(null);

  function pickCategory(cat: InstructionCategory) {
    setCategory(cat);
  }

  function confirmCategory() {
    if (category) setStep('instruction');
  }

  function pickInstruction(name: string) {
    setInstName(name);
  }

  function confirmInstruction() {
    if (!instName) return;
    const template = INSTRUCTION_TEMPLATES[instName];
    dispatch({
      type: 'OPEN_LINE_EDITOR',
      mode: 'insert',
      name: instName,
      fields: template ? template.fields.map((f) => ({ ...f })) : [],
    });
    onClose();
  }

  return (
    <Modal title="Insert Instruction(I)" icon={<IconInsertPlus size={16} />} onClose={onClose} width={320}>
      {step === 'category' && (
        <>
          <div className="create-job-title">Select Inst</div>
          <div className="list-box" style={{ height: 200 }}>
            {INSTRUCTION_CATEGORIES.map((cat) => (
              <div
                key={cat}
                className={`list-box-item ${category === cat ? 'selected' : ''}`}
                onClick={() => pickCategory(cat)}
                onDoubleClick={confirmCategory}
              >
                {cat}
              </div>
            ))}
          </div>
          <div className="modal-actions">
            <button className="btn btn-primary" disabled={!category} onClick={confirmCategory}>
              Ok
            </button>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </>
      )}

      {step === 'instruction' && category && (
        <>
          <div className="create-job-title">Select Inst</div>
          <div className="list-box" style={{ height: 200 }}>
            {INSTRUCTIONS_BY_CATEGORY[category].map((name) => (
              <div
                key={name}
                className={`list-box-item ${instName === name ? 'selected' : ''}`}
                onClick={() => pickInstruction(name)}
                onDoubleClick={confirmInstruction}
              >
                {name}
              </div>
            ))}
            {INSTRUCTIONS_BY_CATEGORY[category].length === 0 && (
              <div className="detail-edit-empty">(no instructions in this category)</div>
            )}
          </div>
          <div className="modal-actions">
            <button className="btn" onClick={() => setStep('category')}>
              Back
            </button>
            <button className="btn btn-primary" disabled={!instName} onClick={confirmInstruction}>
              Ok
            </button>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
