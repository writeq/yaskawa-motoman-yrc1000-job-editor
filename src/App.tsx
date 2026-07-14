import './styles/theme.css';
import { AppStoreProvider, useAppDispatch, useAppState } from './state/store';
import { TitleBar } from './components/TitleBar/TitleBar';
import { Ribbon } from './components/Ribbon/Ribbon';
import { JobEditor } from './components/JobEditor/JobEditor';
import { StatusBar } from './components/StatusBar/StatusBar';
import { BackstageMenu } from './components/dialogs/BackstageMenu';
import { CreateJobDialog } from './components/dialogs/CreateJobDialog';
import { FindJumpDialog } from './components/dialogs/FindJumpDialog';
import { InsertInstructionDialog } from './components/dialogs/InsertInstructionDialog';
import { LineDetailEditDialog } from './components/dialogs/LineDetailEditDialog';
import { HeaderDialog } from './components/dialogs/HeaderDialog';
import { ModifySpeedDialog } from './components/dialogs/ModifySpeedDialog';
import { PositionVariableDialog } from './components/dialogs/PositionVariableDialog';
import { MatchControlGroupDialog } from './components/dialogs/MatchControlGroupDialog';
import { DisplaySettingDialog } from './components/dialogs/DisplaySettingDialog';
import { SelectLanguageDialog } from './components/dialogs/SelectLanguageDialog';
import { ConditionFileDialog } from './components/dialogs/ConditionFileDialog';
import { Toast } from './components/Toast/Toast';
import type { DialogName } from './state/store';

function DialogHost() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const close = (name: DialogName) => dispatch({ type: 'CLOSE_DIALOG', name });
  const isOpen = (name: DialogName) => state.openDialogs.has(name);

  return (
    <>
      {isOpen('backstage') && <BackstageMenu onClose={() => close('backstage')} />}
      {isOpen('createJob') && <CreateJobDialog onClose={() => close('createJob')} />}
      {isOpen('findJump') && <FindJumpDialog onClose={() => close('findJump')} />}
      {isOpen('insertInstruction') && <InsertInstructionDialog onClose={() => close('insertInstruction')} />}
      {isOpen('lineDetailEdit') && <LineDetailEditDialog onClose={() => close('lineDetailEdit')} />}
      {isOpen('header') && <HeaderDialog onClose={() => close('header')} />}
      {isOpen('modifySpeed') && <ModifySpeedDialog onClose={() => close('modifySpeed')} />}
      {isOpen('positionVariable') && <PositionVariableDialog onClose={() => close('positionVariable')} />}
      {isOpen('matchControlGroup') && <MatchControlGroupDialog onClose={() => close('matchControlGroup')} />}
      {isOpen('displaySetting') && <DisplaySettingDialog onClose={() => close('displaySetting')} />}
      {isOpen('selectLanguage') && <SelectLanguageDialog onClose={() => close('selectLanguage')} />}
      {isOpen('conditionFile') && <ConditionFileDialog onClose={() => close('conditionFile')} />}
    </>
  );
}

function AppShell() {
  return (
    <div className="app-window">
      <TitleBar />
      <Ribbon />
      <JobEditor />
      <StatusBar />
      <DialogHost />
      <Toast />
    </div>
  );
}

function App() {
  return (
    <AppStoreProvider>
      <AppShell />
    </AppStoreProvider>
  );
}

export default App;
