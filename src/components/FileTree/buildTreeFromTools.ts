import { transformLabelFromPath } from "@/lib/transformLabelFromPath";
import { ToolInfo, ITreeItem, InternalNode } from "@/types";

/**
 * Builds a tree structure from an array of tools
 * @param tools - Array of ToolInfo objects
 * @returns Array of tree items
 */
export function buildTreeFromTools(tools: ToolInfo[]): ITreeItem[] {
  const root: Record<string, InternalNode> = {};

  for (const tool of tools) {
    const categories =
      (tool.categories ?? []).length > 0
        ? tool.categories ?? []
        : ["Uncategorized"];
    let current = root;

    for (const category of categories) {
      if (!current[category]) {
        current[category] = { __children: {} };
      }
      current =
        current[category].__children ?? (current[category].__children = {});
    }

    current[tool.name] = { __tool: tool };
  }

  function convertToTree(
    node: Record<string, InternalNode>,
    path = ""
  ): ITreeItem[] {
    return Object.entries(node)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, value]) => {
        const id = path ? `${path}/${key}` : key;

        if (value.__tool) {

          const label = transformLabelFromPath(value.__tool.module_path) ?? key;

          return {
            id,
            label,
            tool: value.__tool,
          };
        }

        return {
          id,
          label: key,
          children: convertToTree(value.__children ?? {}, id),
        };
      });
  }

  return convertToTree(root);
}
