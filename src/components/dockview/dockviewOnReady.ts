// src/lib/dockviewOnReady.ts
import { dockviewPanelConfigs } from "@/lib/dockviewPanelConfigs";
import { useCodeServerStore } from "@/store/useCodeServerStore";
import { DockviewReadyEvent, DockviewApi } from "dockview";

export function dockviewOnReady(
  event: DockviewReadyEvent,
  windowWidth: number
) {
  const api = event.api as DockviewApi;
  useCodeServerStore.getState().setDockviewApi(api);

  // Apply a dynamic override on sizes according to windowWidth
  const overrides: Record<string, { initialWidth?: number }> = {
    tools: { initialWidth: windowWidth < 768 ? windowWidth * 0.9 : 250 },
    "workflow-ui": {
      initialWidth: windowWidth < 768 ? windowWidth * 0.9 : 1300,
    },
  };

  Object.entries(dockviewPanelConfigs).forEach(([id, config]) => {
    const override = overrides[id] || {};
    api.addPanel({
      ...config,
      ...override,
    });
  });
}
