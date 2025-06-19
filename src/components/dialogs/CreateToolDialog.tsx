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
  const [newTool, setNewTool] = useState("");

  const handleChangeNewTool = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTool(e.target.value);
  };

  return (
    <VStack align="stretch">
      <Input
        type="text"
        readOnly
        defaultValue={selectedPath ?? "no path exists"}
        placeholder="New Tool Folder"
        onChange={handleChangeNewTool}
        disabled
        color={"dvForeground"}
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
