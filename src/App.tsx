import React, { useEffect, useState } from "react";
import {
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps,
  DockviewApi,
  IDockviewPanelHeaderProps,
  IDockviewHeaderActionsProps,
} from "dockview";
import "dockview/dist/styles/dockview.css";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
} from "react-icons/vsc";

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

/**
 * Components to be used in the Dockview panels.
 * The values are the components themselves.
 * The components are imported from their respective files.
 * The components are used in the Dockview API to create panels.
 */
interface CustomParams {
  myValue: string;
}

export const RightComponent = (props: IDockviewHeaderActionsProps) => {
  return (
    <div className="flex items-center space-x-1 pr-2 h-full custom-window-controls">
      {/* Bouton Réduire Fenêtre */}
      {/* <button
        // onClick={handleMinimizeWindow}
        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
        aria-label="Minimize Window"
        title="Minimize Window"
      >
        
        <VscChromeMinimize />
      </button> */}

      <button
        // onClick={handleMaximizeRestoreWindow}
        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
        aria-label={"Maximize/Restore Window"} // L'état exact dépendrait de l'API de l'environnement
        title={"Maximize/Restore Window"}
      >
        <VscChromeMaximize />
        {/* <VscChromeRestore /> */}
      </button>

      <button
        // onClick={handleCloseWindow}
        className="p-1 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 rounded"
        aria-label="Close Window"
        title="Close Window"
      >
        <VscChromeClose />
      </button>
    </div>
  );
};
const tabComponents = {
  default: (props: IDockviewPanelHeaderProps<CustomParams>) => {
    // Function to handle closing the panel
    const handleClose = (event: React.MouseEvent) => {
      event.stopPropagation(); // Prevent tab selection/drag
      props.api.close(); // Use the panel API to close
    };

    // const handleMaximize = (event: React.MouseEvent) => {
    //   event.stopPropagation();
    //   if (props.api.isMaximized) {
    //      props.api.exitMaximize();
    //   } else {
    //      props.api.maximize();
    //   }
    // }

    return (
      <div className="flex justify-between w-full h-full items-center px-2">
        {/* Left side: Title */}
        <div>
          {/* Display custom param if available, otherwise default title */}
          {props.params?.myValue ?? props.api.title}
        </div>

        <div className="flex items-center space-x-1">
          {/* <button onClick={handleMaximize} className="panel-control-button">...</button> */}

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" // Add some basic styling
            aria-label="Close Panel"
          >
            <VscChromeClose />
          </button>
        </div>
      </div>
    );
  },
};
const components = {
  default: (props: IDockviewPanelProps) => {
    switch (props.api.id) {
      case "tools":
        return <Tools />;
      case "properties":
        //mockNode, mockNodeCellpose
        return <Properties />;
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

    //ttoolsPanel is active by default
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
      tabComponent: "default",
      params: {
        myValue: "Logs Tool",
      },
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
        tabComponents={tabComponents}
        theme={theme}
        rightHeaderActionsComponent={RightComponent}
        className={theme.className}
      />
    </div>
  );
};

export default App;
