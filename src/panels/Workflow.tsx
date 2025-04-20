import { useEffect, useRef, useState, useCallback, MouseEvent } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ReactFlowInstance,
  Connection,
  NodeChange,
  EdgeChange,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { StickyNoteNode } from "@/components/Workflow-ui/StickyNoteNode";
import { CommentNode } from "@/components/Workflow-ui/CommentNode";
import { IOBlockNode } from "@/components/Workflow-ui/BasicIOBlockNode";
import { useCopyPaste } from "@/hooks/workflow-ui/useCopyPaste";
import { useFlowHistory } from "@/hooks/workflow-ui/useFlowHistory";

// keys in localStorage
const STORAGE_NODES = "workflow-nodes";
const STORAGE_EDGES = "workflow-edges";

const nodeTypes = {
  sticky: StickyNoteNode,
  comment: CommentNode,
  io: IOBlockNode,
};

const initialNodes: Node[] = [
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
];
const initialEdges: Edge[] = [];

export default function Workflow() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  // load saved or fallback
  const savedNodesJson = localStorage.getItem(STORAGE_NODES);
  const savedEdgesJson = localStorage.getItem(STORAGE_EDGES);

  // ReactFlow state
  const [nodes, setNodes, onRFNodesChange] = useNodesState(
    savedNodesJson ? JSON.parse(savedNodesJson) : initialNodes
  );
  const [edges, setEdges, onRFEdgesChange] = useEdgesState(
    savedEdgesJson ? JSON.parse(savedEdgesJson) : initialEdges
  );

  useCopyPaste(rfInstance);
  const { init, push, undo, redo } = useFlowHistory();

  // on mount, seed the history with our starting graph
  useEffect(() => {
    init(nodes, edges);
  }, [init]);

  // persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_NODES, JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_EDGES, JSON.stringify(edges));
  }, [edges]);

  // context menu state
  const [ctx, setCtx] = useState<{
    x: number;
    y: number;
    node: Node;
  } | null>(null);

  // onNodesChange = just update state
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      onRFNodesChange(changes);
    },
    [onRFNodesChange]
  );

  // onEdgesChange = just update state
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      onRFEdgesChange(changes);
    },
    [onRFEdgesChange]
  );

  // onConnect: update + push history
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => {
        const next = addEdge(params, eds);
        push(nodes, next);
        return next;
      });
    },
    [nodes, push]
  );

  // onNodeDragStop: push history once
  const onNodeDragStop = useCallback(() => {
    const curNodes = rfInstance?.getNodes() ?? nodes;
    const curEdges = rfInstance?.getEdges() ?? edges;
    push(curNodes, curEdges);
  }, [nodes, edges, push, rfInstance]);

  // onNodeContextMenu: show our menu
  const onNodeContextMenu = useCallback((event: MouseEvent, node: Node) => {
    event.preventDefault();
    setCtx({ x: event.clientX, y: event.clientY, node });
  }, []);

  // menu actions
  const deleteNode = useCallback(() => {
    if (!ctx) return;
    setNodes((nds) => nds.filter((n) => n.id !== ctx.node.id));
    setCtx(null);
  }, [ctx]);

  const duplicateNode = useCallback(() => {
    if (!ctx) return;
    setNodes((nds) => {
      const copy = {
        ...ctx.node,
        id: Math.random().toString(16).slice(2),
        position: {
          x: ctx.node.position.x + 20,
          y: ctx.node.position.y + 20,
        },
      };
      return [...nds, copy];
    });
    setCtx(null);
  }, [ctx]);

  const closeMenu = useCallback(() => {
    setCtx(null);
  }, []);

  // global click to close menu
  useEffect(() => {
    const onClick = () => setCtx(null);
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // global keyboard undo/redo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === "z") {
        e.preventDefault();
        undo(setNodes, setEdges);
      }
      if ((e.ctrlKey || e.metaKey) && key === "y") {
        e.preventDefault();
        redo(setNodes, setEdges);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, setNodes, setEdges]);

  return (
    <div
      ref={wrapperRef}
      style={{ width: "100%", height: "100%" }}
      tabIndex={0}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={setRfInstance}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onNodeContextMenu={onNodeContextMenu}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>

      {/* Context menu */}
      {ctx && (
        <div
          className="bg-white border border-gray-300 rounded shadow-md z-50"
          style={{ position: "fixed", top: ctx.y, left: ctx.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={deleteNode}
          >
            Delete Node
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={duplicateNode}
          >
            Duplicate Node
          </div>
          <div
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={closeMenu}
          >
            Cancel
          </div>
        </div>
      )}
    </div>
  );
}
