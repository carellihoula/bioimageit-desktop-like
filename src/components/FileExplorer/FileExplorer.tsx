// FileExplorer.tsx
import React from "react";
import TreeNode from "./TreeNode";
import { fileTree } from "../../mock/fileTree";

const FileExplorer: React.FC = () => {
  return (
    <div
      style={{
        color: "#ccc",
        height: "100%",
        overflowY: "auto",
        padding: "8px",
        fontFamily: "sans-serif",
      }}
    >
      {fileTree.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default FileExplorer;
