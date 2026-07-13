import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch } from '../../state/store';
import { JOB_FOLDERS, CONTROL_GROUPS } from '../../data/mockJob';
import { IconInsertPlus } from '../icons/Icons';
import './dialogs.css';

interface CreateJobDialogProps {
  onClose: () => void;
}

export function CreateJobDialog({ onClose }: CreateJobDialogProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [jobFolder, setJobFolder] = useState('NONE');
  const [jobType, setJobType] = useState<'robot' | 'nonrobot'>('robot');
  const [controlGroup, setControlGroup] = useState('R1');

  function handleOk() {
    if (!name.trim()) return;
    dispatch({ type: 'CREATE_JOB', name: name.trim(), jobFolder, controlGroup: jobType === 'robot' ? controlGroup : 'NON GROUP' });
    onClose();
  }

  return (
    <Modal title="Create Job" icon={<IconInsertPlus size={16} />} onClose={onClose} width={340}>
      <div className="form-row">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Job name" />
      </div>
      <div className="form-row">
        <select value={jobFolder} onChange={(e) => setJobFolder(e.target.value)}>
          {JOB_FOLDERS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <div className="create-job-body">
        <div className="create-job-type">
          <div className="create-job-title">JobType</div>
          <label className="radio-row">
            <input type="radio" checked={jobType === 'robot'} onChange={() => setJobType('robot')} />
            Robot
          </label>
          <label className="radio-row">
            <input type="radio" checked={jobType === 'nonrobot'} onChange={() => setJobType('nonrobot')} />
            Non Robot
          </label>
        </div>
        <div className="create-job-group">
          <div className="create-job-title">Control Group</div>
          <select
            className="control-group-list"
            size={3}
            value={controlGroup}
            disabled={jobType !== 'robot'}
            onChange={(e) => setControlGroup(e.target.value)}
          >
            {CONTROL_GROUPS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>
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
