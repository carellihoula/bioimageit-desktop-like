/**
 * Type definitions for pywebview API bridge
 * Provides TypeScript type safety for pywebview JavaScript API calls
 * Used to interface between the web frontend and Python backend
 */

import { Edge, Node } from "@xyflow/react";

interface WorkflowGraphData {
  nodes: Node[];
  edges: Edge[];
  viewport?: { x: number; y: number; zoom: number };
}

interface OpenWorkflowResult {
  success?: boolean;
  path?: string;
  graph_data?: WorkflowGraphData;
  registration_status?: "registered" | "already_exists" | "failed" | "unknown";
  error?: string;
}

interface SaveWorkflowResult {
  success?: boolean;
  message?: string;
  error?: string;
}
interface LoadWorkflowResult {
  success?: boolean;
  data?: WorkflowGraphData;
  error?: string;
}

interface PywebviewApiBridge {
  // method_name: (param1: type, param2: type) => Promise<return_type>;
  selectFolderDialog: () => Promise<string | null>;
  exportWorkflowDirectSave: (
    workflow_full_path_str: string
  ) => Promise<{ path?: string; error?: string }>;
  openWorkflowFromSelectedFolder: () => Promise<OpenWorkflowResult>;
  loadWorkflow(path: string): Promise<LoadWorkflowResult>;
  saveWorkflow(
    path: string,
    graph: ReactFlowJsonObject<Node, Edge>
  ): Promise<SaveWorkflowResult>;
}

// Declare the Window global interface extension
declare global {
  interface Window {
    // pywebview will only exist in the pywebview environment
    pywebview?: {
      api: PywebviewApiBridge;
    };
  }
}

export {};
