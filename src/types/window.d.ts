export interface OpenJobResult {
  filePath: string;
  content: string;
}

export interface JobEditorAPI {
  version: string;
  openJobDialog: () => Promise<OpenJobResult | null>;
  saveAsDialog: (defaultName: string) => Promise<string | null>;
  writeJobFile: (filePath: string, content: string) => Promise<true>;
}

declare global {
  interface Window {
    jobEditor?: JobEditorAPI;
  }
}
