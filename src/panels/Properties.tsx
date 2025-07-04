import { Accordion, For, Span, Stack } from "@chakra-ui/react";
import { renderField } from "@/lib/renderField";
import { ToolInfo } from "@/types";
import { Input } from "@chakra-ui/react";
import { useReactFlow, useStore } from "@xyflow/react";

export function Properties() {
  const { setNodes, getNodes } = useReactFlow();
  const selectedNode = useStore((state) =>
    state.nodes.find((node) => node.selected)
  );

  const handleFieldChange = (
    fieldName: string,
    newValue: any,
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

  // const handleResetField = (fieldName: string, isOutput = false) => {
  //   const updatedNodes = getNodes().map((node) => {
  //     if (!node.selected) return node;

  //     const tool = node.data.tool as ToolInfo;

  //     const updatedTool: ToolInfo = {
  //       ...tool,
  //       [isOutput ? "outputs" : "inputs"]: tool[
  //         isOutput ? "outputs" : "inputs"
  //       ]?.map((field) =>
  //         field.name === fieldName ? { ...field, value: undefined } : field
  //       ),
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
    <div className="h-full w-full overflow-hidden">
      <div className="p-4 w-full space-y-4 h-full max-h-full overflow-y-auto dv-fg">
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
      </div>
    </div>
  );
}

const bodyReturn = (
  node: ToolInfo,
  handleFieldChange: Function
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
              <div className="mb-3">
                <div>
                  <label className="block">{input.name}</label>
                </div>
                <div key={index} className="mb-3 flex gap-2 items-center">
                  {renderField(
                    { ...input, default: currentValue }, // the current value
                    (value) => handleFieldChange(input.name, value, false)
                  )}
                </div>
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
                <div className="mb-1">
                  <label className="block">{output.name}</label>
                </div>
                <div className="flex gap-2 items-center">
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
