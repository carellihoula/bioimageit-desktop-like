import { useCallback, useEffect, useRef, useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";
import { useWorkflowStore } from "@/store/useWorkflowStore";
import { useSocket } from "@/context/SocketContext";
import { useCodeServerStore } from "@/store/useCodeServerStore";
import { useQueryClient } from "@tanstack/react-query";

export const CreateToolDialog = ({
  onCancel,
  onCreate,
}: {
  onCreate: (filename: string, current_workflow: string) => void;
  onCancel: () => void;
}) => {
  const selectedPath = useWorkflowStore((state) => state.selectedPath);
  // const setSelectedPath = useWorkflowStore((state) => state.setSelectedPath);
  const [newTool, setNewTool] = useState("");
  const { sendMessage, withPermission, setWithPermission } = useSocket();
  const pendingMessage = useRef<string | null>(null);
  const queryClient = useQueryClient();

  const finalPath = selectedPath
    ? `${selectedPath}/Tools/${newTool}/${newTool}.py`
    : "";

  const handleChangeNewTool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTool(e.target.value);
  };

  const getDisplayPath = () => {
    if (!selectedPath) {
      return "No workflow selected";
    }
    return selectedPath;
  };

  const sendFileMessage = useCallback(
    async (path: string) => {
      const message = {
        topic: "open_file",
        action: "publish",
        message: path,
      };
      sendMessage(JSON.stringify(message));
      // console.log("message sent  >>>", JSON.stringify(message));
    },
    [sendMessage]
  );

  // useEffect(() => {
  //   const initializeCodeServer = async () => {
  //     const codeServer = useCodeServerStore.getState();
  //     if (!codeServer.isOpen) {
  //       codeServer.openPanel?.();
  //       await window?.pywebview?.api.launchCodeServer();
  //     }
  //   };
  //   initializeCodeServer();
  // }, []);

  const initializeCodeServer = async () => {
    const codeServer = useCodeServerStore.getState();
    if (!codeServer.isOpen) {
      codeServer.openPanel?.();
      await window?.pywebview?.api.launchCodeServer();
    }
  };

  useEffect(() => {
    const unsub = useCodeServerStore.subscribe((state) => {
      if (!state.isOpen) {
        setWithPermission(false);
      }
    });

    return () => {
      unsub();
    };
  }, [setWithPermission]);

  useEffect(() => {
    if (withPermission === true && pendingMessage.current) {
      sendMessage(pendingMessage.current);
      // console.log("message sent  >>>", pendingMessage.current);
      pendingMessage.current = null;
    } else if (withPermission === false && pendingMessage.current) {
      // console.log("Permission denied, message canceled.");
      pendingMessage.current = null;
    }
  }, [withPermission]);

  const handleCreate = () => {
    if (!newTool || !selectedPath) return;
    try {
      initializeCodeServer();

      onCreate(newTool, selectedPath);

      queryClient.invalidateQueries({
        queryKey: ["workflowTools", selectedPath],
      });

      if (withPermission) {
        sendFileMessage(finalPath);
      } else {
        pendingMessage.current = JSON.stringify({
          topic: "open_file",
          action: "publish",
          message: finalPath,
        });
        sendMessage(
          JSON.stringify({
            topic: "open_file",
            action: "wait_for_permission",
          })
        );
      }
    } catch (error) {
      console.log("Error creating tool:", error);
    }
  };

  return (
    <VStack align="stretch">
      <Input
        type="text"
        fontSize="sm"
        value={getDisplayPath()}
        placeholder="New Tool Folder"
        // onChange={handleChangeNewTool}
        disabled
        color={selectedPath ? "dvForeground" : "red.400"}
      />
      <Input
        type="text"
        value={newTool}
        onChange={handleChangeNewTool}
        placeholder="New Tool Name"
      />
      <Button onClick={handleCreate} disabled={!newTool || !selectedPath}>
        Create
      </Button>
      <Button onClick={onCancel} variant="ghost">
        Cancel
      </Button>
    </VStack>
  );
};
