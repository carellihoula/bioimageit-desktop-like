// import React from "react";
import { Position, Node, NodeProps, useStore } from "@xyflow/react";
import { CustomHandle } from "./CustomHandle";

export type IOData = { label?: string };
// Define a React Flow Node type whose data matches IOData and whose edge IDs are strings
type IONode = Node<IOData, string>;

/**
 * A custom React Flow node that displays:
 * - Two radio buttons ("in" / "out") for selecting direction
 * - Invisible React Flow handles on the left and right edges
 */
export function IOBlockNode({ id, data, selected }: NodeProps<IONode>) {
  const edges = useStore((s) => s.edges);

  // Check if an edge is connected to the left handle (target)
  const isInConnected = edges.some((e) => e.target === id);
  // Check if an edge originates from the right handle (source)
  const isOutConnected = edges.some((e) => e.source === id);
  return (
    <div
      tabIndex={0}
      className={`border border-blue-500
        rounded-xl
        bg-white
        w-48
        overflow-hidden
        shadow-sm
        focus:outline-none   
         ${selected && "ring-2 ring-blue-500"}`}
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
            name={`flow-radio-${id}-in`}
            checked={isInConnected}
            readOnly
            value="in"
            className="accent-blue-500"
          />
          in
        </label>
        {/* Radio 'out' */}
        <label className="flex items-center gap-1 text-sm">
          <input
            type="radio"
            name={`flow-radio-${id}-out`}
            checked={isOutConnected}
            readOnly
            value="out"
            className="accent-blue-500"
          />
          out
        </label>
      </div>

      <CustomHandle type="target" position={Position.Left} />
      <CustomHandle type="source" position={Position.Right} />
    </div>
  );
}
