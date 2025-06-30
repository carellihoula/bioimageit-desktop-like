// import { useWorkflowStore } from "@/store/useWorkflowStore";
import { useWorkflowStore } from "@/store/useWorkflowStore";
import { Text, Button, VStack } from "@chakra-ui/react";

export const DeleteWorkflowDialog = ({
  workflow,
  onDelete,
  onCancel,
}: {
  workflow: string;
  onDelete: () => void;
  onCancel: () => void;
}) => {
  const setSelectedPath = useWorkflowStore((state) => state.setSelectedPath);
  return (
    <VStack align="stretch">
      <Text className="text-center mb-4">
        Are you sure you want to delete "{workflow}"?
      </Text>
      <Button
        colorScheme="red"
        onClick={() => {
          onDelete();
          setSelectedPath(null);
        }}
      >
        Delete
      </Button>
      <Button onClick={onCancel} variant="ghost" width={"100%"}>
        Cancel
      </Button>
    </VStack>
  );
};
