import {
  createWorkflow,
  deleteWorkflow,
  duplicateWorkflow,
  fetchWorkflows,
  renameWorkflow,
} from "@/api/workflow/workflowApi";
import { Button, VStack, Box, Text, Spinner, Input } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

/**
 * WorkflowManager component to manage workflows.
 * It allows users to create, open, rename, duplicate, export, and delete workflows.
 */
export const WorkflowManager = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedName = selected?.split("/").pop();
  const [workflowName, setWorkflowName] = useState("");

  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["getWorkflows"],
    queryFn: fetchWorkflows,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { mutate } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getWorkflows"] });
      setWorkflowName("");
    },
    // onError: (error: any) => {},
  });

  const deleteMutation = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getWorkflows"] });
      setSelected(null);
    },
    // onError: (e: any) => {}
  });

  const renameMutation = useMutation({
    mutationFn: renameWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getWorkflows"] });
    },
    // onError: (e: any) => {},
  });

  // Duplicate workflow mutation
  const duplicateMutation = useMutation({
    mutationFn: duplicateWorkflow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getWorkflows"] });
    },
    // onError: (error: Error) => {
    //   console.error("Error duplicating workflow:", error.message);
    // },
  });

  const handleDuplicate = () => {
    if (selected) {
      const targetName = `${selected}-copy`;
      duplicateMutation.mutate({ source: selected, target: targetName });
    }
  };

  const handleDownload = async (name: string) => {
    const link = document.createElement("a");
    link.href = `http://localhost:8000/api/workflows/export/${name}`;
    link.download = `${name}.zip`;
    link.click();
  };

  return (
    <VStack
      align="stretch"
      p={4}
      borderRadius="md"
      width="100%"
      height={"100%"}
      color="dvForeground"
      className="w-full"
      overflowY={"auto"}
    >
      <Input
        size="sm"
        placeholder="New workflow name"
        value={workflowName}
        onChange={(e) => setWorkflowName(e.target.value)}
        bg="dvBackground"
        color="dvForeground"
        borderColor="dvSeparatorBorder"
      />
      <Button
        onClick={() => mutate(workflowName)}
        variant="outline"
        size="sm"
        bg="dvBackground"
        color="dvForeground"
        disabled={!workflowName}
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
        minHeight="150px"
        overflowY="auto"
        fontSize="sm"
        bg="dvBackground"
        borderRadius="md"
      >
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
        onClick={() => {
          if (selected) {
            const newName = prompt("New name:", selected);
            if (newName && newName !== selected) {
              renameMutation.mutate({ oldName: selected, newName });
              setSelected(newName); // update selected name
            }
          }
        }}
        disabled={!selected}
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
        onClick={handleDuplicate}
        disabled={!selected}
      >
        Duplicate workflow
      </Button>
      <Button
        onClick={() => selectedName && handleDownload(selectedName)}
        disabled={!selected}
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
        onClick={() => {
          if (selected) deleteMutation.mutate(selected);
        }}
        disabled={!selected}
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
