import {
  Connection,
  Edge,
  getOutgoers,
  Node,
  useReactFlow,
} from "@xyflow/react";
import { useCallback } from "react";

export const useValidConnection = () => {
  const { getNodes, getEdges } = useReactFlow();
  const isValidConnection = useCallback(
    (connection: Connection | Edge) => {
      const nodes = getNodes();
      const edges = getEdges();
      const target = nodes.find((node) => node.id === connection.target);
      const hasCycle = (node: Node, visited = new Set()) => {
        if (visited.has(node.id)) return false;

        visited.add(node.id);

        for (const outgoer of getOutgoers(node, nodes, edges)) {
          if (outgoer.id === connection.source) return true;
          if (hasCycle(outgoer, visited)) return true;
        }
      };

      if (!target || target?.id === connection.source) return false;
      return !hasCycle(target);
    },
    [getNodes, getEdges]
  );

  return isValidConnection;
};
