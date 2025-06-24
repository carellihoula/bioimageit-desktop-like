import { useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";
import { useWorkflowStore } from "@/store/useWorkflowStore";

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

  const handleChangeNewTool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTool(e.target.value);
  };

  const getDisplayPath = () => {
    if (!selectedPath) {
      return "No workflow selected";
    }
    return selectedPath;
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
      <Button
        onClick={() => onCreate(newTool, selectedPath || "")}
        disabled={!newTool || !selectedPath}
      >
        Create
      </Button>
      <Button onClick={onCancel} variant="ghost">
        Cancel
      </Button>
    </VStack>
  );
};
