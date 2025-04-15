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
// import PanelTitleBar from "./components/common/PanelTitleBar";

const components = {
  default: (props: IDockviewPanelProps) => {
    switch (props.api.id) {
      case "tools":
        return <Tools />;
      case "properties":
        return <Properties />;
      case "workflow":
        return <Workflow />;
      case "webtabletool":
        return <WebTableTool />;
      case "codeserver":
        return <CodeServer />;
      default:
        return <div>Panel inconnu</div>;
    }
  },
  // tab: (props: IDockviewPanelProps) => <PanelTitleBar {...props} />,
};

const App: React.FC = () => {
  // Panel columnHook to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate initial widths responsively
  const toolsInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 250;
  const workflowInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 800;
  const codeServerInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 600;

  const onReady = (event: DockviewReadyEvent) => {
    const api = event.api as DockviewApi;

    // Column panel Tools / Properties
    api.addPanel({
      id: "tools",
      title: "Tools",
      component: "default",
      initialWidth: toolsInitialWidth,
      position: { direction: "left" },
    });
    api.addPanel({
      id: "Workflow-tools",
      title: "Workflow",
      component: "default",
    });
    api.addPanel({
      id: "execution",
      title: "Execution",
      component: "default",
    });

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

    api.addPanel({
      id: "webtabletool",
      title: "WebTable Tool",
      component: "default",
      initialHeight: 320,
      position: { referencePanel: "workflow", direction: "below" },
    });

    // Panel CodeServer
    api.addPanel({
      id: "codeserver",
      title: "Code Server",
      component: "default",
      initialWidth: codeServerInitialWidth,
      position: { direction: "right" },
    });
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <DockviewReact
        className="dockview-theme-dark"
        onReady={onReady}
        components={components}
      />
    </div>
  );
};

export default App;
