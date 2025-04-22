import { Node, Edge } from "@xyflow/react";
import { useRef, useCallback } from "react";

export interface HistoryEntry {
  nodes: Node[];
  edges: Edge[];
}

/**
 * Tracks a stack of {nodes,edges} snapshots and exposes:
 *  - push(nodes,edges)
 *  - undo(setNodes,setEdges)
 *  - redo(setNodes,setEdges)
 */
export function useFlowHistory() {
  //   initialNodes: Node<any, string>[],
  //   initialEdges: Edge<any, string>[]
  const history = useRef<HistoryEntry[]>([]);
  const idx = useRef<number>(-1);

  const init = useCallback((nodes: Node[], edges: Edge[]) => {
    history.current = [{ nodes, edges }];
    idx.current = 0;
  }, []);

  const push = useCallback((nodes: Node[], edges: Edge[]) => {
    const h = history.current.slice(0, idx.current + 1);
    h.push({ nodes, edges });
    history.current = h;
    idx.current += 1;
  }, []);

  // Undo: go back one snapshot, call the setters
  const undo = useCallback(
    (setNodes: (nodes: Node[]) => void, setEdges: (edges: Edge[]) => void) => {
      if (idx.current <= 0) return;
      idx.current -= 1;
      const entry = history.current[idx.current];
      setNodes(entry.nodes);
      setEdges(entry.edges);
    },
    []
  );

  // Redo: go forward one snapshot
  const redo = useCallback(
    (setNodes: (nodes: Node[]) => void, setEdges: (edges: Edge[]) => void) => {
      if (idx.current >= history.current.length - 1) return;
      idx.current += 1;
      const entry = history.current[idx.current];
      setNodes(entry.nodes);
      setEdges(entry.edges);
    },
    []
  );

  return { init, push, undo, redo };
}
