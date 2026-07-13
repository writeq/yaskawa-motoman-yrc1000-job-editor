import './TitleBar.css';
import { useAppState, useAppDispatch } from '../../state/store';
import { IconOrb, IconNewFile, IconOpenFolderSmall, IconSaveDisk, IconChevronDown } from '../icons/Icons';

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
        <IconOrb size={22} />
      </button>
      <div className="quick-access">
        <button title="New Job" onClick={() => dispatch({ type: 'OPEN_DIALOG', name: 'createJob' })}>
          <IconNewFile size={15} />
        </button>
        <button title="Open Job">
          <IconOpenFolderSmall size={15} />
        </button>
        <button title="Save">
          <IconSaveDisk size={15} />
        </button>
        <span className="quick-access-arrow">
          <IconChevronDown size={9} />
        </span>
      </div>
      <div className="title-bar-text">{state.job.fileName.replace('.JBI', '')}YRC1000</div>
    </div>
  );
}
