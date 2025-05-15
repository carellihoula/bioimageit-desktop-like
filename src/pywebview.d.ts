/**
 * Type definitions for pywebview API bridge
 * Provides TypeScript type safety for pywebview JavaScript API calls
 * Used to interface between the web frontend and Python backend
 */
interface PywebviewApiBridge {
  selectFolderDialog: () => Promise<string | null>;
  // method_name: (param1: type, param2: type) => Promise<return_type>;
  save_file_dialog: (
    filename: string,
    base64_data: string
  ) => Promise<{ path?: string; error?: string }>;
  export_workflow_direct_save: (
    workflow_full_path_str: string
  ) => Promise<{ path?: string; error?: string }>;
}

// Declare the Window global interface extension
declare global {
  interface Window {
    // pywebview will only exist in the pywebview environment
    pywebview?: {
      api: PywebviewApiBridge;
    };
  }
}

export {};
