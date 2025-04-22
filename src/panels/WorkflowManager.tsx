import { Button, VStack, Box, Text } from "@chakra-ui/react";
import { useState } from "react";

const workflows = [
  "/home/carellihoula/Documents/demoworkflow/demoworkflow",
  "/home/carellihoula/Documents/testB",
  "/home/carellihoula/Documents/workflows/FISH2",
  "/home/carellihoula/Documents/workflows/testB",
  "/home/carellihoula/Documents/bioimageit/demobio",
  "/home/carellihoula/Documents/testA",
];

/**
 *
 * WorkflowManager component to manage workflows.
 * It allows users to create, open, rename, duplicate, export, and delete workflows.
 */
export const WorkflowManager = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <VStack
      align="stretch"
      p={4}
      borderRadius="md"
      width="100%"
      color="dvForeground"
      className="w-full"
    >
      <Button
        variant="outline"
        size="sm"
        bg="dvBackground"
        color="dvForeground"
        borderColor="dvSeparatorBorder"
        _hover={{
          bg: "dvHoverBg",
        }}
      >
        New workflow
      </Button>
      <Button
        variant="outline"
        size="sm"
        bg="dvBackground"
        color="dvForeground"
        borderColor="dvSeparatorBorder"
        _hover={{
          bg: "dvHoverBg",
        }}
      >
        Open workflow
      </Button>

      <Box
        borderWidth="1px"
        borderColor="gray.600"
        p={2}
        h="150px"
        overflowY="auto"
        fontSize="sm"
        bg="dvBackground"
        borderRadius="md"
      >
        {workflows.map((path) => (
          <Text
            key={path}
            color={"dv-fg"}
            px={2}
            py={1}
            borderRadius="sm"
            cursor="pointer"
            bg={selected === path ? "dvHoverBg" : "transparent"}
            _hover={{ bg: "dvHoverBg" }}
            onClick={() => setSelected(path)}
          >
            {path}
          </Text>
        ))}
      </Box>

      <Button
        variant="outline"
        size="sm"
        bg="dvBackground"
        color="dvForeground"
        borderColor="dvSeparatorBorder"
        _hover={{
          bg: "dvHoverBg",
        }}
      >
        Rename workflow
      </Button>
      <Button
        variant="outline"
        size="sm"
        bg="dvBackground"
        color="dvForeground"
        borderColor="dvSeparatorBorder"
        _hover={{
          bg: "dvHoverBg",
        }}
      >
        Duplicate workflow
      </Button>
      <Button
        variant="outline"
        size="sm"
        bg="dvBackground"
        color="dvForeground"
        borderColor="dvSeparatorBorder"
        _hover={{
          bg: "dvHoverBg",
        }}
      >
        Export workflow
      </Button>
      <Button
        variant="outline"
        size="sm"
        bg="dvBackground"
        color="dvForeground"
        borderColor="dvSeparatorBorder"
        _hover={{
          bg: "dvHoverBg",
        }}
      >
        Delete workflow
      </Button>
    </VStack>
  );
};
