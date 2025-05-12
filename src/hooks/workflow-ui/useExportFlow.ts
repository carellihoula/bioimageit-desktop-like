import { useReactFlow } from "@xyflow/react";

export function useExportFlow(filename = "workflow.json") {
  const { toObject } = useReactFlow();

  const exportFlow = () => {
    const flow = toObject();
    const json = JSON.stringify(flow, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return exportFlow;
}
