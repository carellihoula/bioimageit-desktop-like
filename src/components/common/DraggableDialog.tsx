import { useEffect, useRef } from "react";
import { AiOutlineExpand } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import { Rnd } from "react-rnd";

const rndStyle = {
  display: "flex",
  justifyContent: "center",
  BackgroundColor: "red",
  // border: "var(--dv-tab-divider-color)",
  zIndex: 1001,
};

interface DraggableDialogProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

// Backdrop Style
const backdropStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000, // Lower than Rnd
};

function DraggableDialog({ children, isOpen, onClose }: DraggableDialogProps) {
  const dialogContentRef = useRef<HTMLDivElement>(null); // Reference for internal content

  useEffect(() => {
    // Do nothing if the dialog is not open
    if (!isOpen) {
      return;
    }

    // Function to check outside click
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is INSIDE the dialog content (referenced by dialogContentRef), do nothing
      if (
        dialogContentRef.current &&
        dialogContentRef.current.contains(event.target as Node)
      ) {
        return;
      }
      // Otherwise, close the dialog
      onClose();
    };

    // Function to handle Escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listeners (on mousedown to capture before other potential clicks)
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    // Clean up listeners on unmount or if isOpen becomes false
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // --- Render nothing if isOpen is false ---
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div style={backdropStyle} onClick={onClose} aria-hidden="true" />
      <Rnd
        style={rndStyle}
        default={{
          x: 200,
          y: 200,
          width: 500,
          height: 500,
        }}
        minWidth={300}
        minHeight={300}
      >
        <div
          className="flex flex-col h-full w-full dv-fg dv-group-bg dv-shadow"
          ref={dialogContentRef}
        >
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

          <div className="p-4">{children}</div>
        </div>
      </Rnd>
    </>
  );
}

export default DraggableDialog;
