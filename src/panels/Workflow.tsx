import {
  useEffect,
  useRef,
  useState,
  useCallback,
  MouseEvent,
  useMemo,
} from "react";
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
import { ContextMenu } from "@/components/Workflow-ui/ContextMenu";
import { ToolInfo } from "@/types";
import { transformLabelFromPath } from "@/lib/transformLabelFromPath";
import { useWorkflowStore } from "@/store/useWorkflowStore";
import { useCodeServerStore } from "@/store/useCodeServerStore";
import { useSocket } from "@/context/SocketContext";
import { useValidConnection } from "@/hooks/workflow-ui/useValidConnection";
import { CustomConnectionLine } from "@/components/Workflow-ui/CustomConnectionLine";
import { getProjectPath } from "@/api/workflow/workflowApi";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { NodeResultsStore } from "@/store/NodeResultsStore";

export default function Workflow() {
  const nodeTypes = useMemo(
    () => ({
      sticky: StickyNoteNode,
      comment: CommentNode,
      io: IOBlockNode,
    }),
    []
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const selectedPath = useWorkflowStore((state) => state.selectedPath);
  const pendingMessage = useRef<string | null>(null);
  const { sendMessage, withPermission, setWithPermission } = useSocket();
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ReactFlow state
  const [nodes, setNodes, onRFNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onRFEdgesChange] = useEdgesState<Edge>([]);
  const isValidConnection = useValidConnection();
  async function launchCodeServer() {
    const result = await window?.pywebview?.api.launchCodeServer();
  }

  useCopyPaste(rfInstance);
  const { init, push, undo, redo } = useFlowHistory();
  const [workflowToolPaths, setWorkflowToolPaths] = useState<Set<string>>(
    new Set()
  );

  const showToaster = () => {
    toaster.create({
      description: "Unable to load the selected workflow.",
      type: "error",
      duration: 3000,
    });
  };

  // Load workflow when selectedPath changes
  useEffect(() => {
    if (!selectedPath || !rfInstance) return;

    async function load() {
      try {
        const flow = await window.pywebview?.api.loadWorkflow(
          selectedPath ?? ""
        );

        if (!flow || !flow.success) {
          // console.error("Loading failed:", flow?.error);
          // init([], []);
          showToaster();
          setIsLoaded(true);
          return;
        }
        const toolPaths = await window.pywebview?.api.getWorkflowTools(
          selectedPath ?? ""
        );
        const paths = toolPaths?.map((t) => t.module_path);
        setWorkflowToolPaths(new Set(paths));

        const data = flow.data;
        rfInstance?.setNodes(data?.nodes ?? []);
        rfInstance?.setEdges(data?.edges ?? []);
        rfInstance?.setViewport(data?.viewport ?? { x: 0, y: 0, zoom: 1 });
        init(data?.nodes ?? [], data?.edges ?? []);
        setIsLoaded(true);
      } catch (err) {
        console.error("JS error in loadWorkflow", err);
        init([], []);
        setIsLoaded(true);
      }
    }

    load();
  }, [selectedPath, rfInstance, init]);

  // Save flow on nodes or edges change
  useEffect(() => {
    if (!rfInstance || !selectedPath || !isLoaded) return;

    async function save() {
      try {
        const flow = rfInstance?.toObject();
        await window.pywebview?.api.saveWorkflow(selectedPath ?? "", flow);
      } catch (err) {
        console.error("Failed to save workflow", err);
      }
    }

    // save();
    // Debouncing to prevent multiple backups
    const timeoutId = setTimeout(save, 300);
    return () => clearTimeout(timeoutId);
  }, [nodes, edges, rfInstance, selectedPath, isLoaded]);

  // init flow history
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setRfInstance(instance);
  }, []);

  // save flow to localStorage on change
  // useEffect(() => {
  //   if (!rfInstance) return;
  //   const flow = rfInstance.toObject();
  //   localStorage.setItem("flow", JSON.stringify(flow));
  // }, [nodes, edges, rfInstance]);

  // context menu state
  const [ctx, setCtx] = useState<{
    x: number;
    y: number;
    node: Node;
  } | null>(null);

  // onNodesChange = just update state
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const removedNodeIds = changes
        .filter((change) => change.type === "remove")
        .map((change) => change.id);

      if (removedNodeIds.length > 0) {
        setEdges((eds) =>
          eds.filter(
            (edge) =>
              !removedNodeIds.includes(edge.source) &&
              !removedNodeIds.includes(edge.target)
          )
        );
      }
      onRFNodesChange(changes);
    },
    [onRFNodesChange, setEdges]
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
      push(nodes, nextEdges);
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
    const nodeId = ctx.node.id;
    setNodes((nds) => nds.filter((n) => n.id !== ctx.node.id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
    setCtx(null);
  }, [ctx, setNodes, setEdges]);

  const duplicateNode = useCallback(() => {
    if (!ctx) return;
    setNodes((nds) => {
      const copy = {
        ...ctx.node,
        id: crypto.randomUUID(),
        position: {
          x: ctx.node.position.x + 20,
          y: ctx.node.position.y + 20,
        },
      };
      return [...nds, copy];
    });
    setCtx(null);
  }, [ctx, setNodes]);

  //
  const sendFileMessage = useCallback(
    async (finalPath: string) => {
      const message = {
        topic: "open_file",
        action: "publish",
        message: finalPath,
      };
      sendMessage(JSON.stringify(message));
      // console.log("message sent  >>>", JSON.stringify(message));
    },
    [sendMessage]
  );

  const handleAction = async (
    action: (typeof contextMenu)[number]["action"]
  ) => {
    console.log("permission Outside", withPermission);
    if (!ctx) return;
    if (action === "duplicate") {
      duplicateNode();
    } else if (action === "delete") {
      deleteNode();
    } else if (action === "edit") {
      const tool = ctx.node.data.tool as ToolInfo;

      const codeServerStore = useCodeServerStore.getState();
      if (!codeServerStore.isOpen) {
        // setWithPermission(false);
        codeServerStore.openPanel();

        launchCodeServer();
      }
      // const modulePath = tool.module_path;
      const projectPath = await getProjectPath();
      const modulePath = tool.module_path?.replace(/\./g, "/") + ".py";
      const isInWorkflow = workflowToolPaths.has(modulePath);
      console.log("permission", withPermission);
      const finalPath = isInWorkflow
        ? `${selectedPath}/${modulePath}`
        : `${projectPath}/src/Tools/${modulePath}`;

      if (withPermission) {
        sendFileMessage(finalPath);
      } else {
        // Otherwise, request permission and store the message
        const permission = {
          action: "wait_for_permission",
          topic: "open_file",
        };
        pendingMessage.current = JSON.stringify({
          topic: "open_file",
          action: "publish",
          message: finalPath,
        });
        sendMessage(JSON.stringify(permission));
      }
    }
    setCtx(null);
  };

  useEffect(() => {
    if (withPermission === true && pendingMessage.current) {
      sendMessage(pendingMessage.current);
      // console.log("message sent  >>>", pendingMessage.current);
      pendingMessage.current = null;
    } else if (withPermission === false && pendingMessage.current) {
      // console.log("Permission denied, message canceled.");
      pendingMessage.current = null;
    }
  }, [withPermission]);

  useEffect(() => {
    const unsub = useCodeServerStore.subscribe((state) => {
      if (!state.isOpen) {
        setWithPermission(false);
      }
    });

    // Closes context menu on global click
    const onClick = () => setCtx(null);
    document.addEventListener("click", onClick);

    return () => {
      unsub();
      document.removeEventListener("click", onClick);
    };
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

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const reactFlowBounds = wrapperRef.current?.getBoundingClientRect();
      const data = event.dataTransfer.getData("application/json");
      if (!data || !reactFlowBounds || !rfInstance) return;

      const tool = JSON.parse(data) as ToolInfo;
      const { x: viewportX, y: viewportY, zoom } = rfInstance.getViewport();
      const position = {
        x: (event.clientX - reactFlowBounds.left - viewportX) / zoom,
        y: (event.clientY - reactFlowBounds.top - viewportY) / zoom,
      };

      const newNode: Node = {
        id: `${tool.name}-${crypto.randomUUID()}`,
        type: "io",
        position,
        data: {
          label: transformLabelFromPath(tool.module_path),
          tool,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      push([...nodes, newNode], edges);
    },
    [rfInstance, nodes, edges, setNodes, push]
  );
  // const onNodeClick = useCallback(
  //   (_: React.MouseEvent, node: Node) => {
  //     // Send to backend (PyWebView)
  //     if (window.pywebview && window.pywebview.api) {
  //       window.pywebview.api
  //         .node_selected(node, selectedPath ?? "")
  //         .then((res) => {
  //           if (res.status === "ok" && res.payload?.results) {
  //             NodeResultsStore.getState().setNodeResults(res.payload);
  //           }
  //           console.log("Réponse backend :", res);
  //         })
  //         .catch((err) => console.error("Erreur d'envoi :", err));
  //     }
  //   },
  //   [selectedPath]
  // );
  return (
    <div
      ref={wrapperRef}
      style={{ width: "100%", height: "100%" }}
      tabIndex={0}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onInit={onInit}
        onNodesChange={onNodesChange}
        // onNodeClick={onNodeClick}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStart={() => setCtx(null)}
        onNodeDragStop={onNodeDragStop}
        onNodeContextMenu={onNodeContextMenu}
        isValidConnection={isValidConnection}
        connectionLineComponent={CustomConnectionLine}
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
      {!isLoaded && (
        <Flex
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="rgba(59, 57, 57, 0.34)"
          align="center"
          justify="center"
          direction="column"
          zIndex={10}
        >
          <Spinner size="xl" color="blue.400" borderWidth="2px" />
          <Text mt={3} fontSize="sm" color="white">
            Loading workflow...
          </Text>
        </Flex>
      )}
    </div>
  );
}
