import { SearchBar } from "@/components/common/SearchBar";
import { Accordion, For, Span, Stack, Text } from "@chakra-ui/react";

export function Properties() {
  return (
    <div className="w-full flex flex-col items-center p-4 ">
      <div className=" flex justify-center items-center w-full">
        <SearchBar />
      </div>
      <div className="flex justify-center w-[95%] ">
        <Stack gap="8" width={"full"}>
          <For each={["outline"]}>
            {(variant) => (
              <Stack gap="2" key={variant}>
                <Text fontWeight="semibold">{variant}</Text>
                <Accordion.Root
                  variant={variant}
                  collapsible
                  defaultValue={["b"]}
                  multiple
                >
                  {items.map((item, index) => (
                    <Accordion.Item key={index} value={item.value}>
                      <Accordion.ItemTrigger>
                        <Span flex="1">{item.title}</Span>
                        <Accordion.ItemIndicator />
                      </Accordion.ItemTrigger>
                      <Accordion.ItemContent>
                        <Accordion.ItemBody>{item.text}</Accordion.ItemBody>
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

const items = [
  { value: "a", title: "INPUT", text: "Some value 1..." },
  { value: "b", title: "OUTPUT", text: "Some value 2..." },
  { value: "c", title: "INFOS", text: "Some value 3..." },
];
