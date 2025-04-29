import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { ITreeItem, ToolInfo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { buildTreeFromTools } from "./buildTreeFromTools";
import { Spinner } from "@chakra-ui/react";

/**
 * FileTree component that displays a tree view of files and folders
 * with search functionality
 */
export default function FileTree({ search }: { search: string }) {
  const { isPending, error, data } = useQuery<ITreeItem[]>({
    queryKey: ["treeData"],
    queryFn: fetchTools,
  });

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

  const filteredItems = filterTree(data ?? [], search);

  return (
    <Box sx={{ minHeight: 352, minWidth: 250, color: "dv-fg" }}>
      <RichTreeView items={filteredItems} getItemId={(item) => item.id} />
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
