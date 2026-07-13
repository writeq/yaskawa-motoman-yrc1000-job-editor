import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppState } from '../../state/store';
import { jobSizeBytes, jobStepCount, type LocaleVariableCounts } from '../../types/jbi';
import { IconTag } from '../icons/Icons';
import './dialogs.css';

interface HeaderDialogProps {
  onClose: () => void;
}

const LOCALE_LABELS: { key: keyof LocaleVariableCounts; label: string }[] = [
  { key: 'byte', label: 'Byte[LB]' },
  { key: 'integer', label: 'Integer[LI]' },
  { key: 'double', label: 'Double[LD]' },
  { key: 'real', label: 'Real[LR]' },
  { key: 'string', label: 'String[LS]' },
  { key: 'robotPosition', label: 'Robot Position[LP]' },
  { key: 'basePosition', label: 'Base Position[LBP]' },
  { key: 'stationPosition', label: 'Station Position[LEX]' },
];

export function HeaderDialog({ onClose }: HeaderDialogProps) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { job } = state;
  const [more, setMore] = useState(false);
  const [comment, setComment] = useState(job.header.comment);

  function handleOk() {
    dispatch({ type: 'UPDATE_HEADER', header: { comment } });
    onClose();
  }

  return (
    <Modal title="Header of Job" icon={<IconTag size={16} />} onClose={onClose} width={more ? 460 : 360}>
      <div className="form-row">
        <label>Name:</label>
        <input type="text" value={job.header.name} disabled />
      </div>
      <div className="form-row">
        <label>Comment:</label>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Job Folder</label>
        <input type="text" value={job.header.jobFolder} disabled />
      </div>
      <div className="form-row">
        <label>Date¥Time:</label>
        <input type="text" value={job.header.dateTime} disabled />
      </div>
      <div className="form-row">
        <label>Size:</label>
        <input type="text" value={`${jobSizeBytes(job)}Byte`} disabled />
      </div>
      <div className="form-row">
        <label>LineNo:</label>
        <input type="text" value={`${job.lines.length}Lines`} disabled />
      </div>
      <div className="form-row">
        <label>StepNo:</label>
        <input type="text" value={`${jobStepCount(job)}Steps`} disabled />
      </div>
      <div className="form-row">
        <label>Control Group:</label>
        <input type="text" value={job.header.controlGroup} disabled />
        <button className="btn" onClick={() => setMore((m) => !m)}>
          {more ? '<< Less' : 'More >>'}
        </button>
      </div>

      {more && (
        <>
          <div className="section-title">Locale variable</div>
          <div className="two-col">
            <div>
              {LOCALE_LABELS.slice(0, 4).map((l) => (
                <div className="form-row" key={l.key}>
                  <label>{l.label}</label>
                  <input type="text" value={job.header.locale[l.key]} disabled />
                  <button className="btn">Edit</button>
                </div>
              ))}
            </div>
            <div>
              {LOCALE_LABELS.slice(4).map((l) => (
                <div className="form-row" key={l.key}>
                  <label>{l.label}</label>
                  <input type="text" value={job.header.locale[l.key]} disabled />
                  <button className="btn">Edit</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

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
