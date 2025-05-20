import { DockviewApi } from "dockview";
import { create } from "zustand";

interface CodeServerStore {
  nodeId: string | null;
  openPanel: () => void;
  setNodeId: (id: string) => void;
  dockviewApi: DockviewApi | null;
  setDockviewApi: (api: DockviewApi) => void;
}

export const useCodeServerStore = create<CodeServerStore>((set, get) => ({
  nodeId: null,
  dockviewApi: null,

  setNodeId: (id) => set({ nodeId: id }),

  setDockviewApi: (api) => set({ dockviewApi: api }),

  openPanel: () => {
    const api = get().dockviewApi;
    if (!api) return;

    const existing = api.getPanel("codeserver");
    if (existing) {
      existing.api.setActive();
    } else {
      api.addPanel({
        id: "codeserver",
        title: "Code Server",
        component: "default",
        position: { direction: "right" },
      });
    }
  },
}));
