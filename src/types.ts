////////////////////////////// WEBTABLETOOL types //////////////////////////////
/**
 * This file contains TypeScript interfaces for the data structure used in the application.
 */

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

export interface MainMenuItem {
  label: string;
  items: string[];
}
