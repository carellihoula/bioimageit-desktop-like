import { DialogTypes } from "@/lib/const";
import { useDialogStore } from "@/store/useDialogStore";
import { Dialog, Portal } from "@chakra-ui/react";
import { VscChromeClose, VscChromeMinimize } from "react-icons/vsc";

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
  const type = useDialogStore((state) => state.type);

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
              className="flex items-center w-full justify-between dv-height-tab dv-bg-tab-container pr-2"
              style={{
                cursor: "move",
                flexShrink: 0,
              }}
            >
              {/* Invisible spacer for balance */}
              <div className="flex-1"></div>

              {/* Centered title */}
              {DialogTypes.map(
                (typeItem, index) =>
                  type === typeItem.type && (
                    <h1 key={index} className="flex-1 text-center dv-fg">
                      {typeItem.title}
                    </h1>
                  )
              )}
              {/* Buttons on the right */}
              <div className="flex-1 flex justify-end gap-1">
                <button
                  className="p-1 dv-fg dv-icon-hover hover:bg-red-500 hover:text-white dark:hover:bg-red-600 rounded"
                  aria-label="Maximize Window"
                  title="Maximize Window"
                >
                  <VscChromeMinimize onClick={onClose} />
                </button>
                <button
                  className="p-1 dv-fg hover:bg-red-500 rounded"
                  aria-label="Close Window"
                  title="Close Window"
                >
                  <VscChromeClose onClick={onClose} />
                </button>
              </div>
            </div>
            <Dialog.Body>{children}</Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
        ;
      </Portal>
    </Dialog.Root>
  );
};
