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
export function renderField(
  prop: NodeProperty,
  onChange: (value: any) => void
) {
  switch (prop.type) {
    case "int":
    case "float":
      return (
        <NumberInput.Root
          value={String(prop.default ?? "")}
          width="full"
          size={"xs"}
          onValueChange={(details) => onChange(Number(details.value))}
        >
          <NumberInput.Control borderColor="dvSeparatorBorder" />
          <NumberInput.Input borderColor="dvSeparatorBorder" />
        </NumberInput.Root>
      );
    case "bool":
      return (
        <input
          type="checkbox"
          checked={!!prop.default}
          className="ml-1"
          onChange={(e) => onChange(e.target.checked)}
        />
      );

    case "str":
      if (prop.choices) {
        const items = createListCollection({
          items: prop.choices,
        });
        return (
          <CustomSelectForProperties
            data={items}
            value={String(prop.default ?? "")}
            onChange={onChange}
          />
        );
      }
      return (
        <Input
          type="text"
          borderColor="dvSeparatorBorder"
          size={"xs"}
          value={String(prop.default ?? "")}
          className="border p-1 w-full"
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "Path":
      return (
        <Flex align="center" gap={2} w="full">
          <Input
            type="text"
            color={"dvForeground"}
            value={String(prop.default ?? "")}
            borderColor="dvSeparatorBorder"
            placeholder="Path to file"
            flex="1"
            size="xs"
            onChange={(e) => onChange(e.target.value)}
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
                  onChange(file.name);
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
