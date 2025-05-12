import { Dialog, Portal } from "@chakra-ui/react";
import { VscChromeMaximize, VscChromeClose } from "react-icons/vsc";
// import { VscChromeRestore } from "react-icons/vsc";
import { Rnd } from "react-rnd";

const rndStyle = {
  display: "flex",
  justifyContent: "center",
  zIndex: 1001,
  height: "auto",
};

interface DraggableDialogProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const DraggableMainDialog = ({
  children,
  isOpen,
  onClose,
}: DraggableDialogProps) => {
  return (
    <Dialog.Root
      closeOnInteractOutside={false}
      modal={false}
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open && onClose) {
          onClose();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Rnd
            style={rndStyle}
            default={{
              x: window.innerWidth / 2 - 250,
              y: window.innerHeight / 2 - 250,
              width: 500,
              height: "auto",
            }}
            minWidth={500}
            dragHandleClassName="draggable-dialog-header"
            bounds="window"
            enableResizing={{
              top: false,
              right: true,
              bottom: false,
              left: true,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
          >
            <Dialog.Content>
              <div
                className=" flex items-center w-full justify-end draggable-dialog-header dv-height-tab dv-bg-tab-container  pr-2 custom-window-controls"
                style={{
                  cursor: "move",
                  flexShrink: 0, // Prevents the header from shrinking
                }}
              >
                <button
                  // onClick={handleCloseWindow}
                  className="p-1 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 rounded"
                  aria-label="Close Window"
                  title="Close Window"
                >
                  <VscChromeMaximize onClick={onClose} />
                </button>
                <button
                  // onClick={handleCloseWindow}
                  className="p-1 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 rounded"
                  aria-label="Close Window"
                  title="Close Window"
                >
                  <VscChromeClose onClick={onClose} />
                </button>
              </div>
              <Dialog.Body>{children}</Dialog.Body>
              {/* <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Confirm</Button>
              </Dialog.Footer> */}
              {/* <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger> */}
            </Dialog.Content>
          </Rnd>
        </Dialog.Positioner>
        ;
      </Portal>
    </Dialog.Root>
  );
};
