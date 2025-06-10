import { IDockviewHeaderActionsProps } from "dockview";
import React from "react";
import {
  VscChromeClose,
  // VscChromeMaximize,
  // VscChromeRestore,
} from "react-icons/vsc";
import { AiOutlineExpand } from "react-icons/ai";

const DockMaximizeCloseControlsBase = (props: IDockviewHeaderActionsProps) => {
  const handleMaximizeRestoreWindow = () => {
    if (props.api.isMaximized()) {
      props.api.exitMaximized();
    } else {
      props.api.maximize();
    }
  };
  const handleCloseWindow = () => {
    props.api.close();
  };

  return (
    <div className="flex items-center space-x-1 pr-2 h-full custom-window-controls">
      <button
        onClick={handleMaximizeRestoreWindow}
        className="p-1 dv-fg dv-icon-hover rounded"
        aria-label={"Maximize/Restore Window"}
        title={"Maximize/Restore Window"}
      >
        {/* <VscChromeMaximize /> */}
        {/* {props.api.isMaximized() ? <VscChromeRestore /> : <VscChromeMaximize />} */}
        <AiOutlineExpand />
      </button>

      <button
        onClick={handleCloseWindow}
        className="p-1 dv-fg dv-icon-hover rounded"
        aria-label="Close Window"
        title="Close Window"
      >
        <VscChromeClose />
      </button>
    </div>
  );
};
export const DockMaximizeCloseControls = React.memo(
  DockMaximizeCloseControlsBase
);
