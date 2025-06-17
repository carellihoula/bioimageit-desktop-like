import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  type: "rename" | "delete" | "create" | "create-tool" | null;
  workflow: string | null;
  openDialog: (
    type: "rename" | "delete" | "create" | "create-tool",
    workflow?: string
  ) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  type: null,
  workflow: null,
  openDialog: (type, workflowArg) =>
    set({
      isOpen: true,
      type,
      workflow: workflowArg !== undefined ? workflowArg : null,
    }),
  closeDialog: () => set({ isOpen: false, type: null, workflow: null }),
}));
