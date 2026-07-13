import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import './dialogs.css';

interface DisplaySettingDialogProps {
  onClose: () => void;
}

const COLOR_DEFS = [
  { name: 'black', val: '0,0,0' },
  { name: 'blue', val: '0,0,255' },
  { name: 'green', val: '0,255,0' },
  { name: 'lightblue', val: '153,255,255' },
  { name: 'pink', val: '255,0,255' },
  { name: 'red', val: '255,0,0' },
  { name: 'white', val: '255,255,255' },
  { name: 'yellow', val: '255,255,0' },
];

const PRIVATE_SETTINGS: { inst: string; color: string }[] = [
  { inst: '*', color: 'black' },
  { inst: 'ABORT', color: 'black' },
  { inst: 'ADD', color: 'black' },
  { inst: 'ADVINIT', color: 'black' },
  { inst: 'ADVSTOP', color: 'black' },
  { inst: 'AND', color: 'black' },
  { inst: 'AOUT', color: 'black' },
  { inst: 'ARATIOF', color: 'black' },
  { inst: 'ARATION', color: 'black' },
  { inst: 'ARCCTE', color: 'red' },
  { inst: 'ARCCTS', color: 'red' },
  { inst: 'ARCCUR', color: 'red' },
  { inst: 'ARCMONOF', color: 'red' },
  { inst: 'ARCMONON', color: 'red' },
];

export function DisplaySettingDialog({ onClose }: DisplaySettingDialogProps) {
  const [tab, setTab] = useState<'general' | 'color'>('general');
  const [font, setFont] = useState('Courier New');
  const [fontSize, setFontSize] = useState(10.0);
  const [commentColor, setCommentColor] = useState('green');
  const [stdTextColor, setStdTextColor] = useState('black');
  const [stdBackColor, setStdBackColor] = useState('white');
  const [textTextColor, setTextTextColor] = useState('black');
  const [textBackColor, setTextBackColor] = useState('white');
  const [showStepNo, setShowStepNo] = useState(false);
  const [showIoName, setShowIoName] = useState(false);
  const [showVarName, setShowVarName] = useState(false);
  const [dispPosition, setDispPosition] = useState(33);
  const [startUp, setStartUp] = useState<'standard' | 'text'>('standard');

  return (
    <Modal title="Display Setting" onClose={onClose} width={480}>
      <div className="dialog-tabs">
        <button className={`dialog-tab ${tab === 'general' ? 'active' : ''}`} onClick={() => setTab('general')}>
          General
        </button>
        <button className={`dialog-tab ${tab === 'color' ? 'active' : ''}`} onClick={() => setTab('color')}>
          Color
        </button>
      </div>

      {tab === 'general' && (
        <>
          <div className="two-col">
            <div>
              <div className="section-title">Font</div>
              <div className="form-row">
                <select value={font} onChange={(e) => setFont(e.target.value)}>
                  <option>Courier New</option>
                  <option>Consolas</option>
                  <option>Lucida Console</option>
                </select>
                <input
                  type="number"
                  step="0.1"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  style={{ width: 60, flex: 'none' }}
                />
              </div>
            </div>
            <div>
              <div className="section-title">Comment</div>
              <div className="form-row">
                <label>Comment</label>
                <select value={commentColor} onChange={(e) => setCommentColor(e.target.value)}>
                  {COLOR_DEFS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="two-col">
            <div>
              <div className="section-title">Standard</div>
              <div className="form-row">
                <label>Text Color</label>
                <select value={stdTextColor} onChange={(e) => setStdTextColor(e.target.value)}>
                  {COLOR_DEFS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label>Back Color</label>
                <select value={stdBackColor} onChange={(e) => setStdBackColor(e.target.value)}>
                  {COLOR_DEFS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div className="section-title">Text</div>
              <div className="form-row">
                <label>Text Color</label>
                <select value={textTextColor} onChange={(e) => setTextTextColor(e.target.value)}>
                  {COLOR_DEFS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-row">
                <label>Back Color</label>
                <select value={textBackColor} onChange={(e) => setTextBackColor(e.target.value)}>
                  {COLOR_DEFS.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="two-col">
            <div>
              <div className="section-title">Auxiliary Information</div>
              <label className="checkbox-row">
                <input type="checkbox" checked={showStepNo} onChange={() => setShowStepNo((v) => !v)} />
                Step No
              </label>
              <label className="checkbox-row">
                <input type="checkbox" checked={showIoName} onChange={() => setShowIoName((v) => !v)} />
                I/O name
              </label>
              <label className="checkbox-row">
                <input type="checkbox" checked={showVarName} onChange={() => setShowVarName((v) => !v)} />
                Variable Name
              </label>
            </div>
            <div>
              <div className="form-row">
                <label>Disp Position</label>
                <input type="number" value={dispPosition} onChange={(e) => setDispPosition(Number(e.target.value))} />
              </div>
            </div>
          </div>

          <div className="section-title">Start Up</div>
          <label className="radio-row">
            <input type="radio" checked={startUp === 'standard'} onChange={() => setStartUp('standard')} />
            Standard
          </label>
          <label className="radio-row">
            <input type="radio" checked={startUp === 'text'} onChange={() => setStartUp('text')} />
            Text
          </label>
        </>
      )}

      {tab === 'color' && (
        <div className="two-col">
          <div>
            <div className="section-title">COLOR DEF.</div>
            <div className="data-table-scroll" style={{ maxHeight: 220 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>COLOR NAME</th>
                    <th>VAL.</th>
                  </tr>
                </thead>
                <tbody>
                  {COLOR_DEFS.map((c) => (
                    <tr key={c.name}>
                      <td>
                        <span className="color-swatch" style={{ background: c.name }} />
                        {c.name}
                      </td>
                      <td>{c.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-actions" style={{ justifyContent: 'flex-start' }}>
              <button className="btn">ADD.</button>
              <button className="btn">DEL.</button>
            </div>
          </div>
          <div>
            <div className="section-title">Private Settings</div>
            <div className="data-table-scroll" style={{ maxHeight: 220 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>INST/TAG</th>
                    <th>COLOR NAME</th>
                  </tr>
                </thead>
                <tbody>
                  {PRIVATE_SETTINGS.map((p) => (
                    <tr key={p.inst}>
                      <td>{p.inst}</td>
                      <td>{p.color}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="modal-actions" style={{ justifyContent: 'flex-start' }}>
              <button className="btn">ADD.</button>
              <button className="btn">DEL.</button>
            </div>
          </div>
        </div>
      )}

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
