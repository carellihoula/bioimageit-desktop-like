import { ReactFlowInstance, Node } from "@xyflow/react";
import { useCallback, useEffect } from "react";

export const useCopyPaste = (rfInstance: ReactFlowInstance | null) => {
  // Copy selected nodes to clipboard
  const onCopy = useCallback(
    (event: ClipboardEvent) => {
      if (!rfInstance) return;
      event.preventDefault();
      const selected = rfInstance.getNodes().filter((n) => n.selected);
      event.clipboardData?.setData("flowchart:nodes", JSON.stringify(selected));
    },
    [rfInstance]
  );

  // Paste nodes from clipboard
  const onPaste = useCallback(
    (event: ClipboardEvent) => {
      if (!rfInstance) return;
      event.preventDefault();
      const raw = event.clipboardData?.getData("flowchart:nodes");
      if (!raw) return;
      let nodes: Node[];
      try {
        nodes = JSON.parse(raw);
      } catch {
        return;
      }
      // Deselect everything
      rfInstance.setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
      // Add pasted nodes with new IDs & offset position
      const newNodes = nodes.map((n) => {
        const newId = Math.random().toString(16).slice(2);
        return {
          ...n,
          id: newId,
          selected: true,
          position: {
            x: n.position.x + 20,
            y: n.position.y + 20,
          },
        };
      });
      rfInstance.setNodes((nds) => [...nds, ...newNodes]);
    },
    [rfInstance]
  );

  useEffect(() => {
    window.addEventListener("copy", onCopy);
    return () => window.removeEventListener("copy", onCopy);
  }, [onCopy]);

  useEffect(() => {
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [onPaste]);
};
