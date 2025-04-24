import { Accordion, For, Span, Stack } from "@chakra-ui/react";
import { renderField } from "@/lib/renderField";
import { NodeMeta, PropertiesProps } from "@/types";
import { Input } from "@chakra-ui/react";

export function Properties({ node }: PropertiesProps) {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="p-4 w-full space-y-4 h-full max-h-full overflow-y-auto dv-fg">
        <Stack gap="8" width={"full"}>
          <For each={["outline"]}>
            {(variant) => (
              <Stack gap="2" key={variant}>
                <Accordion.Root
                  variant={variant}
                  collapsible
                  defaultValue={["a"]}
                  multiple
                >
                  {node &&
                    bodyReturn(node).map((item, index) => (
                      <Accordion.Item key={index} value={item.value}>
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

const bodyReturn = (node: NodeMeta) => {
  return [
    {
      value: "a",
      title: "Inputs",
      body: (
        <div>
          {node.inputs.map((input) => (
            <div key={input.name} className="mb-3 flex gap-2 items-center">
              <label className="block">{input.name}</label>
              {renderField(input)}
            </div>
          ))}
        </div>
      ),
    },
    {
      value: "b",
      title: "Outputs",
      body: (
        <div>
          {node.outputs.map((output) => (
            <div key={output.name} className="mb-2 flex gap-2 items-center">
              <label className="block">{output.name}</label>
              <Input
                size={"xs"}
                defaultValue={String(output.default ?? output.help)}
                className=" w-full"
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      value: "c",
      title: "Infos",
      body: (
        <div className="info">
          <p className="text-sm text-gray-500">{node.description}</p>
        </div>
      ),
    },
  ];
};
