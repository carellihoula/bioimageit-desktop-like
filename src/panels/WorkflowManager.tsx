import { Button, VStack, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

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
      color="gray.200"
      className="w-full"
    >
      <Button variant="outline" size="sm">
        New workflow
      </Button>
      <Button variant="outline" size="sm">
        Open workflow
      </Button>

      <Box
        borderWidth="1px"
        borderColor="gray.600"
        p={2}
        h="150px"
        overflowY="auto"
        fontSize="sm"
        bg="gray.900"
        borderRadius="md"
      >
        {workflows.map((path) => (
          <Text
            key={path}
            px={2}
            py={1}
            borderRadius="sm"
            cursor="pointer"
            bg={selected === path ? "#05213d" : "transparent"}
            _hover={{ bg: "gray.700" }}
            onClick={() => setSelected(path)}
          >
            {path}
          </Text>
        ))}
      </Box>

      <Button variant="outline" size="sm">
        Rename workflow
      </Button>
      <Button variant="outline" size="sm">
        Duplicate workflow
      </Button>
      <Button variant="outline" size="sm">
        Export workflow
      </Button>
      <Button variant="outline" size="sm" colorScheme="red">
        Delete workflow
      </Button>
    </VStack>
  );
};
