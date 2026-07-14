import './JobEditor.css';
import { useAppState, useAppDispatch } from '../../state/store';
import { LineEditBar } from '../LineEditBar/LineEditBar';
import { TextModeEditor } from '../TextModeEditor/TextModeEditor';
import { LogViewer } from '../LogViewer/LogViewer';

export function JobEditor() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const { job } = state;
  const isLineEditing = state.lineEditor !== null;

  return (
    <div className="job-editor">
      <div className="job-tabs">
        <div className="job-tab active">{job.fileName}</div>
      </div>
      {state.editMode === 'text' ? (
        <TextModeEditor />
      ) : (
        <div className={`job-lines ${isLineEditing ? 'job-lines-locked' : ''}`}>
          {job.lines.map((line) => {
            const isSelected = line.lineNo === state.selectedLine;
            return (
              <div
                key={line.lineNo}
                className={`job-line ${isSelected ? 'selected' : ''} ${line.isCommentMarked ? 'commented' : ''}`}
                onClick={() => !isLineEditing && dispatch({ type: 'SELECT_LINE', lineNo: line.lineNo })}
              >
                <span className="job-line-no">
                  {line.isEditLocked ? 'X' : ''}
                  {String(line.lineNo).padStart(4, '0')}
                </span>
                <span className="job-line-text">
                  {line.isCommentMarked && '//'}
                  {line.text}
                </span>
              </div>
            );
          })}
        </div>
      )}
      <LogViewer />
      <LineEditBar />
    </div>
  );
}
