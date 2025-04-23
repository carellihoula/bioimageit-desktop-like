import { NodeProperty } from "@/types";
import {
  CustomSelectForProperties,
  items,
} from "../components/Properties/CustomSelectForProperties";
import { Button, Input, NumberInput, Flex } from "@chakra-ui/react";

export function renderField(prop: NodeProperty) {
  switch (prop.type) {
    case "int":
    case "float":
      return (
        // <input
        //   type="number"
        //   defaultValue={prop.default}
        //   step={prop.decimals ? Math.pow(10, -prop.decimals) : undefined}
        //   className="border p-1 w-full"
        // />
        <NumberInput.Root
          defaultValue={prop.default}
          width="full"
          size={"xs"}
          colorPalette="gray"
        >
          <NumberInput.Control />
          <NumberInput.Input />
        </NumberInput.Root>
      );
    case "bool":
      return (
        <input type="checkbox" defaultChecked={prop.default} className="ml-1" />
      );

    case "str":
      if (prop.choices) {
        return (
          //   <select defaultValue={prop.default} className="border p-1 w-full">
          //     {prop.choices.map((choice) => (
          //       <option key={choice} value={choice}>
          //         {choice}
          //       </option>
          //     ))}
          //   </select>
          <CustomSelectForProperties items={items} />
        );
      }
      return (
        <Input
          type="text"
          size={"xs"}
          defaultValue={prop.default}
          className="border p-1 w-full"
        />
      );
    case "Path":
      return (
        <Flex align="center" gap={2} w="full">
          <Input
            type="text"
            defaultValue={prop.default}
            placeholder="Path to file"
            flex="1"
            size="xs"
          />
          <Button
            as="label"
            size="xs"
            cursor="pointer"
            variant="outline"
            colorScheme="gray"
          >
            Browse...
            <input
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  console.log("Selected file:", file);
                }
              }}
            />
          </Button>
        </Flex>
      );
    default:
      return <span>Unsupported type: {prop.type}</span>;
  }
}
