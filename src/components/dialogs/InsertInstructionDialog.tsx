import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch } from '../../state/store';
import {
  INSTRUCTION_CATEGORIES,
  INSTRUCTIONS_BY_CATEGORY,
  INSTRUCTION_TEMPLATES,
  buildInstructionText,
  type InstructionCategory,
  type InstructionField,
} from '../../data/instructions';
import { DetailEditFields } from './DetailEditFields';
import { IconInsertPlus } from '../icons/Icons';
import './dialogs.css';

interface InsertInstructionDialogProps {
  onClose: () => void;
}

type Step = 'category' | 'instruction' | 'preview';

export function InsertInstructionDialog({ onClose }: InsertInstructionDialogProps) {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<Step>('category');
  const [category, setCategory] = useState<InstructionCategory | null>(null);
  const [instName, setInstName] = useState<string | null>(null);
  const [fields, setFields] = useState<InstructionField[]>([]);
  const [editMode, setEditMode] = useState(false);

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
    setFields(template ? template.fields.map((f) => ({ ...f })) : []);
    setStep('preview');
  }

  function handleFieldChange(i: number, value: string) {
    setFields((prev) => prev.map((f, idx) => (idx === i ? { ...f, value } : f)));
  }

  function handleInsert() {
    if (!instName) return;
    dispatch({ type: 'INSERT_LINE', text: buildInstructionText(instName, fields) });
    onClose();
  }

  const previewText = instName ? buildInstructionText(instName, fields) : '';

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

      {step === 'preview' && instName && (
        <>
          {editMode ? (
            <DetailEditFields name={instName} fields={fields} onChange={handleFieldChange} />
          ) : (
            <div className="preview-row">
              <div className="preview-arrows">
                <button>◂</button>
                <button>▸</button>
              </div>
              <span className="preview-text">{previewText}</span>
              <button className="btn" onClick={() => setEditMode(true)}>
                Edit
              </button>
            </div>
          )}
          <div className="preview-stats">
            {previewText.length + 2}Byte 2Lines 0Steps
          </div>
          <div className="modal-actions">
            <button className="btn" onClick={() => setStep('instruction')}>
              Back
            </button>
            <button className="btn btn-primary" onClick={handleInsert}>
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
