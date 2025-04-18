// src/nodes/StickyNoteNode.tsx
import React, { useCallback, useEffect, useRef } from "react";
import { Handle, Position, Node, NodeProps, useReactFlow } from "@xyflow/react";

export type StickyData = { title?: string; text?: string };
type StickyNode = Node<StickyData, string>;

const MAX_TITLE_LENGTH = 20;

export function StickyNoteNode({ id, data }: NodeProps<StickyNode>) {
  const { setNodes } = useReactFlow();
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const updateNode = useCallback(
    (field: "title" | "text", value: string) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, [field]: value } } : n
        )
      );
    },
    [id, setNodes]
  );

  const adjustSize = useCallback(() => {
    const ta = bodyRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.width = "auto";
    ta.style.height = ta.scrollHeight + "px";
    ta.style.width = ta.scrollWidth + "px";
  }, []);

  useEffect(() => void adjustSize(), [data.text, adjustSize]);

  return (
    <div
      style={{
        display: "inline-block",
        background: "#fffa8b",
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: 8,
        fontFamily: "monospace",
      }}
    >
      {/* Editable single‐line title */}
      <input
        ref={titleRef}
        type="text"
        value={data.title || ""}
        onChange={(e) =>
          updateNode("title", e.currentTarget.value.slice(0, MAX_TITLE_LENGTH))
        }
        placeholder="Title…"
        maxLength={MAX_TITLE_LENGTH}
        style={{
          width: "100%",
          border: "none",
          borderBottom: "1px solid #888",
          padding: 0,
          marginBottom: 4,
          fontWeight: "bold",
          fontFamily: "monospace",
          fontSize: "1em",
          outline: "none",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      />

      {/* Editable body */}
      <textarea
        ref={bodyRef}
        value={data.text || ""}
        onChange={(e) => updateNode("text", e.currentTarget.value)}
        placeholder="Type here…"
        style={{
          display: "block",
          border: "none",
          resize: "none",
          overflow: "hidden",
          background: "transparent",
          fontFamily: "monospace",
          fontSize: "0.9em",
          lineHeight: "1.2em",
          padding: 0,
          margin: 0,
        }}
      />

      {/* Invisible connection handles */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
}
