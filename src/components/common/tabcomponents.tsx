import { IDockviewPanelHeaderProps } from "dockview";

interface CustomParams {
  myValue: string;
}

// to customize the tab components in dockview for each panel
export const tabComponents = {
  default: (props: IDockviewPanelHeaderProps<CustomParams>) => {
    // Function to handle closing the panel
    // const handleClose = (event: React.MouseEvent) => {
    //   event.stopPropagation(); // Prevent tab selection/drag
    //   props.api.close(); // Use the panel API to close
    // };

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
        <div>
          {/* Display custom param if available, otherwise default title */}
          {props.params?.myValue ?? props.api.title}
        </div>

        <div className="flex items-center space-x-1">
          {/* Close Button */}
          {/* <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" // Add some basic styling
            aria-label="Close Panel"
          >
            <VscChromeClose />
          </button> */}
        </div>
      </div>
    );
  },
};
