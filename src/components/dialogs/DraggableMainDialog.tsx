import { Dialog, Portal } from "@chakra-ui/react";
import { VscChromeMaximize, VscChromeClose } from "react-icons/vsc";
// import { VscChromeRestore } from "react-icons/vsc";

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
        </Dialog.Positioner>
        ;
      </Portal>
    </Dialog.Root>
  );
};
