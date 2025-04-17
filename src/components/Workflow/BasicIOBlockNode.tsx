import React from "react";
import { Handle, Position, Node, NodeProps } from "@xyflow/react";

export type IOData = { label?: string };
// Define a React Flow Node type whose data matches IOData and whose edge IDs are strings
type IONode = Node<IOData, string>;

/**
 * A custom React Flow node that displays:
 * - Two radio buttons ("in" / "out") for selecting direction
 * - Invisible React Flow handles on the left and right edges
 */
export function IOBlockNode({ id, data }: NodeProps<IONode>) {
  return (
    <div
      className="
        border-4 border-blue-500
        rounded-xl
        bg-white
        w-48
        overflow-hidden
        shadow-sm
      "
    >
      {/* header */}
      <div className="bg-green-100 text-center font-medium py-1">
        {data.label || "Node"}
      </div>
      {/*  radio content*/}
      <div className="flex justify-between items-center p-2">
        {/* Radio 'in' */}
        <label className="flex items-center gap-1 text-sm">
          <input
            type="radio"
            name={`flow-radio-${id}`}
            value="in"
            className="accent-blue-500"
          />
          in
        </label>
        {/* Radio 'out' */}
        <label className="flex items-center gap-1 text-sm">
          <input
            type="radio"
            name={`flow-radio-${id}`}
            value="out"
            className="accent-blue-500"
          />
          out
        </label>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        // style={{ top: "50%", background: "#3b82f6" }}
        style={{
          top: "50%",
          width: 16,
          height: 16,
          background: "#10b981",
          border: "2px solid white",
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          top: "50%",
          width: 16,
          height: 16,
          background: "#10b981",
          borderRadius: 8,
          border: "2px solid white",
        }}
      />
    </div>
  );
}
