import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppState } from '../../state/store';
import { IconGlobe } from '../icons/Icons';
import './dialogs.css';

interface SelectLanguageDialogProps {
  onClose: () => void;
}

const LANGUAGE_FLAGS: Record<string, string> = {
  English: '🇬🇧',
  Swedish: '🇸🇪',
  German: '🇩🇪',
  French: '🇫🇷',
  Danish: '🇩🇰',
  Finnish: '🇫🇮',
  Italian: '🇮🇹',
  Spanish: '🇪🇸',
  Norwegian: '🇳🇴',
  Russian: '🇷🇺',
};

const LANGUAGES = Object.keys(LANGUAGE_FLAGS);

export function SelectLanguageDialog({ onClose }: SelectLanguageDialogProps) {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(state.language);
  const [asDefault, setAsDefault] = useState(true);

  function handleOk() {
    dispatch({ type: 'SET_LANGUAGE', language: selected });
    onClose();
  }

  return (
    <Modal title="Select Language" icon={<IconGlobe size={16} />} onClose={onClose} width={300}>
      <div className="create-job-title">Language:</div>
      <div className="two-col">
        <div className="list-box" style={{ height: 160 }}>
          {LANGUAGES.map((lang) => (
            <div
              key={lang}
              className={`list-box-item ${selected === lang ? 'selected' : ''}`}
              onClick={() => setSelected(lang)}
            >
              {lang}
            </div>
          ))}
        </div>
        <div className="language-flag">{LANGUAGE_FLAGS[selected]}</div>
      </div>
      <label className="checkbox-row">
        <input type="checkbox" checked={asDefault} onChange={() => setAsDefault((v) => !v)} />
        Select as default next startup
      </label>
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
