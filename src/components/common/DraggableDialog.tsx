import { AiOutlineExpand } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  justifyContent: "center",
  BackgroundColor: "red",
  //   border: "var(--dv-tab-divider-color)",
  zIndex: 1000,
};

function DraggableDialog({ children }: { children: React.ReactNode }) {
  return (
    <Rnd
      style={style}
      default={{
        x: 200,
        y: 200,
        width: 500,
        height: 500,
      }}
    >
      <div className="flex flex-col h-full w-full dv-fg dv-group-bg dv-shadow">
        <div className="flex items-center space-x-1  pr-2 custom-window-controls w-full justify-end dv-height-tab dv-bg-tab-container">
          <button
            // onClick={handleMaximizeRestoreWindow}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            aria-label={"Maximize/Restore Window"}
            title={"Maximize/Restore Window"}
          >
            {/* <VscChromeMaximize /> */}
            {/* {props.api.isMaximized() ? <VscChromeRestore /> : <VscChromeMaximize />} */}
            <AiOutlineExpand />
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

        {children}
      </div>
    </Rnd>
  );
}

export default DraggableDialog;
