import { Modal } from '../Modal/Modal';
import './dialogs.css';

interface PositionVariableDialogProps {
  onClose: () => void;
}

const COLUMNS = ['No', 'Type', 'Name', 'Figure', 'Tool', 'UF', 'JT1 / X', 'JT2 / Y', 'JT3 / Z', 'JT4 / Rx', 'JT5 / Ry', 'JT6 / Rz', 'JT7 / Re', 'JT8'];

export function PositionVariableDialog({ onClose }: PositionVariableDialogProps) {
  const rows = Array.from({ length: 100 }, (_, i) => i);

  return (
    <Modal title="Position variable" onClose={onClose} width={760}>
      <div className="modal-actions" style={{ marginTop: 0, marginBottom: 8, justifyContent: 'flex-start' }}>
        <button className="btn btn-primary" onClick={onClose}>
          OK
        </button>
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
      </div>
      <div className="data-table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((no) => (
              <tr key={no}>
                <td>{no}</td>
                {COLUMNS.slice(1).map((c) => (
                  <td key={c} className="masked-cell">
                    ******
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
