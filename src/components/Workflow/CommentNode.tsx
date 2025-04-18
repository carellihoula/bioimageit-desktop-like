// src/nodes/CommentNode.tsx
import React, { useCallback, useEffect, useRef } from "react";
import { Handle, Position, Node, NodeProps, useReactFlow } from "@xyflow/react";

export type CommentData = { comment?: string };
type CommentNodeType = Node<CommentData, string>;

export function CommentNode({ id, data }: NodeProps<CommentNodeType>) {
  const { setNodes } = useReactFlow();
  const taRef = useRef<HTMLTextAreaElement>(null);

  // Update this node’s `data.comment` in the React Flow state
  const onCommentChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newComment = evt.target.value;
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === id
            ? {
                ...n,
                data: { ...n.data, comment: newComment },
              }
            : n
        )
      );
    },
    [id, setNodes]
  );

  // Auto‑resize the textarea height to fit its content
  const adjustHeight = useCallback(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, []);

  useEffect(() => void adjustHeight(), [data.comment, adjustHeight]);

  return (
    <div
      style={{
        background: "#555",
        opacity: 0.9,
        color: "#fff",
        border: "1px solid #444",
        borderRadius: 4,
        padding: 8,
        fontFamily: "sans-serif",
        width: 180,
      }}
    >
      <strong style={{ display: "block", marginBottom: 4 }}>Comment</strong>
      <hr style={{ borderColor: "#666", marginBottom: 4 }} />

      <textarea
        ref={taRef}
        value={data.comment || ""}
        onChange={onCommentChange}
        placeholder="Type a comment…"
        style={{
          width: "100%",
          border: "none",
          background: "transparent",
          color: "inherit",
          fontFamily: "inherit",
          fontSize: "0.9em",
          lineHeight: "1.2em",
          resize: "none",
          overflow: "hidden",
        }}
      />

      {/* Invisible handles for connections */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}
