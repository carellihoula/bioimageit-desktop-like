import { NodeProperty } from "@/types";
import { CustomSelectForProperties } from "../components/Properties/CustomSelectForProperties";
import {
  Button,
  Input,
  NumberInput,
  Flex,
  createListCollection,
} from "@chakra-ui/react";
import { useOpenFolder } from "@/hooks/workflow-ui/useOpenFolder";

interface RenderFieldProps {
  prop: NodeProperty;
  onChange: (value: any) => void;
  isSource: boolean;
  inputModes: Record<string, "Constant" | "Column">;
  setInputModes: React.Dispatch<
    React.SetStateAction<{ [key: string]: "Constant" | "Column" }>
  >;
}
/**
 * Renders a field based on the NodeProperty type.
 * Handles different input types like numbers, booleans, strings, and paths.
 */
export function RenderField({
  prop,
  onChange,
  isSource,
  inputModes,
  setInputModes,
}: RenderFieldProps) {
  const { handleOpenFolder } = useOpenFolder();
  const render = () => {
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
      case "Path": {
        const currentMode =
          inputModes[prop.name] ??
          (prop.autoColumn && !isSource ? "Column" : "Constant");

        if (prop.autoColumn && !isSource && currentMode === "Column") {
          // Column mode: fixed field with "path"
          return (
            <Input
              type="text"
              size="xs"
              value="path"
              // disabled
              style={{ textAlign: "center" }}
              readOnly
              borderColor="dvSeparatorBorder"
            />
          );
        }

        return (
          <Flex align="center" gap={2} w="full">
            <Input
              type="text"
              color={"dvForeground"}
              value={String(prop.value ?? prop.default ?? "")}
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
              onClick={async () => {
                const selectedPath = await handleOpenFolder("folder");
                if (selectedPath) {
                  onChange(selectedPath); //
                }
              }}
            >
              Select Folder
            </Button>
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
              onClick={async () => {
                const selectedPath = await handleOpenFolder("file");
                if (selectedPath) {
                  onChange(selectedPath); //
                }
              }}
            >
              Select File
            </Button>
          </Flex>
        );
      }
      default:
        return <span>Unsupported type: {prop.type}</span>;
    }
  };
  return render();
}
