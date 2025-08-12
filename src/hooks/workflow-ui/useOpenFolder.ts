import { useState } from "react";

export const useOpenFolder = () => {
  const [path, setPath] = useState<string | null>(null);

  const handleOpenFolder = async (): Promise<string | null> => {
    if (
      window.pywebview &&
      window.pywebview.api &&
      typeof window.pywebview.api.openWorkflowFromSelectedFolder === "function"
    ) {
      try {
        const result = await window.pywebview.api.getImagesFolderPath();

        if (result.success && result.path) {
          // setCurrentWorkflowPath(result.path);
          setPath(result?.path);
          return result.path;
        } else if (result.error) {
          alert(`Error opening workflow: ${result.error}`);
        }
      } catch (error) {
        alert(`Erreur JavaScript: ${error}`);
      }
    }
    return null;
  };

  return {
    handleOpenFolder,
    path,
  };
};
