import React, { useEffect, useState } from "react";
import {
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  DockviewApi,
} from "dockview";
import "dockview/dist/styles/dockview.css";

import { Tools } from "./panels/Tools";
import { Properties } from "./panels/Properties";
import Workflow from "./panels/Workflow";
import { WebTableTool } from "./panels/WebTableTool";
import { CodeServer } from "./panels/CodeServer";
import { ExecutionControls } from "./panels/ExecutionControls";
import { WorkflowManager } from "./panels/WorkflowManager";
import { MainMenuBar } from "./components/common/MainMenuBar";
import { dockviewThemes } from "./components/common/DockviewThemeSelector";
import { LogsPanel } from "./panels/LogsPanel";
import { mockNode } from "./mock/fakeProperties";
import { mockNodeCellpose } from "./mock/mockNodeCellpose";

/**
 * Components to be used in the Dockview panels.
 * The values are the components themselves.
 * The components are imported from their respective files.
 * The components are used in the Dockview API to create panels.
 */
const components = {
  default: (props: IDockviewPanelProps) => {
    switch (props.api.id) {
      case "tools":
        return <Tools />;
      case "properties":
        //mockNode, mockNodeCellpose
        return <Properties node={mockNodeCellpose} />;
      case "workflow":
        return <Workflow />;
      case "webtabletool":
        return <WebTableTool />;
      case "codeserver":
        return <CodeServer />;
      case "execution-controls":
        return <ExecutionControls />;
      case "Workflow-manager":
        return <WorkflowManager />;
      case "logstool":
        return <LogsPanel />;
      default:
        return <div>Panel inconnu</div>;
    }
  },
  // tab: (props: IDockviewPanelProps) => <PanelTitleBar {...props} />,
};

const App: React.FC = () => {
  // Panel columnHook to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [theme, setTheme] = useState(dockviewThemes[0].theme);
  // Each time the `theme` changes, we apply its className to <html>.
  // Each time the theme changes, we (re)apply the class to html
  useEffect(() => {
    const root = document.documentElement;

    dockviewThemes.forEach((t) => root.classList.remove(t.theme.className));

    root.classList.add(theme.className);
  }, [theme]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate initial widths responsively
  const toolsInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 250;
  const workflowInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 1300;
  // const codeServerInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 600;

  // Initialize and configure the dockview layout with panels for tools, workflow management,
  // execution controls, properties, workflow editor, web table tool, logs, and code server
  const onReady = (event: DockviewReadyEvent) => {
    const api = event.api as DockviewApi;

    // Column panel Tools / Properties
    const toolsPanel = api.addPanel({
      id: "tools",
      title: "Tools",
      component: "default",
      initialWidth: toolsInitialWidth,
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

    //ttoolsPanel is active by default
    toolsPanel.api.setActive();

    api.addPanel({
      id: "properties",
      title: "Properties",
      component: "default",
      initialHeight: 320,
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
    });

    //webTablePanel is active by default
    webTablePanel.api.setActive();

    // Panel CodeServer
    // api.addPanel({
    //   id: "codeserver",
    //   title: "Code Server",
    //   component: "default",
    //   initialWidth: codeServerInitialWidth,
    //   position: { direction: "right" },
    // });
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MainMenuBar
        setTheme={setTheme}
        theme={theme}
        // className={theme.className}
      />
      <DockviewReact
        onReady={onReady}
        components={components}
        theme={theme}
        className={theme.className}
      />
    </div>
  );
};

export default App;
