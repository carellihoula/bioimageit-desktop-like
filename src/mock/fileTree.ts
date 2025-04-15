// fileTree.ts

import { FileNode } from "../types";

export const fileTree: FileNode[] = [
  {
    id: "folder1",
    name: "Folder 1",
    type: "folder",
    children: [
      { id: "file1", name: "File 1.py", type: "file" },
      { id: "file2", name: "File 2.json", type: "file" },
    ],
  },
  {
    id: "folder2",
    name: "Folder 2",
    type: "folder",
    children: [
      { id: "file3", name: "File 3.ts", type: "file" },
      {
        id: "folder3",
        name: "Subfolder",
        type: "folder",
        children: [{ id: "file4", name: "File 4.txt", type: "file" }],
      },
    ],
  },
  {
    id: "folder3",
    name: "Folder 3",
    type: "folder",
    children: [
      { id: "file3", name: "File 3.ts", type: "file" },
      {
        id: "folder3",
        name: "Subfolder",
        type: "folder",
        children: [{ id: "file4", name: "File 4.txt", type: "file" }],
      },
    ],
  },
  {
    id: "folder4",
    name: "Folder 4",
    type: "folder",
    children: [
      { id: "file3", name: "File 3.ts", type: "file" },
      {
        id: "folder3",
        name: "Subfolder",
        type: "folder",
        children: [{ id: "file4", name: "File 4.txt", type: "file" }],
      },
    ],
  },
  {
    id: "folder5",
    name: "Folder 5",
    type: "folder",
    children: [
      { id: "file3", name: "File 3.ts", type: "file" },
      {
        id: "folder3",
        name: "Subfolder",
        type: "folder",
        children: [{ id: "file4", name: "File 4.txt", type: "file" }],
      },
    ],
  },
];
