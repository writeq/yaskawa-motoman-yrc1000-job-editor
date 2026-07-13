import './TitleBar.css';
import { useAppState, useAppDispatch } from '../../state/store';

export function TitleBar() {
  const state = useAppState();
  const dispatch = useAppDispatch();

  return (
    <div className="title-bar">
      <button
        className="orb-button"
        title="Menu"
        onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'backstage' })}
      >
        <span className="orb-glyph">◍</span>
      </button>
      <div className="quick-access">
        <button title="New Job" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'createJob' })}>
          🗎
        </button>
        <button title="Open Job">📂</button>
        <button title="Save">💾</button>
        <span className="quick-access-arrow">▾</span>
      </div>
      <div className="title-bar-text">{state.job.fileName.replace('.JBI', '')}YRC1000</div>
    </div>
  );
}
