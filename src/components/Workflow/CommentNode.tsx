import React from "react";
import { Handle, Position, Node, NodeProps } from "@xyflow/react";

export type CommentData = { comment?: string };
type CommentNodeType = Node<CommentData, string>;

export function CommentNode({ data }: NodeProps<CommentNodeType>) {
  return (
    <div
      style={{
        background: "#888",
        color: "#fff",
        border: "1px solid #333",
        borderRadius: 4,
        padding: 8,
        fontFamily: "sans-serif",
        width: 150,
      }}
    >
      <strong>Comment node</strong>
      <hr style={{ borderColor: "#444" }} />
      <div>{data.comment || ""}</div>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}
