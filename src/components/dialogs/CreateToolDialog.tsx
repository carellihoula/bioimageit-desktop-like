import { useState } from "react";
import { Input, Button, VStack } from "@chakra-ui/react";

export const CreateToolDialog = ({
  onCancel,
  onCreate,
}: {
  onCreate: (filename: string, folder: string) => void;
  onCancel: () => void;
}) => {
  const [newTool, setNewTool] = useState({
    folder: "",
    filename: "",
  });

  const handleChangeNewTool = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTool((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <VStack align="stretch">
      <Input
        type="text"
        value={newTool.folder}
        name="folder"
        placeholder="New Tool Folder"
        onChange={handleChangeNewTool}
        color={"dvForeground"}
      />
      <Input
        type="text"
        value={newTool.filename}
        name="filename"
        onChange={handleChangeNewTool}
        placeholder="New Tool Name"
      />
      <Button
        onClick={() => onCreate(newTool.filename, newTool.folder)}
        disabled={!newTool.folder || !newTool.filename}
      >
        Create
      </Button>
      <Button onClick={onCancel} variant="ghost">
        Cancel
      </Button>
    </VStack>
  );
};
