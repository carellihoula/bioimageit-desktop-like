import { NodeProperty } from "@/types";
import { CustomSelectForProperties } from "../components/Properties/CustomSelectForProperties";
import {
  Button,
  Input,
  NumberInput,
  Flex,
  createListCollection,
} from "@chakra-ui/react";

/**
 * Renders a field based on the NodeProperty type.
 * Handles different input types like numbers, booleans, strings, and paths.
 */
export function renderField(prop: NodeProperty) {
  switch (prop.type) {
    case "int":
    case "float":
      return (
        <NumberInput.Root
          defaultValue={String(prop.default)}
          width="full"
          size={"xs"}
        >
          <NumberInput.Control borderColor="dvSeparatorBorder" />
          <NumberInput.Input borderColor="dvSeparatorBorder" />
        </NumberInput.Root>
      );
    case "bool":
      return (
        <input
          type="checkbox"
          defaultChecked={!!prop.default}
          className="ml-1"
        />
      );

    case "str":
      if (prop.choices) {
        const items = createListCollection({
          items: prop.choices,
        });
        return <CustomSelectForProperties data={items} />;
      }
      return (
        <Input
          type="text"
          borderColor="dvSeparatorBorder"
          size={"xs"}
          defaultValue={String(prop.default)}
          className="border p-1 w-full"
        />
      );
    case "Path":
      return (
        <Flex align="center" gap={2} w="full">
          <Input
            type="text"
            color={"dvForeground"}
            defaultValue={String(prop.default ?? "")}
            borderColor="dvSeparatorBorder"
            placeholder="Path to file"
            flex="1"
            size="xs"
          />
          <Button
            borderColor="dvSeparatorBorder"
            as="label"
            size="xs"
            cursor="pointer"
            variant="outline"
            color={"dvForeground"}
            _hover={{
              bg: "dvHoverBg",
            }}
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
