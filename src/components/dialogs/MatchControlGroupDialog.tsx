import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppState } from '../../state/store';
import type { ControlGroupDef } from '../../types/jbi';
import './dialogs.css';

interface MatchControlGroupDialogProps {
  onClose: () => void;
}

type Step = 'list' | 'selectGroup' | 'selectRobot';
type FieldKey = 'firstControlGroup' | 'secondControlGroup' | 'master';

const AVAILABLE_ROBOTS = ['R1:ROBOT1'];

export function MatchControlGroupDialog({ onClose }: MatchControlGroupDialogProps) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<Step>('list');
  const [selected, setSelected] = useState<string | null>(state.controlGroups[0]?.name ?? null);
  const [draft, setDraft] = useState<ControlGroupDef | null>(null);
  const [activeField, setActiveField] = useState<FieldKey | null>(null);

  function openModify() {
    const group = state.controlGroups.find((g) => g.name === selected);
    if (group) {
      setDraft({ ...group });
      setStep('selectGroup');
    }
  }

  function saveDraft() {
    if (!draft) return;
    dispatch({
      type: 'SET_CONTROL_GROUPS',
      groups: state.controlGroups.map((g) => (g.name === draft.name ? draft : g)),
    });
    setStep('list');
  }

  function pickRobot(robot: string) {
    if (draft && activeField) {
      setDraft({ ...draft, [activeField]: robot });
    }
    setStep('selectGroup');
  }

  if (step === 'selectRobot') {
    return (
      <Modal title="Select" onClose={() => setStep('selectGroup')} width={280}>
        <div className="list-box" style={{ height: 100 }}>
          {AVAILABLE_ROBOTS.map((r) => (
            <div key={r} className="list-box-item" onClick={() => pickRobot(r)}>
              {r}
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={() => setStep('selectGroup')}>
            Ok
          </button>
          <button className="btn" onClick={() => setStep('selectGroup')}>
            Cancel
          </button>
        </div>
      </Modal>
    );
  }

  if (step === 'selectGroup' && draft) {
    const fieldRow = (fieldKey: FieldKey, label: string) => (
      <div className="form-row" key={fieldKey}>
        <label>{label}:</label>
        <input type="text" value={draft[fieldKey]} disabled />
        <button
          className="btn"
          onClick={() => {
            setActiveField(fieldKey);
            setStep('selectRobot');
          }}
        >
          &gt;&gt;
        </button>
      </div>
    );
    return (
      <Modal title="Select Group" onClose={() => setStep('list')} width={340}>
        {fieldRow('firstControlGroup', '1st Control Group')}
        {fieldRow('secondControlGroup', '2nd Control Group')}
        {fieldRow('master', 'Master')}
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={saveDraft}>
            Ok
          </button>
          <button className="btn" onClick={() => setStep('list')}>
            Cancel
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Match Controlgroup" onClose={onClose} width={300}>
      <div className="two-col">
        <div className="list-box" style={{ height: 120 }}>
          {state.controlGroups.map((g) => (
            <div
              key={g.name}
              className={`list-box-item ${selected === g.name ? 'selected' : ''}`}
              onClick={() => setSelected(g.name)}
            >
              {g.name}
            </div>
          ))}
        </div>
        <div className="mcg-actions">
          <button className="btn" disabled>
            Add
          </button>
          <button className="btn" disabled={!selected} onClick={openModify}>
            Modify
          </button>
          <button className="btn" disabled>
            Delete
          </button>
        </div>
      </div>
      <div className="modal-actions">
        <button className="btn btn-primary" onClick={onClose}>
          Ok
        </button>
      </div>
    </Modal>
  );
}
