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
      { label: "Logger", value: "logstool" },
      { label: "History", value: "history" },
      { label: "Data Frame", value: "webtabletool" },
      { label: "Edit CodeView", value: "codeserver" },
      { label: "Workflow", value: "workflow-manager" },
      { label: "Workflow UI", value: "workflow-ui" },
      { label: "Execution", value: "execution-controls" },
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
  { label: "Edit Node", action: "edit" },
  { label: "Duplicate Node", action: "duplicate" },
  { label: "Delete Node", action: "delete" },
];

export const DialogTypes = [
  {
    type: "rename",
    title: "Rename Workflow",
  },
  {
    type: "delete",
    title: "Delete Workflow",
  },
  {
    type: "create",
    title: "Create Workflow",
  },
  {
    type: "create-tool",
    title: "Create Tool",
  },
];
