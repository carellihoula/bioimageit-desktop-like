export async function fetchWorkflows(): Promise<string[]> {
  const response = await fetch("http://localhost:8000/api/workflows/");
  const data: string[] = await response.json();
  return data;
}

export async function createWorkflow({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const response = await fetch("http://localhost:8000/api/workflows/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, path }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to create workflow");
  }

  return await response.json();
}

export async function deleteWorkflow(workflowName: string) {
  const res = await fetch("http://localhost:8000/api/workflows/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: workflowName }),
  });
  if (!res.ok) throw new Error("Failed to delete workflow");
  return await res.json();
}

export async function renameWorkflow({
  old_full_path,
  new_name,
}: {
  old_full_path: string;
  new_name: string;
}) {
  const res = await fetch("http://localhost:8000/api/workflows/rename", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ old_full_path, new_name }),
  });
  if (!res.ok) throw new Error("Failed to rename workflow");
  return await res.json();
}

export interface DuplicateWorkflowParams {
  source_path: string; // Full path of the source workflow
  target_parent_path: string; // Path of the directory where the duplicate will be created
  target_name: string; // Name for the new duplicated workflow folder
}

export async function duplicateWorkflow({
  source_path,
  target_parent_path,
  target_name,
}: DuplicateWorkflowParams): Promise<any> {
  const API_URL = "http://localhost:8000/api/workflows/duplicate";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      source_path: source_path,
      target_parent_path: target_parent_path,
      target_name: target_name,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    // Use the error message from the server's JSON response if available
    const errorMessage =
      responseData?.error ||
      responseData?.message ||
      `Failed to duplicate workflow (status: ${response.status})`;
    throw new Error(errorMessage);
  }

  return responseData;
}
