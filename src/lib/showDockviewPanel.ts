import { useCodeServerStore } from "@/store/useCodeServerStore";
import { dockviewPanelConfigs } from "./dockviewPanelConfigs";

export function showDockviewPanel(id: string) {
  const api = useCodeServerStore.getState().dockviewApi;
  if (!api) {
    console.warn("Dockview API not ready");
    return;
  }

  const panel = api.getPanel(id);
  if (panel) {
    panel.api.setActive();
  } else {
    const config = dockviewPanelConfigs[id];
    if (config) {
      api.addPanel(config);
      api.getPanel(id)?.api.setActive();
    } else {
      console.warn(`No panel configuration found "${id}"`);
    }
  }
}
