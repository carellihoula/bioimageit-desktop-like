/**
 * Type definitions for pywebview API bridge
 * Provides TypeScript type safety for pywebview JavaScript API calls
 * Used to interface between the web frontend and Python backend
 */

import { Edge, Node } from "@xyflow/react";
import { NodeData } from "./types";

interface WorkflowToolInfo {
  module_path: string; // ex: "/Tools/foo/bar.py"
  absolute_path: string; // ex: "/home/user/Workflows/MyWF/Tools/foo/bar.py"
}

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
interface GetImagesFolderPathResult {
  success?: boolean;
  path?: string;
  error?: string;
}
interface NodeResults {
  status: string;
  payload: NodeData;
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
  launchCodeServer: () => void;
  getStatus: () => Promise<string>;
  getHomePath: () => Promise<string>;
  getWorkflowTools: (path: string) => Promise<WorkflowToolInfo[]>;
  node_selected: (node: Node, workflow_path: string) => Promise<NodeResults>;
  run_workflow: (graphJson: string, workflowPath: string) => Promise<string>;
  getImagesFolderPath: (mode: string) => Promise<GetImagesFolderPathResult>;
}

// Declare the Window global interface extension
declare global {
  interface Window {
    // pywebview will only exist in the pywebview environment
    pywebview?: {
      api: PywebviewApiBridge;
    };
    updateProgress: (percent: number) => void;
  }
}

export {};
