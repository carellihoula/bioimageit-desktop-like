import * as React from "react";
import { TreeItem, TreeItemProps } from "@mui/x-tree-view/TreeItem";
import { ToolInfo } from "@/types";

/**
 * CustomTreeItem component that extends the TreeItem component
 * to support drag-and-drop functionality for tools.
 * It accepts a `tool` prop of type ToolInfo to determine if the item is draggable.
 * @param props - The props for the TreeItem component, including a `tool` prop.
 * @param ref - The ref to be forwarded to the TreeItem component.
 * @returns A TreeItem component with drag-and-drop functionality.
 */
export const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: TreeItemProps & { tool?: ToolInfo },
  ref: React.Ref<HTMLLIElement>
) {
  const { tool, ...rest } = props;

  return (
    <TreeItem
      {...rest}
      ref={ref}
      draggable={!!tool}
      onDragStart={(e) => handleDragStart(e, tool)}
    />
  );
});

const DRAG_DATA_FORMAT = "application/json";

/**
 * Handles the drag start event for a tree item.
 * @param event - The drag event.
 * @param toolInfo - The ToolInfo object associated with the item.
 */
const handleDragStart = (
  event: React.DragEvent<HTMLElement>,
  toolInfo: ToolInfo | undefined
) => {
  // Check that it's a tool
  if (toolInfo) {
    try {
      // Transfers complete ToolInfo object to JSON
      event.dataTransfer.setData(DRAG_DATA_FORMAT, JSON.stringify(toolInfo));
      event.dataTransfer.effectAllowed = "move";
      //   console.log(
      //     `Dragging: ${toolInfo.name}, Path: ${toolInfo.module_path}`
      //   );
      //   console.log("toolinfo", toolInfo);
    } catch (error) {
      console.error("Error setting drag data:", error);
    }
  }
};
