import { NodeData } from "@/types";
import { create } from "zustand";

interface NodeResultsState {
  nodeResults: NodeData | null;
  setNodeResults: (payload: NodeData) => void;
}

export const NodeResultsStore = create<NodeResultsState>((set) => ({
  nodeResults: null, // pas de node sélectionné au départ
  setNodeResults: (payload) => set({ nodeResults: payload }),
}));
