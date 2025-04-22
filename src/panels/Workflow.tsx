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
import { contextMenu } from "@/lib/const";
// import { Item } from "@radix-ui/react-menubar";
import { ContextMenu } from "@/components/Workflow-ui/ContextMenu";
import { initialNodes } from "@/mock/initialNodesAndEdges";

// keys in localStorage
const STORAGE_NODES = "workflow-nodes";
const STORAGE_EDGES = "workflow-edges";

const nodeTypes = {
  sticky: StickyNoteNode,
  comment: CommentNode,
  io: IOBlockNode,
};

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

  const onConnect = useCallback(
    (params: Connection) => {
      const nextEdges = addEdge(params, edges);
      setEdges(nextEdges);
      push(nodes, nextEdges); // 👈 push après la MAJ effective
    },
    [edges, setEdges, push, nodes]
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
  }, [ctx, setNodes]);

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
  }, [ctx, setNodes]);

  const closeMenu = useCallback(() => {
    setCtx(null);
  }, []);

  const handleAction = (action: (typeof contextMenu)[number]["action"]) => {
    if (action === "duplicate") {
      duplicateNode();
    } else if (action === "delete") {
      deleteNode();
    } else if (action === "cancel") {
      closeMenu();
    } else if (action === "edit") {
      alert("open code-server");
    }
    setCtx(null);
  };

  // const actionsMap = {
  //   delete: deleteNode,
  //   duplicate: duplicateNode,
  //   cancel: closeMenu,
  // };

  // const handleAction = (action: (typeof contextMenu)[number]["action"]) => {
  //   actionsMap[action]?.();
  //   setCtx(null);
  // };

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
        onNodeDragStart={() => setCtx(null)}
        onNodeDragStop={onNodeDragStop}
        onNodeContextMenu={onNodeContextMenu}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>

      {/* Context menu */}

      {ctx && (
        <ContextMenu
          x={ctx.x}
          y={ctx.y}
          visible={!!ctx}
          items={contextMenu}
          onAction={handleAction}
        />
      )}
    </div>
  );
}
