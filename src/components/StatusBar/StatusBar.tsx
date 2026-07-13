import './StatusBar.css';
import { useAppState } from '../../state/store';
import { jobSizeBytes, jobStepCount } from '../../types/jbi';

export function StatusBar() {
  const state = useAppState();
  if (!state.view.statusBar) return null;
  const { job } = state;

  return (
    <div className="status-bar">
      <span>{jobSizeBytes(job)}Byte</span>
      <span>{job.lines.length}Lines</span>
      <span>{jobStepCount(job)}Steps</span>
      <span className="status-bar-spacer" />
      <span>Control Group: {job.header.controlGroup}</span>
    </div>
  );
}
