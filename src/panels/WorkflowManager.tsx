import { duplicateWorkflow, fetchWorkflows } from "@/api/workflow/workflowApi";
import { Button, VStack, Box, Text, Spinner } from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDialogStore } from "@/store/useDialogStore";
import { exportAndSaveWorkflow } from "@/api/Javascript–Python-bridge/exportWorkflowAPI";
import { useWorkflowStore } from "@/store/useWorkflowStore";
// import { useReactFlow } from "@xyflow/react";

/**
 * WorkflowManager component to manage workflows.
 * It allows users to create, open, rename, duplicate, export, and delete workflows.
 */
export const WorkflowManager = () => {
  const queryClient = useQueryClient();
  const { isPending, error, data } = useQuery({
    queryKey: ["getWorkflows"],
    queryFn: fetchWorkflows,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // const [selected, setSelected] = useState<string | null>(null);
  // console.log("selected", selected);

  // console.log("targetParentPath", targetParentPath);
  const selectedPath = useWorkflowStore((state) => state.selectedPath);
  const setSelectedPath = useWorkflowStore((state) => state.setSelectedPath);
  const paths = useWorkflowStore((state) => state.paths);
  const setPaths = useWorkflowStore((state) => state.setPaths);

  const selectedName = selectedPath?.split("/").pop();
  // console.log("selectedName", selectedName);
  const targetParentPath = selectedPath?.split("/").slice(0, -1).join("/");

  // Quand data change, on met à jour la liste globale
  useEffect(() => {
    if (data) setPaths(data);
  }, [data, setPaths]);

  const { openDialog } = useDialogStore();

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
    if (selectedPath) {
      const targetName = `${selectedName}-copy`;
      duplicateMutation.mutate({
        source_path: selectedPath,
        target_parent_path: targetParentPath ?? "",
        target_name: targetName,
      });
    }
  };

  const handleOpenWorkflow = async () => {
    if (
      window.pywebview &&
      window.pywebview.api &&
      typeof window.pywebview.api.openWorkflowFromSelectedFolder === "function"
    ) {
      try {
        const result =
          await window.pywebview.api.openWorkflowFromSelectedFolder();

        if (result.success && result.graph_data && result.path) {
          // setCurrentWorkflowPath(result.path);
          setSelectedPath(result.path);
          if (!paths.includes(result.path)) {
            const updated = [...paths, result.path];
            setPaths(updated);

            queryClient.setQueryData(["getWorkflows"], updated);
            // setPaths([...paths, result.path]);
          }
        } else if (result.error) {
          alert(`Erreur lors de l'ouverture du workflow: ${result.error}`);
        }
      } catch (error) {
        alert(`Erreur JavaScript: ${error}`);
      }
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
        onClick={handleOpenWorkflow}
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
              bg={selectedPath === path ? "dvHoverBg" : "transparent"}
              _hover={{ bg: "dvHoverBg" }}
              // onClick={() => setSelected(path)}
              onClick={() => setSelectedPath(path)}
            >
              {path}
            </Text>
          ))
        )}
      </Box>
      <Button
        onClick={() => selectedPath && openDialog("rename", selectedPath)}
        disabled={!selectedPath || data?.length === 0}
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
        disabled={!selectedPath || data?.length === 0}
      >
        Duplicate workflow
      </Button>
      <Button
        onClick={() =>
          selectedPath &&
          selectedName &&
          exportAndSaveWorkflow(selectedPath, selectedName)
        }
        disabled={!selectedPath || data?.length === 0}
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
        onClick={() => selectedPath && openDialog("delete", selectedPath)}
        disabled={!selectedPath || data?.length === 0}
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
