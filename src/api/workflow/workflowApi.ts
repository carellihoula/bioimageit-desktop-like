export async function fetchWorkflows(): Promise<string[]> {
  const response = await fetch("http://localhost:8000/api/workflows");
  const data: string[] = await response.json();
  return data;
}

export async function createWorkflow(name: string) {
  const response = await fetch("http://localhost:8000/api/workflows/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to create workflow");
  }

  return await response.json();
}

export async function duplicateWorkflow({
  source,
  target,
}: {
  source: string;
  target: string;
}) {
  const response = await fetch(
    "http://localhost:8000/api/workflows/duplicate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source, target }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to duplicate workflow");
  }

  return response.json();
}

export async function deleteWorkflow(name: string) {
  const res = await fetch("http://localhost:8000/api/workflows/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(name),
  });
  if (!res.ok) throw new Error("Failed to delete workflow");
  return await res.json();
}

export async function renameWorkflow({
  oldName,
  newName,
}: {
  oldName: string;
  newName: string;
}) {
  const res = await fetch("http://localhost:8000/api/workflows/rename", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ old: oldName, new: newName }),
  });
  if (!res.ok) throw new Error("Failed to rename workflow");
  return await res.json();
}
