import {
  ListCollection,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";

export const CustomSelectForProperties = ({
  items,
}: {
  items: ListCollection;
}) => {
  return (
    <Select.Root collection={items} size="xs" width="full">
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={items.firstValue ?? ""} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {items.items.map((framework, index) => (
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

export const items = createListCollection({
  items: ["carel", "luco", "esther"],
});
