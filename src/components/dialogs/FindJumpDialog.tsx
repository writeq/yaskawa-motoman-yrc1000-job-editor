import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppState } from '../../state/store';
import { IconFind } from '../icons/Icons';
import './dialogs.css';

interface FindJumpDialogProps {
  onClose: () => void;
}

export function FindJumpDialog({ onClose }: FindJumpDialogProps) {
  const [tab, setTab] = useState<'search' | 'jump'>('search');
  const [searchString, setSearchString] = useState('');
  const [jumpType, setJumpType] = useState<'LineNo' | 'StepNo'>('LineNo');
  const [lineNo, setLineNo] = useState(0);
  const state = useAppState();
  const dispatch = useAppDispatch();

  function handleNext() {
    if (!searchString) return;
    const startIdx = state.job.lines.findIndex((l) => l.lineNo === state.selectedLine);
    const lines = state.job.lines;
    for (let offset = 1; offset <= lines.length; offset++) {
      const line = lines[(startIdx + offset) % lines.length];
      if (line.text.toLowerCase().includes(searchString.toLowerCase())) {
        dispatch({ type: 'SELECT_LINE', lineNo: line.lineNo });
        return;
      }
    }
  }

  function handleJump() {
    const target = state.job.lines.find((l) => l.lineNo === lineNo);
    if (target) dispatch({ type: 'SELECT_LINE', lineNo: target.lineNo });
  }

  return (
    <Modal title="Find and Jump" icon={<IconFind size={16} />} onClose={onClose} width={340}>
      <div className="dialog-tabs">
        <button className={`dialog-tab ${tab === 'search' ? 'active' : ''}`} onClick={() => setTab('search')}>
          Search
        </button>
        <button className={`dialog-tab ${tab === 'jump' ? 'active' : ''}`} onClick={() => setTab('jump')}>
          Jump
        </button>
      </div>

      {tab === 'search' ? (
        <>
          <div className="form-row">
            <label>Searchstring:</label>
            <input type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} autoFocus />
          </div>
          <div className="modal-actions">
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="two-col">
            <div>
              <div className="create-job-title">Type of Jump:</div>
              <select
                className="list-box"
                size={2}
                value={jumpType}
                onChange={(e) => setJumpType(e.target.value as 'LineNo' | 'StepNo')}
                style={{ width: '100%' }}
              >
                <option value="LineNo">LineNo</option>
                <option value="StepNo">StepNo</option>
              </select>
            </div>
            <div className="form-row" style={{ alignItems: 'flex-start' }}>
              <label>LineNo:</label>
              <input type="number" value={lineNo} onChange={(e) => setLineNo(Number(e.target.value))} />
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-primary" onClick={handleJump}>
              Jump
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
