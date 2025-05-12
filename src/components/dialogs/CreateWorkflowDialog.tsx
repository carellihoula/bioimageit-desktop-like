import { useState } from "react";
import { Input, Button, VStack, Flex } from "@chakra-ui/react";
import { useSocket } from "@/context/SocketContext";

export const CreateWorkflowDialog = ({
  onCancel,
  onCreate,
}: {
  onCreate: (newName: string) => void;
  onCancel: () => void;
}) => {
  const [name, setName] = useState("");
  const { sendMessage } = useSocket();

  const handleFileExplorer = () => {
    const message = {
      topic: "open_explorer",
      action: "publish",
      message: "open file explorer",
    };

    // console.log("Sending message:", message);

    sendMessage(JSON.stringify(message));
    console.log("Sending message:", message);
  };
  return (
    <VStack align="stretch">
      {/* <Input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Select a path to Save Workflow"
      /> */}
      <Flex align="center" gap={2} w="full">
        <Input
          type="text"
          color={"dvForeground"}
          borderColor="dvSeparatorBorder"
          placeholder="Path to file"
          flex="1"
          size="xs"
        />
        <Button
          borderColor="dvSeparatorBorder"
          onClick={handleFileExplorer}
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
          {/* TO DO : Send a message to the backend via WebSocket so that Qt opens the file explorer.*/}
        </Button>
      </Flex>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Workflow Name"
      />
      <Button onClick={() => onCreate(name)} disabled={!name}>
        Create
      </Button>
      <Button onClick={onCancel} variant="ghost">
        Cancel
      </Button>
    </VStack>
  );
};
