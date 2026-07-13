import './StatusBar.css';
import { useAppState } from '../../state/store';
import { jobSizeBytes, jobStepCount } from '../../types/jbi';

export function StatusBar() {
  const state = useAppState();
  if (!state.view.statusBar) return null;
  const { job } = state;
  const modeLabel = state.editMode === 'standard' ? 'Standard Mode' : 'Text Mode';
  const lineTag = state.selectedLine !== null ? `S:${String(state.selectedLine).padStart(3, '0')}` : '';

  return (
    <div className="status-bar">
      <span className="status-bar-mode">[{modeLabel}]</span>
      <span>J:{job.header.name}</span>
      {lineTag && <span>{lineTag}</span>}
      <span>{job.header.controlGroup}</span>
      <span className="status-bar-spacer" />
      <span>{jobSizeBytes(job)}Byte</span>
      <span>{job.lines.length}Lines</span>
      <span>{jobStepCount(job)}Steps</span>
    </div>
  );
}
