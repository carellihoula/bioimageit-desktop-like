import { SearchBar2 } from "@/components/common/SearchBar";
import { Accordion, For, Span, Stack } from "@chakra-ui/react";
import { useState } from "react";

export function Properties() {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="w-full flex flex-col items-center p-4 ">
      <div className=" flex justify-center items-center w-full">
        <SearchBar2
          value={searchValue}
          aria-placeholder="search"
          onChange={handleChange}
          placeholder="search"
          size="xs"
        />
      </div>
      <div className="flex justify-center w-[95%] ">
        <Stack gap="8" width={"full"}>
          <For each={["outline"]}>
            {(variant) => (
              <Stack gap="2" key={variant}>
                <Accordion.Root
                  variant={variant}
                  collapsible
                  defaultValue={["b"]}
                  multiple
                >
                  {items2.map((item, index) => (
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

const items2 = [
  { value: "a", title: "INPUT", body: <div>salut</div> },
  { value: "b", title: "OUTPUT", body: <div>Mbote</div> },
  { value: "c", title: "INFOS", body: <div>djambo</div> },
];
