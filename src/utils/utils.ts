import { useStore } from "@xyflow/react";

export function useIsSourceNode(nodeId?: string) {
  return useStore((state) => {
    if (!nodeId) return false;

    // Check if this node is used as a target in an edge
    const hasIncoming = state.edges.some((edge) => edge.target === nodeId);
    return !hasIncoming; // true if it is a source node
  });
}
