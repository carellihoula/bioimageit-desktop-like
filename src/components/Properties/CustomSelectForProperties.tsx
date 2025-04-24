import { ListCollection, Portal, Select } from "@chakra-ui/react";

/**
 * A custom select component for properties that displays a dropdown list of items.
 * Uses Chakra UI's Select component with a portal for better positioning and z-index handling.
 */

export const CustomSelectForProperties = ({
  data,
}: {
  data: ListCollection;
}) => {
  return (
    <Select.Root collection={data} size="xs" width="full">
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger borderColor="dvSeparatorBorder">
          <Select.ValueText placeholder={data.firstValue ?? ""} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {data.items.map((framework, index) => (
              <Select.Item item={framework} key={index}>
                {framework}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
