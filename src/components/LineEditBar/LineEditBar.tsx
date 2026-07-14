import './LineEditBar.css';
import { useAppState, useAppDispatch } from '../../state/store';
import { buildInstructionText } from '../../data/instructions';

export function LineEditBar() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { lineEditor, selectedLine, job } = state;
  if (!lineEditor) return null;
  const mode = lineEditor.mode;

  const previewText = buildInstructionText(lineEditor.name, lineEditor.fields);

  function commit() {
    if (mode === 'insert') {
      dispatch({ type: 'INSERT_LINE', text: previewText });
    } else if (selectedLine !== null) {
      dispatch({ type: 'UPDATE_LINE', lineNo: selectedLine, text: previewText });
    }
    dispatch({ type: 'CLOSE_LINE_EDITOR' });
  }

  function cancel() {
    dispatch({ type: 'CLOSE_LINE_EDITOR' });
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') commit();
    else if (e.key === 'Escape') cancel();
  }

  const lineCount = job.lines.length + (lineEditor.mode === 'insert' ? 1 : 0);

  return (
    <div className="line-edit-bar" onKeyDown={handleKeyDown}>
      <div className="line-edit-nav">
        <button title="Previous variant">◂</button>
        <button title="Next variant">▸</button>
      </div>
      <span className="line-edit-preview" tabIndex={0} autoFocus>
        {previewText}
      </span>
      <button
        className="btn"
        disabled={lineEditor.fields.length === 0}
        onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'lineDetailEdit' })}
      >
        Edit
      </button>
      <button className="btn btn-primary" onClick={commit}>
        Ok
      </button>
      <button className="btn" onClick={cancel}>
        Cancel
      </button>
      <span className="line-edit-stats">
        {previewText.length + 2}Byte {lineCount}Lines
      </span>
    </div>
  );
}
