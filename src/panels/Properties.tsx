import { Accordion, For, Span, Stack } from "@chakra-ui/react";
import { renderField } from "@/lib/renderField";
import { ToolInfo } from "@/types";
import { Input } from "@chakra-ui/react";
import { useReactFlow, useStore } from "@xyflow/react";

/*
 * @param node - The node metadata containing inputs, outputs and description
 * @returns Array of accordion section objects
 */

export function Properties() {
  const { setNodes, getNodes } = useReactFlow();
  const selectedNode = useStore((state) =>
    state.nodes.find((node) => node.selected)
  );

  const handleFieldChange = (
    fieldName: string,
    newValue: boolean | number | string,
    isOutput = false
  ) => {
    const updatedNodes = getNodes().map((node) => {
      if (!node.selected) return node;

      const tool = node.data.tool as ToolInfo;

      const updatedTool: ToolInfo = {
        ...tool,
        [isOutput ? "outputs" : "inputs"]: tool[
          isOutput ? "outputs" : "inputs"
        ]?.map((field) =>
          field.name === fieldName ? { ...field, value: newValue } : field
        ),
      };

      return {
        ...node,
        data: {
          ...node.data,
          tool: updatedTool,
        },
      };
    });

    setNodes(updatedNodes);
  };

  // const handleResetAllFields = () => {
  //   const updatedNodes = getNodes().map((node) => {
  //     if (!node.selected) return node;

  //     const tool = node.data.tool as ToolInfo;

  //     const updatedTool: ToolInfo = {
  //       ...tool,
  //       inputs: tool.inputs?.map((field) => ({ ...field, value: undefined })),
  //       outputs: tool.outputs?.map((field) => ({ ...field, value: undefined })),
  //     };

  //     return {
  //       ...node,
  //       data: {
  //         ...node.data,
  //         tool: updatedTool,
  //       },
  //     };
  //   });

  //   setNodes(updatedNodes);
  // };

  if (!selectedNode)
    return (
      <div className="p-4 text-gray-500 flex items-center justify-center h-full">
        No nodes selected
      </div>
    );

  return (
    <div className="flex flex-col h-full w-full">
      <div className=" flex-1 overflow-y-auto p-4 space-y-4 dv-fg">
        <Stack gap="8" width={"full"} className="">
          <For each={["outline"]}>
            {(variant) => (
              <Stack gap="2" key={variant}>
                <Accordion.Root
                  variant={variant}
                  collapsible
                  defaultValue={["a"]}
                  multiple
                >
                  {(selectedNode.data.tool as ToolInfo) &&
                    bodyReturn(
                      selectedNode.data.tool as ToolInfo,
                      handleFieldChange
                      // handleResetField
                    ).map((item, index) => (
                      <Accordion.Item
                        key={index}
                        value={item.value}
                        borderColor="dvSeparatorBorder"
                      >
                        <Accordion.ItemTrigger>
                          <Span flex="1">{item.title}</Span>
                          <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                          <Accordion.ItemBody>{item.body}</Accordion.ItemBody>
                        </Accordion.ItemContent>
                      </Accordion.Item>
                    ))}
                </Accordion.Root>
              </Stack>
            )}
          </For>
        </Stack>
        {/* <Button
          size="sm"
          // colorScheme="red"
          color={"dvForeground"}
          variant="outline"
          onClick={handleResetAllFields}
        >
          Reset All
        </Button> */}
      </div>
    </div>
  );
}

/**
 * Returns an array of objects containing the input, output, and info sections for a node
 * Each object has a value (for accordion item identification), title, and body content
 * The body content includes input fields, output fields, and node description
 * @param node - The node metadata containing inputs, outputs and description
 * @returns Array of accordion section objects
 */
const bodyReturn = (
  node: ToolInfo,
  handleFieldChange: (
    fieldName: string,
    newValue: boolean | number | string,
    isOutput: boolean
  ) => void
  // handleResetField: Function
) => {
  return [
    {
      value: "a",
      title: "Inputs",
      body: (
        <div>
          {node.inputs?.map((input, index) => {
            // I use 'value' if defined, otherwise use 'default'
            const currentValue =
              input.value !== undefined ? input.value : input.default;
            // const isModified = input.value !== undefined;
            return (
              <div key={index} className="mb-3 flex gap-2 items-center">
                <label className="text-sm">{input.name}</label>
                {renderField(
                  { ...input, default: currentValue }, // the current value
                  (value) => handleFieldChange(input.name, value, false)
                )}
              </div>
            );
          })}
        </div>
      ),
    },
    {
      value: "b",
      title: "Outputs",
      body: (
        <div>
          {node.outputs?.map((output, index) => {
            const currentValue =
              output.value !== undefined ? output.value : output.default;
            // const isModified = output.value !== undefined;

            return (
              <div key={index} className="mb-3">
                <div className="flex gap-2 items-center">
                  <label className="text-sm">{output.name}</label>
                  <Input
                    size={"xs"}
                    borderColor="dvSeparatorBorder"
                    value={String(currentValue ?? output.help ?? "")}
                    className="w-full"
                    onChange={(e) =>
                      handleFieldChange(output.name, e.target.value, true)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      value: "c",
      title: "Info",
      body: (
        <div className="info">
          <p className="text-sm dv-fg">{node.description}</p>
        </div>
      ),
    },
  ];
};
