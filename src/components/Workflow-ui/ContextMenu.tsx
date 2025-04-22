import { ContextMenuItem } from "@/types";
import React from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  visible: boolean;
  items: ContextMenuItem[];
  onAction: (action: ContextMenuItem["action"]) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  visible,
  items,
  onAction,
}) => {
  if (!visible) return null;

  return (
    <div
      className="bg-white border border-gray-300 rounded shadow-md z-50"
      style={{ position: "fixed", top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => onAction(item.action)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
