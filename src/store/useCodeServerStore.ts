import { DockviewApi } from "dockview";
import { create } from "zustand";

interface CodeServerStore {
  nodeId: string | null;
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  setNodeId: (id: string) => void;
  dockviewApi: DockviewApi | null;
  setDockviewApi: (api: DockviewApi) => void;
}

export const useCodeServerStore = create<CodeServerStore>((set, get) => ({
  nodeId: null,
  dockviewApi: null,
  isOpen: false,

  setNodeId: (id) => set({ nodeId: id }),

  setDockviewApi: (api) => {
    // Attach a listener to update isOpen if the panel is closed manually
    api.onDidRemovePanel((panel) => {
      if (panel.id === "codeserver") {
        set({ isOpen: false });
      }
    });
    set({ dockviewApi: api });
  },

  openPanel: () => {
    const { dockviewApi, isOpen } = get();
    if (!dockviewApi) return;

    // If already open, just activate
    if (isOpen) {
      const existing = dockviewApi.getPanel("codeserver");
      existing?.api.setActive();
      return;
    }

    const existing = dockviewApi.getPanel("codeserver");
    if (existing) {
      existing.api.setActive();
      set({ isOpen: true });
    } else {
      dockviewApi.addPanel({
        id: "codeserver",
        title: "Code Server",
        component: "default",
        position: { direction: "right" },
      });
      set({ isOpen: true });
    }
  },

  closePanel: () => {
    const { dockviewApi } = get();
    if (!dockviewApi) return;

    const existing = dockviewApi.getPanel("codeserver");
    if (existing) {
      existing.api.close();
    }
  },
}));
