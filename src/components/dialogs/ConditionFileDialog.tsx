import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { IconDocumentGear } from '../icons/Icons';
import { parseConditionFile, serializeConditionFile, type ConditionFileEntry } from '../../data/conditionFile';
import './dialogs.css';

interface ConditionFileDialogProps {
  onClose: () => void;
}

export function ConditionFileDialog({ onClose }: ConditionFileDialogProps) {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [entries, setEntries] = useState<ConditionFileEntry[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleOpen() {
    const api = window.jobEditor;
    if (!api) {
      setStatus('File dialogs require the desktop app (not available in the browser preview).');
      return;
    }
    const result = await api.openConditionFileDialog();
    if (!result) return;
    setFilePath(result.filePath);
    setEntries(parseConditionFile(result.content));
    setSelected(null);
    setStatus(null);
  }

  async function handleSave() {
    const api = window.jobEditor;
    if (!api || !filePath) return;
    await api.writeConditionFile(filePath, serializeConditionFile(entries));
    setStatus(`Saved ${entries.length} entries.`);
  }

  function commitRename() {
    if (selected === null || editingName === null) return;
    const trimmed = editingName.trim();
    const index = selected;
    setEntries((prev) => prev.map((entry, i) => (i === index ? { ...entry, name: trimmed } : entry)));
    setEditingName(null);
  }

  const selectedEntry = selected !== null ? entries[selected] : null;

  return (
    <Modal title="Condition File Edit" icon={<IconDocumentGear size={16} />} onClose={onClose} width={380}>
      <div className="create-job-title">{filePath ?? 'No condition file loaded'}</div>

      {entries.length === 0 ? (
        <p className="detail-edit-empty">Open an IONAME.DAT / VARNAME.DAT file to edit its entries.</p>
      ) : (
        <div className="list-box data-table-scroll" style={{ maxHeight: 220 }}>
          {entries.map((entry, i) => (
            <div
              key={i}
              className={`list-box-item${selected === i ? ' selected' : ''}`}
              onClick={() => setSelected(i)}
              onDoubleClick={() => setEditingName(entry.name)}
            >
              {entry.index}&nbsp;&nbsp;{entry.name}
            </div>
          ))}
        </div>
      )}

      {status && <p className="detail-edit-empty">{status}</p>}

      <div className="modal-actions">
        <button className="btn" onClick={handleOpen}>
          Open...
        </button>
        <button className="btn" disabled={!selectedEntry} onClick={() => selectedEntry && setEditingName(selectedEntry.name)}>
          Edit
        </button>
        <button className="btn" disabled={!filePath || entries.length === 0} onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>

      {editingName !== null && selectedEntry && (
        <Modal title="Character Edit" onClose={() => setEditingName(null)} width={260}>
          <div className="form-row">
            <label>No.</label>
            <span>{selectedEntry.index}</span>
          </div>
          <div className="form-row">
            <label>Name</label>
            <input
              type="text"
              value={editingName}
              autoFocus
              onChange={(e) => setEditingName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitRename();
                if (e.key === 'Escape') setEditingName(null);
              }}
            />
          </div>
          <div className="modal-actions">
            <button className="btn btn-primary" onClick={commitRename}>
              Ok
            </button>
            <button className="btn" onClick={() => setEditingName(null)}>
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </Modal>
  );
}
