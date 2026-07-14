import { contextBridge, ipcRenderer } from 'electron';

export interface OpenJobResult {
  filePath: string;
  content: string;
  /** Whether an ALL.PRM parameter file was found alongside the job. The
   * real hardware/pendant requires it to correctly interpret a job's
   * instructions; we only check for its presence, we don't parse it. */
  paramFileFound: boolean;
}

const jobEditorAPI = {
  version: process.env.npm_package_version ?? '0.0.0',
  openJobDialog: (): Promise<OpenJobResult | null> => ipcRenderer.invoke('job:open-dialog'),
  saveAsDialog: (defaultName: string): Promise<string | null> =>
    ipcRenderer.invoke('job:save-as-dialog', defaultName),
  writeJobFile: (filePath: string, content: string): Promise<true> =>
    ipcRenderer.invoke('job:write-file', filePath, content),
};

contextBridge.exposeInMainWorld('jobEditor', jobEditorAPI);

export type JobEditorAPI = typeof jobEditorAPI;
