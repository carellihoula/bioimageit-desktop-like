import { Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "comment",
    position: { x: 200, y: 100 },
    data: { comment: "This is a comment" },
  },
  {
    id: "2",
    type: "sticky",
    position: { x: 400, y: 100 },
    data: { text: "Text Goes Here" },
  },
  {
    id: "3",
    type: "io",
    position: { x: 300, y: 300 },
    data: { label: "Stracking detection" },
  },
  {
    id: "4",
    type: "io",
    position: { x: 400, y: 500 },
    data: { label: "Extract Label" },
  },
];
