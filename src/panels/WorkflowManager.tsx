import { duplicateWorkflow, fetchWorkflows } from "@/api/workflow/workflowApi";
import { Button, VStack, Box, Text, Spinner } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDialogStore } from "@/store/useDialogStore";
import { exportAndSaveWorkflow } from "@/api/Javascript–Python-bridge/exportWorkflowAPI";
// import { useReactFlow } from "@xyflow/react";

/**
 * WorkflowManager component to manage workflows.
 * It allows users to create, open, rename, duplicate, export, and delete workflows.
 */
export const WorkflowManager = () => {
  const [selected, setSelected] = useState<string | null>(null);
  // console.log("selected", selected);
  const selectedName = selected?.split("/").pop();
  // console.log("selectedName", selectedName);
  const targetParentPath = selected?.split("/").slice(0, -1).join("/");
  // console.log("targetParentPath", targetParentPath);

  const { openDialog } = useDialogStore();
  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["getWorkflows"],
    queryFn: fetchWorkflows,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
      const targetName = `${selectedName}-copy`;
      duplicateMutation.mutate({
        source_path: selected,
        target_parent_path: targetParentPath ?? "",
        target_name: targetName,
      });
    }
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
      <Button
        // onClick={() => mutate(workflowName)}
        onClick={() => openDialog("create")}
        variant="outline"
        size="sm"
        bg="dvBackground"
        color="dvForeground"
        // disabled={!workflowName}
        borderColor="dvSeparatorBorder"
        _hover={{
          bg: "dvHoverBg",
        }}
      >
        New workflow
      </Button>
      <Button
        variant="outline"
        // onClick={handleOpenWorkflow}
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
        onClick={() => selected && openDialog("rename", selected)}
        disabled={!selected || data?.length === 0}
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
        disabled={!selected || data?.length === 0}
      >
        Duplicate workflow
      </Button>
      <Button
        onClick={() =>
          selected &&
          selectedName &&
          exportAndSaveWorkflow(selected, selectedName)
        }
        disabled={!selected || data?.length === 0}
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
        onClick={() => selected && openDialog("delete", selected)}
        disabled={!selected || data?.length === 0}
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
