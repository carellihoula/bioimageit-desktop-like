/**
 * This file contains TypeScript interfaces for the data structure used in the application.
 */

import { LucideIcon } from "lucide-react";

// Type for each result, which can contain numbers, strings, or null values
interface ImageResult {
  [key: string]: number | string | null;
}

// Represents data structure for a node containing results
export interface NodeData {
  node: string;
  results: ImageResult[];
}

// Props interface for thumbnail cell component in the table
export interface ThumbnailCellProps {
  src: string;
  alt: string;
  row?: { [key: string]: number | string | null };
}

// Props interface for the data table component
export interface DataTableProps {
  selectedNode: NodeData;
}

// Configuration interface for menu items
export interface MenuItemConfig {
  label: string;
  icon?: LucideIcon;
  value: string;
}

// Interface for main menu items containing sub-items
export interface MainMenuItem {
  label: string;
  items: MenuItemConfig[];
}

// Interface for context menu items with specific actions
export interface ContextMenuItem {
  label: string;
  action: "delete" | "duplicate" | "cancel" | "edit";
}

// Interface for search component props
export interface ISearch {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

// Type definition for node property configuration
export type NodeProperty = {
  name: string;
  shortname?: string;
  help?: string;
  required?: boolean;
  default?: boolean | number | string;
  type: string;
  choices?: string[];
  decimals?: number;
};

// Type definition for node metadata
export type NodeMeta = {
  name: string;
  description: string;
  inputs: NodeProperty[];
  outputs: NodeProperty[];
};

// Props interface for properties component
export type PropertiesProps = {
  node?: NodeMeta;
};

// Type definition for tree item structure
export type ITreeItem = {
  id: string;
  label: string;
  children?: ITreeItem[];
};
