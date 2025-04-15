// TreeNode.tsx
import React, { useState } from "react";

import { MdFolder, MdFolderOpen } from "react-icons/md";
import { FileNode } from "../../types";
import FileIcon from "../../utils/utils";

interface TreeNodeProps {
  node: FileNode;
  level?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level = 0 }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const isFolder = node.type === "folder";
  const hasChildren = isFolder && node.children && node.children.length > 0;

  const toggleExpand = () => {
    if (isFolder) {
      setExpanded(!expanded);
    }
  };

  return (
    <div style={{ marginLeft: level * 20, userSelect: "none" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "4px 8px",
          cursor: isFolder ? "pointer" : "default",
          color: "#ccc",
        }}
        onClick={toggleExpand}
      >
        {isFolder ? (
          expanded ? (
            <MdFolderOpen size={18} style={{ marginRight: 6 }} />
          ) : (
            <MdFolder size={18} style={{ marginRight: 6 }} />
          )
        ) : (
          //   <MdInsertDriveFile size={18} style={{ marginRight: 6 }} />
          <span style={{ marginRight: 6 }}>
            <FileIcon filename={node.name} />
          </span>
        )}
        <span className="hover:cursor-pointer">{node.name}</span>
      </div>
      {hasChildren && expanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
