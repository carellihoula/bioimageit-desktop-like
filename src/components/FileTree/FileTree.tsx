import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { ITreeItem, ToolInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { buildTreeFromTools } from "./buildTreeFromTools";
import { Spinner } from "@chakra-ui/react";

import { CustomTreeItem } from "./CustomTreeItem";
import React from "react";



/**
 * FileTree component that displays a tree view of files and folders
 * with search functionality
 */
export default function FileTree({ search }: { search: string }) {
  const { isPending, error, data } = useQuery<ITreeItem[]>({
    queryKey: ["treeData"],
    queryFn: fetchTools,
  });


  // --- Memoize the filtered items ---
  const filteredItems = React.useMemo(() => {
    return filterTree(data ?? [], search);
  }, [data, search]);

  // This map allows quick access to the full item data using its ID
  const itemsById = React.useMemo(() => {
    const map = new Map<string, ITreeItem>();
    // Flatten the *filtered* items because RichTreeView renders based on them
    const flatItems = flattenTreeItems(filteredItems);
    flatItems.forEach((item) => {
      // Use the same logic as getItemId to generate the key
      const id = item.tool?.module_path ?? item.id;
      if (id) {
        // Ensure id is valid before setting
        map.set(id, item);
      } else {
        console.warn(
          "Item found without a valid id or tool.module_path:",
          item
        );
      }
    });
    return map;
  }, [filteredItems]);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" />
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-full">
        An error has occurred: {error.message}
      </div>
    );


  return (
    <Box sx={{ minHeight: 352, minWidth: 250, color: "dv-fg" }}>
      <RichTreeView
        items={filteredItems}
        getItemId={(item) => item.tool?.module_path ?? item.id}
        slots={{
          item: (props) => {
            // Use props.itemId to lookup the full data item from our map
            const itemData = itemsById.get(props.itemId);

            return <CustomTreeItem {...props} tool={itemData?.tool} />;
          },
        }}
      />
    </Box>
  );
}

/**
 * Fetches tool data from the API and builds a tree structure
 * @returns Promise that resolves to an array of tree items
 */
async function fetchTools(): Promise<ITreeItem[]> {
  const response = await fetch("http://localhost:8000/api/tools");
  const data: ToolInfo[] = await response.json();
  return buildTreeFromTools(data);
}

/**
 * Recursively filters the tree items based on search string
 * @param items - Array of tree items to filter
 * @param search - Search string to filter by
 * @returns Filtered array of tree items
 */
function filterTree(items: ITreeItem[], search: string): ITreeItem[] {
  if (!search) return items;

  return items
    .map((item) => {
      if (item.label.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }

      if (item.children) {
        const filteredChildren = filterTree(item.children, search);
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
      }

      return null;
    })
    .filter((item): item is ITreeItem => item !== null);
}

// Helper function to flatten the tree for easy lookup
const flattenTreeItems = (items: ITreeItem[]): ITreeItem[] => {
  let flatList: ITreeItem[] = [];
  items.forEach((item) => {
    flatList.push(item);
    if (item.children) {
      flatList = flatList.concat(flattenTreeItems(item.children));
    }
  });
  return flatList;
};
