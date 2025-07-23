import React, { useEffect, useState } from "react";
import { DockviewReact } from "dockview";
import "dockview/dist/styles/dockview.css";
import { MainMenuBar } from "./components/common/MainMenuBar";
import { dockviewThemes } from "./components/common/DockviewThemeSelector";
import { DockMaximizeCloseControls } from "./components/common/DockMaximizeCloseControls";
import MainDialogContent from "./components/dialogs/MainDialogContent";
// import { useComponents } from "./components/dockview/dockviewComponents";
import { components } from "./components/dockview/dockviewComponents";
import { dockviewOnReady } from "./components/dockview/dockviewOnReady";
import { Toaster } from "./components/ui/toaster";

/**
 * Components to be used in the Dockview panels.
 * The values are the components themselves.
 * The components are imported from their respective files.
 * The components are used in the Dockview API to create panels.
 */
const App: React.FC = () => {
  // Panel columnHook to track window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [theme, setTheme] = useState(dockviewThemes[0].theme);
  // const components = useComponents();

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
        onReady={(e) => dockviewOnReady(e, windowWidth)}
        components={components}
        // tabComponents={tabComponents}
        theme={theme}
        rightHeaderActionsComponent={DockMaximizeCloseControls}
        className={theme.className}
      />
      <MainDialogContent />
      <Toaster />
    </div>
  );
};

export default App;
