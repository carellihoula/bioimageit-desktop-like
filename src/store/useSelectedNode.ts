import { create } from "zustand";
import { ToolInfo } from "@/types";

type State = {
  selectedNode: ToolInfo | null;
  setSelectedNode: (node: ToolInfo | null) => void;
};

export const useSelectedNode = create<State>((set) => ({
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
}));
