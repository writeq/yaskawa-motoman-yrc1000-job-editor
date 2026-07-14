export interface OpenJobResult {
  filePath: string;
  content: string;
  /** Whether an ALL.PRM parameter file was found alongside the job. */
  paramFileFound: boolean;
}

export interface OpenConditionFileResult {
  filePath: string;
  content: string;
}

export interface JobEditorAPI {
  version: string;
  openJobDialog: () => Promise<OpenJobResult | null>;
  saveAsDialog: (defaultName: string) => Promise<string | null>;
  writeJobFile: (filePath: string, content: string) => Promise<true>;
  openConditionFileDialog: () => Promise<OpenConditionFileResult | null>;
  writeConditionFile: (filePath: string, content: string) => Promise<true>;
}

declare global {
  interface Window {
    jobEditor?: JobEditorAPI;
  }
}
