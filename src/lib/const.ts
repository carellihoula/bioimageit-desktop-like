// src/lib/const.ts
import { ContextMenuItem, MainMenuItem } from "@/types";
import { Settings, PlusSquare, FolderOpen, Save, Share2 } from "lucide-react";

export const mainMenus: MainMenuItem[] = [
  {
    label: "File",
    items: [
      { label: "Preferences", icon: Settings, value: "preferences" },
      { label: "New workflow", icon: PlusSquare, value: "new-workflow" },
      { label: "Open workflow", icon: FolderOpen, value: "open-workflow" },
      { label: "Save workflow", icon: Save, value: "save-workflow" },
      { label: "Export workflow", icon: Share2, value: "export-workflow" },
    ],
  },
  {
    label: "Tools",
    items: [
      { label: "Properties", value: "properties" },
      { label: "Logger", value: "logger" },
      { label: "History", value: "history" },
      { label: "Data Frame", value: "data-frame" },
      { label: "Edit CodeView", value: "edit-codeview" },
      { label: "Workflow", value: "workflow" },
      { label: "Execution", value: "execution" },
    ],
  },
  {
    label: "Help",
    items: [
      { label: "About", value: "about" },
      { label: "Documentation", value: "documentation" },
    ],
  },
];

export const contextMenu: ContextMenuItem[] = [
  { label: "Delete Node", action: "delete" },
  { label: "Duplicate Node", action: "duplicate" },
  { label: "Cancel", action: "cancel" },
];
