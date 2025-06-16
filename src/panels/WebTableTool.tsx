import { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { DataTable } from "@/components/WebTableTool/DataTable";
import { NodeData } from "@/types";
import { useSocket } from "@/context/SocketContext";

export interface MyTableProps {
  messages: NodeData[];
}

// Component to display the table
const WebTableTool = () => {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const { messages } = useSocket();
  useEffect(() => {
    // Use the last node received
    setSelectedNode(messages[messages.length - 1]);
  }, [messages]);

  // console.log("selectedNode:", selectedNode);

  if (!selectedNode) {
    return (
      <MaterialReactTable
        columns={[]}
        data={[]}
        enablePagination={false}
        enableRowVirtualization
        renderEmptyRowsFallback={() => (
          <div style={{ padding: "1rem", textAlign: "center" }}>
            No data from workflow
          </div>
        )}
      />
    );
  }

  // console.log("Rendering WebTableTool with selectedNode:", selectedNode);

  return (
    <div className="w-full h-full overflow-auto">
      <DataTable selectedNode={selectedNode} />
    </div>
  );
};

export default WebTableTool;
