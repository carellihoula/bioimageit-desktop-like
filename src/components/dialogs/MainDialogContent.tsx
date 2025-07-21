// import React from "react";
import { DraggableMainDialog } from "./DraggableMainDialog";
import { RenameWorkflowDialog } from "./RenameWorkflowDialog";
import { DeleteWorkflowDialog } from "./DeleteWorkflowDialog";
import { CreateWorkflowDialog } from "./CreateWorkflowDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTool,
  createWorkflow,
  deleteWorkflow,
  renameWorkflow,
} from "@/api/workflow/workflowApi";
import { useDialogStore } from "@/store/useDialogStore";
import { CreateToolDialog } from "./CreateToolDialog";
// import { Preferences } from "./Preferences";
import Preferences from "./PreferencesDaliog";

function MainDialogContent() {
  const { isOpen, type, workflow, closeDialog } = useDialogStore();
  // console.log("MainDialogContent", isOpen, type, workflow);
  const queryClient = useQueryClient();
  const renameMutation = useMutation({
    mutationFn: renameWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getWorkflows"] });
      closeDialog();
    },
  });
  const createMutattion = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getWorkflows"] });
      closeDialog();
    },
    // onError: (error: any) => {},
  });
  const createToolMutation = useMutation({
    mutationFn: createTool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["treeData"] });
      closeDialog();
    },
    // onError: (error: any) => {},
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getWorkflows"] });
      closeDialog();
    },
  });

  if (!isOpen) {
    return null;
  }
  return (
    <DraggableMainDialog isOpen={isOpen} onClose={closeDialog}>
      {type === "rename" && workflow && (
        <RenameWorkflowDialog
          workflow={workflow}
          onCancel={closeDialog}
          onRename={(new_name) =>
            renameMutation.mutate({
              old_full_path: workflow,
              new_name,
            })
          }
        />
      )}
      {type === "delete" && workflow && (
        <DeleteWorkflowDialog
          workflow={workflow}
          onCancel={closeDialog}
          onDelete={() => deleteMutation.mutate(workflow)}
        />
      )}
      {type === "create" && (
        <CreateWorkflowDialog
          onCancel={closeDialog}
          onCreate={(workflowName, path) =>
            createMutattion.mutate({ name: workflowName, path })
          }
        />
      )}
      {type === "create-tool" && (
        <CreateToolDialog
          onCancel={closeDialog}
          onCreate={(filename: string, current_workflow: string) =>
            createToolMutation.mutate({ filename, current_workflow })
          }
        />
      )}
      {type === "preferences" && (
        // <div>
        //   <p>Preferences</p>
        //   <p>Coming soon...</p>
        // </div>
        <Preferences />
      )}
    </DraggableMainDialog>
  );
}

export default MainDialogContent;
