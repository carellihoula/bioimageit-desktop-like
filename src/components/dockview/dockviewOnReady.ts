// src/lib/dockviewOnReady.ts
import { useCodeServerStore } from "@/store/useCodeServerStore";
import { DockviewReadyEvent, DockviewApi } from "dockview";

export function dockviewOnReady(
  event: DockviewReadyEvent,
  windowWidth: number
) {
  const api = event.api as DockviewApi;
  useCodeServerStore.getState().setDockviewApi(api);

  const toolsInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 250;
  const workflowInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 1300;

  // Column panel Tools / Properties
  const toolsPanel = api.addPanel({
    id: "tools",
    title: "Tools",
    component: "default",
    initialWidth: toolsInitialWidth,
    initialHeight: 800, // 400px pour le haut

    position: { direction: "left" },
  });
  api.addPanel({
    id: "Workflow-manager",
    title: "Workflow Manager",
    component: "default",
  });
  api.addPanel({
    id: "execution-controls",
    title: "Execution",
    component: "default",
  });

  //toolsPanel is active by default
  toolsPanel.api.setActive();

  api.addPanel({
    id: "properties",
    title: "Properties",
    component: "default",
    // initialHeight: 320,
    initialWidth: toolsInitialWidth,
    position: {
      referencePanel: "tools",
      direction: "below",
    },
  });

  // Column panel Workflow / WebTableTool
  api.addPanel({
    id: "workflow",
    title: "Workflow",
    component: "default",
    initialWidth: workflowInitialWidth,
    position: { direction: "right" },
  });

  const webTablePanel = api.addPanel({
    id: "webtabletool",
    title: "WebTable Tool",
    component: "default",
    initialHeight: 320,
    position: { referencePanel: "workflow", direction: "below" },
  });
  api.addPanel({
    id: "logstool",
    title: "Logs Tool",
    component: "default",
    // tabComponent: "default",
    // params: {
    //   myValue: "Logs Tool",
    // },
  });

  //webTablePanel is active by default
  webTablePanel.api.setActive();
}
