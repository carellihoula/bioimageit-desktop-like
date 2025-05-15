import { useState } from "react";
import { Input, Button, VStack, Flex } from "@chakra-ui/react";
import { selectFolderViaPywebview } from "@/api/Javascript–Python-bridge/SelectedFolderAPI";

export const CreateWorkflowDialog = ({
  onCancel,
  onCreate,
}: {
  onCreate: (workflowName: string, path: string) => void;
  onCancel: () => void;
}) => {
  const [name, setName] = useState("");
  const [selectedFolderPath, setSelectedFolderPath] = useState("");
  // console.log("selectedFolderPath", selectedFolderPath);

  const handleSelectFolderClick = async () => {
    const path = await selectFolderViaPywebview();
    if (path !== null) {
      setSelectedFolderPath(path);
    } else {
      setSelectedFolderPath("");
    }
  };

  return (
    <VStack align="stretch">
      <Flex align="center" gap={2} w="full">
        <Input
          type="text"
          color={"dvForeground"}
          borderColor="dvSeparatorBorder"
          placeholder="Path to file"
          flex="1"
          size="xs"
          defaultValue={selectedFolderPath}
          readOnly
        />
        <Button
          borderColor="dvSeparatorBorder"
          onClick={handleSelectFolderClick}
          as="label"
          size="xs"
          cursor="pointer"
          variant="outline"
          color={"dvForeground"}
          _hover={{
            bg: "dvHoverBg",
          }}
        >
          Browse...
        </Button>
      </Flex>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Workflow Name"
      />
      <Button
        onClick={() => onCreate(name, selectedFolderPath)}
        disabled={!name || !selectedFolderPath}
      >
        Create
      </Button>
      <Button onClick={onCancel} variant="ghost">
        Cancel
      </Button>
    </VStack>
  );
};
