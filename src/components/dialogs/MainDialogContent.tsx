// import React from "react";
import { DraggableMainDialog } from "./DraggableMainDialog";
import { RenameWorkflowDialog } from "./RenameWorkflowDialog";
import { DeleteWorkflowDialog } from "./DeleteWorkflowDialog";
import { CreateWorkflowDialog } from "./CreateWorkflowDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createWorkflow,
  deleteWorkflow,
  renameWorkflow,
} from "@/api/workflow/workflowApi";
import { useDialogStore } from "@/store/useDialogStore";

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
    </DraggableMainDialog>
  );
}

export default MainDialogContent;
