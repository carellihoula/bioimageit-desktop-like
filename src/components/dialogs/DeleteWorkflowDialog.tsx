import { Text, Button, VStack } from "@chakra-ui/react";

export const DeleteWorkflowDialog = ({
  workflow,
  onDelete,
  onCancel,
}: {
  workflow: string;
  onDelete: () => void;
  onCancel: () => void;
}) => (
  <VStack align="stretch">
    <Text className="text-center mb-4">
      Are you sure you want to delete "{workflow}"?
    </Text>
    <Button colorScheme="red" onClick={onDelete}>
      Delete
    </Button>
    <Button onClick={onCancel} variant="ghost" width={"100%"}>
      Cancel
    </Button>
  </VStack>
);
