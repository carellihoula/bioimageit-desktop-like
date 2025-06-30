// export interface PanelConfig {
//   id: string;
//   title: string;
//   component: string;
//   initialWidth?: number;
//   initialHeight?: number;
//   inactive?: boolean;
//   position?: {
//     direction?: "left" | "right" | "above" | "below" | "within";
//     referencePanel?: string;
//   };
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dockviewPanelConfigs: Record<string, any> = {
  tools: {
    id: "tools",
    title: "Tools",
    component: "default",
    initialWidth: 250,
    initialHeight: 800,
    position: { direction: "left" },
  },
  "workflow-manager": {
    id: "workflow-manager",
    title: "Workflow Manager",
    component: "default",
    inactive: true,
    position: { referencePanel: "tools", direction: "within" },
  },
  "execution-controls": {
    id: "execution-controls",
    title: "Execution",
    component: "default",
    inactive: true,
    position: { referencePanel: "tools", direction: "within" },
  },
  properties: {
    id: "properties",
    title: "Properties",
    component: "default",
    initialWidth: 250,
    position: { referencePanel: "tools", direction: "below" },
  },
  webtabletool: {
    id: "webtabletool",
    title: "WebTable Tool",
    component: "default",
    initialHeight: 320,
    position: { direction: "right" },
  },
  "workflow-ui": {
    id: "workflow-ui",
    title: "Workflow",
    component: "default",
    initialWidth: 1300,
    position: {
      referencePanel: "webtabletool",
      direction: "above",
    },
  },

  logstool: {
    id: "logstool",
    title: "Logs Tool",
    component: "default",
    inactive: true,
    position: { referencePanel: "webtabletool", direction: "within" },
  },
};
