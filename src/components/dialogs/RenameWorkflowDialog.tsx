import { useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";
import { useWorkflowStore } from "@/store/useWorkflowStore";

export const RenameWorkflowDialog = ({
  workflow,
  onRename,
  onCancel,
}: {
  workflow: string;
  onRename: (newName: string) => void;
  onCancel: () => void;
}) => {
  const setSelectedPath = useWorkflowStore((state) => state.setSelectedPath);
  const [newName, setNewName] = useState(workflow);

  return (
    <VStack align="stretch">
      <Input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New name"
      />
      <Button
        onClick={() => {
          onRename(newName);
          setSelectedPath(newName);
        }}
        disabled={!newName}
      >
        Rename
      </Button>
      <Button onClick={onCancel} variant="ghost">
        Cancel
      </Button>
    </VStack>
  );
};
