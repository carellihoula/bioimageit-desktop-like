////////////////////////////// WEBTABLETOOL types //////////////////////////////
/**
 * This file contains TypeScript interfaces for the data structure used in the application.
 */

import { LucideIcon } from "lucide-react";

// Type for each result, which can contain numbers, strings, or null values
interface ImageResult {
  [key: string]: number | string | null;
}

export interface NodeData {
  node: string;
  results: ImageResult[];
}

export interface MyTableProps {
  messages: NodeData[];
}

export interface ThumbnailCellProps {
  src: string;
  alt: string;
  row?: { [key: string]: number | string | null };
}

export interface DataTableProps {
  selectedNode: NodeData;
}

export interface FileNode {
  id: string;
  name: string;
  type: "folder" | "file";
  children?: FileNode[];
}

export interface MenuItemConfig {
  label: string;
  icon?: LucideIcon;
  value: string;
}

export interface MainMenuItem {
  label: string;
  items: MenuItemConfig[];
}

export interface ContextMenuItem {
  label: string;
  action: "delete" | "duplicate" | "cancel" | "edit";
}

export interface ISearch {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

export type NodeProperty = {
  name: string;
  shortname?: string;
  help?: string;
  required?: boolean;
  default?: any;
  type: string;
  choices?: string[];
  decimals?: number;
};

export type NodeMeta = {
  name: string;
  description: string;
  inputs: NodeProperty[];
  outputs: NodeProperty[];
};

export type PropertiesProps = {
  node?: NodeMeta;
};
