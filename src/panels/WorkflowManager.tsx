import { useExportFlow } from "@/hooks/workflow-ui/useExportFlow";
import { Button, VStack, Box, Text, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchWorkflows(): Promise<string[]> {
  const response = await fetch("http://localhost:8000/api/workflows");
  const data: string[] = await response.json();
  return data;
}

/**
 *
 * WorkflowManager component to manage workflows.
 * It allows users to create, open, rename, duplicate, export, and delete workflows.
 */
export const WorkflowManager = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const { isPending, error, data } = useQuery({
    queryKey: ["getWorkflows"],
    queryFn: fetchWorkflows,
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });
  const exportFlow = useExportFlow("workflow.json");

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
        {isPending && (
          <Text
            color="dv-fg"
            className="flex items-center justify-center h-full"
          >
            <Spinner size="lg" />
          </Text>
        )}
        {isPending ? (
          <Text
            color="dv-fg"
            className="flex items-center justify-center h-full"
          >
            <Spinner size="lg" />
          </Text>
        ) : error ? (
          <Text
            color="dv-fg"
            className="flex items-center justify-center h-full text-center"
          >
            An error has occurred: {error.message}
          </Text>
        ) : data && data.length === 0 ? (
          <Text color="dv-fg" textAlign="center" py={2}>
            No workflows found.
          </Text>
        ) : (
          data?.map((path) => (
            <Text
              key={path}
              color="dv-fg"
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
          ))
        )}
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
        onClick={exportFlow}
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
