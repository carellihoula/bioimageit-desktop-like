import React, { useEffect, useState } from "react";
import {
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  DockviewApi,
} from "dockview";
import "dockview/dist/styles/dockview.css";

// Vos composants de panel
import { Tools } from "./panels/Tools";
import { Properties } from "./panels/Properties";
import Workflow from "./panels/Workflow";
import { WebTableTool } from "./panels/WebTableTool";
import { CodeServer } from "./panels/CodeServer";
import PanelTitleBar from "./components/common/PanelTitleBar";

const App: React.FC = () => {
  // Hook pour suivre la largeur de la fenêtre
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculez les largeurs initiales de manière responsive
  const toolsInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 250;
  const workflowInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 800;
  const codeServerInitialWidth = windowWidth < 768 ? windowWidth * 0.9 : 600;

  const onReady = (event: DockviewReadyEvent) => {
    const api = event.api as DockviewApi;

    // Panel colonne Tools / Properties
    api.addPanel({
      id: "panel_1",
      title: "Tools",
      component: "default",
      initialWidth: toolsInitialWidth,
      position: { direction: "left" },
    });

    api.addPanel({
      id: "panel_2",
      title: "Properties",
      component: "default",
      initialHeight: 320,
      initialWidth: toolsInitialWidth,
      position: {
        referencePanel: "panel_1",
        direction: "below",
      },
    });

    // Panel colonne Workflow / WebTableTool
    api.addPanel({
      id: "panel_3",
      title: "Workflow",
      component: "default",
      initialWidth: workflowInitialWidth,
      position: { direction: "right" },
    });

    api.addPanel({
      id: "panel_4",
      title: "WebTable Tool",
      component: "default",
      initialHeight: 320,
      position: { referencePanel: "panel_3", direction: "below" },
    });

    // Panel seul : CodeServer
    api.addPanel({
      id: "panel_5",
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
        components={{
          default: (props: IDockviewPanelProps) => {
            switch (props.api.id) {
              case "panel_1":
                return <Tools />;
              case "panel_2":
                return <Properties />;
              case "panel_3":
                return <Workflow />;
              case "panel_4":
                return <WebTableTool />;
              case "panel_5":
                return <CodeServer />;
              default:
                return <div>Panel inconnu</div>;
            }
          },
          tab: (props: IDockviewPanelProps) => <PanelTitleBar {...props} />,
        }}
      />
    </div>
  );
};

export default App;
