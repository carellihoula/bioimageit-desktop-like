import { useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";

export const RenameWorkflowDialog = ({
  workflow,
  onRename,
  onCancel,
}: {
  workflow: string;
  onRename: (newName: string) => void;
  onCancel: () => void;
}) => {
  const [newName, setNewName] = useState(workflow);

  return (
    <VStack align="stretch">
      <Input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New name"
      />
      <Button onClick={() => onRename(newName)} disabled={!newName}>
        Rename
      </Button>
      <Button onClick={onCancel} variant="ghost">
        Cancel
      </Button>
    </VStack>
  );
};
