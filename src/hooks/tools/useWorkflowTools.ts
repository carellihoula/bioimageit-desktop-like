import { useQuery } from "@tanstack/react-query";

export const useWorkflowTools = (selectedPath: string | null) => {
  return useQuery({
    queryKey: ["workflowTools", selectedPath],
    enabled: !!selectedPath,
    queryFn: async () => {
      const tools = await window.pywebview?.api.getWorkflowTools(
        selectedPath ?? ""
      );
      return tools?.map((t: any) => t.module_path) ?? [];
    },
  });
};
