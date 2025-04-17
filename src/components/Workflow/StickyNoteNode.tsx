import React from "react";
import { Handle, Position, Node, NodeProps } from "@xyflow/react";

export type StickyData = { text?: string };

type StickyNode = Node<StickyData, string>;

export function StickyNoteNode({ data }: NodeProps<StickyNode>) {
  return (
    <div
      style={{
        background: "#fffa8b",
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: 8,
        fontFamily: "monospace",
        width: 180,
      }}
    >
      <strong>Sticky note</strong>
      <hr style={{ borderColor: "#888" }} />
      <div>{data.text || "Text Goes Here"}</div>
      {/* Utilisez vos handles pour connecter ce nœud */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}
