import { create } from "zustand";

interface WorkflowStore {
  paths: string[];
  selectedPath: string | null;
  setPaths: (paths: string[]) => void;
  setSelectedPath: (path: string | null) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  paths: [],
  selectedPath: null,
  setPaths: (paths) => set({ paths }),
  setSelectedPath: (selectedPath) => set({ selectedPath }),
}));
