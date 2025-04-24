import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { MUI_X_PRODUCTS } from "../../mock/fileTree";
import { ITreeItem } from "@/types";

/**
 * FileTree component that displays a tree view of files and folders
 * with search functionality
 */
export default function FileTree({ search }: { search: string }) {
  const filteredItems = filterTree(MUI_X_PRODUCTS, search);
  return (
    <Box sx={{ minHeight: 352, minWidth: 250, color: "dv-fg" }}>
      <RichTreeView items={filteredItems} />
    </Box>
  );
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
