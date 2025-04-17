// src/components/Workflow.tsx
import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { StickyNoteNode } from "@/components/Workflow/StickyNoteNode";
import { CommentNode } from "@/components/Workflow/CommentNode";
import { IOBlockNode } from "@/components/Workflow/BasicIOBlockNode";
import CustomNode from "@/components/Workflow/CustomNode";

// Map the `type` field on each node to the corresponding React component
const nodeTypes = {
  sticky: StickyNoteNode,
  comment: CommentNode,
  io: IOBlockNode,
  custom: CustomNode,
};

// Initial nodes: specify `id`, `type`, `position` and `data`
const initialNodes: Node<any, string>[] = [
  {
    id: "1",
    type: "comment",
    position: { x: 200, y: 100 },
    data: { comment: "This is a comment" },
  },
  {
    id: "2",
    type: "sticky",
    position: { x: 400, y: 100 },
    data: { text: "Text Goes Here" },
  },
  {
    id: "3",
    type: "io",
    position: { x: 300, y: 300 },
    data: { label: "Stracking detection" },
  },
  {
    id: "4",
    type: "io",
    position: { x: 400, y: 500 },
    data: { label: "Extract Label" },
  },
  {
    id: "5",
    type: "custom",
    data: { name: "Jane Doe", job: "CEO", emoji: "😎" },
    position: { x: 0, y: 50 },
  },
];

const initialEdges: Edge<Record<string, unknown>>[] = [];

export default function Workflow() {
  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<any, string>>(initialNodes);
  const [edges, setEdges, onEdgesChange] =
    useEdgesState<Edge<Record<string, unknown>>>(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
        {/* <MiniMap /> */}
      </ReactFlow>
    </div>
  );
}
