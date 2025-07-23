import { useWorkflowStore } from "@/store/useWorkflowStore";
import { useQueryClient } from "@tanstack/react-query";

export const useOpenWorkflow = () => {
  const queryClient = useQueryClient();
  const setSelectedPath = useWorkflowStore((state) => state.setSelectedPath);
  const selectedPath = useWorkflowStore((state) => state.selectedPath);
  const selectedName = selectedPath?.split("/").pop();
  const paths = useWorkflowStore((state) => state.paths);
  const setPaths = useWorkflowStore((state) => state.setPaths);

  const handleOpenWorkflow = async () => {
    if (
      window.pywebview &&
      window.pywebview.api &&
      typeof window.pywebview.api.openWorkflowFromSelectedFolder === "function"
    ) {
      try {
        const result =
          await window.pywebview.api.openWorkflowFromSelectedFolder();

        if (result.success && result.graph_data && result.path) {
          // setCurrentWorkflowPath(result.path);
          setSelectedPath(result.path);
          if (!paths.includes(result.path)) {
            const updated = [...paths, result.path];
            setPaths(updated);

            queryClient.setQueryData(["getWorkflows"], updated);
            // setPaths([...paths, result.path]);
          }
        } else if (result.error) {
          alert(`Error opening workflow: ${result.error}`);
        }
      } catch (error) {
        alert(`Erreur JavaScript: ${error}`);
      }
    }
  };

  return {
    handleOpenWorkflow,
    selectedPath,
    selectedName,
  };
};
