import './LogViewer.css';
import { useAppState, useAppDispatch } from '../../state/store';
import { parseTextModeContent } from '../../data/textMode';

export function LogViewer() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  if (!state.view.logViewer) return null;

  function jump(lineNo: number | null) {
    if (lineNo === null) return;
    if (state.editMode === 'text') {
      const lines = parseTextModeContent(state.textModeContent);
      dispatch({ type: 'REPLACE_LINES', lines });
      dispatch({ type: 'SET_EDIT_MODE', mode: 'standard' });
    }
    dispatch({ type: 'SELECT_LINE', lineNo });
  }

  return (
    <div className="log-viewer">
      {state.logMessages.length === 0 ? (
        <div className="log-entry log-entry-muted">No messages.</div>
      ) : (
        state.logMessages.map((entry, i) => (
          <div
            key={i}
            className={`log-entry ${entry.lineNo !== null ? 'log-entry-clickable' : ''}`}
            onClick={() => jump(entry.lineNo)}
          >
            {entry.text}
          </div>
        ))
      )}
    </div>
  );
}
