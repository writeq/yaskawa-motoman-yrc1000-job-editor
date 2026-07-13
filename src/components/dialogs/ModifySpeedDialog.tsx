import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppState } from '../../state/store';
import { IconGauge } from '../icons/Icons';
import './dialogs.css';

interface ModifySpeedDialogProps {
  onClose: () => void;
}

export function ModifySpeedDialog({ onClose }: ModifySpeedDialogProps) {
  const state = useAppState();
  const line = state.selectedLine ?? 0;
  const [startLine, setStartLine] = useState(line);
  const [endLine, setEndLine] = useState(line);
  const [way, setWay] = useState('NO CONFIRM');
  const [targetType, setTargetType] = useState('VJ');
  const [speed, setSpeed] = useState(25);

  return (
    <Modal title="Modify Speed" icon={<IconGauge size={16} />} onClose={onClose} width={320}>
      <div className="form-row">
        <label>Start Line No:</label>
        <input
          type="text"
          value={String(startLine).padStart(4, '0')}
          onChange={(e) => setStartLine(Number(e.target.value) || 0)}
        />
      </div>
      <div className="form-row">
        <label>End Line No:</label>
        <input
          type="text"
          value={String(endLine).padStart(4, '0')}
          onChange={(e) => setEndLine(Number(e.target.value) || 0)}
        />
      </div>
      <div className="form-row">
        <label>Way:</label>
        <select value={way} onChange={(e) => setWay(e.target.value)}>
          <option value="NO CONFIRM">NO CONFIRM</option>
          <option value="CONFIRM">CONFIRM</option>
        </select>
      </div>
      <div className="form-row">
        <label>Target Type:</label>
        <select value={targetType} onChange={(e) => setTargetType(e.target.value)}>
          <option value="VJ">VJ</option>
          <option value="VT">VT</option>
          <option value="VR">VR</option>
        </select>
      </div>
      <div className="form-row">
        <label>Speed:</label>
        <input type="number" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
        <span>%</span>
      </div>
      <div className="modal-actions">
        <button className="btn btn-primary" onClick={onClose}>
          Ok
        </button>
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
