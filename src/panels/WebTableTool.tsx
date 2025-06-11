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
  // const selectedNode =
  //   messages.length > 0 ? messages[messages.length - 1] : null;

  // const selectedNode = messages[messages.length - 1];

  // Update the selected node when new messages are received
  useEffect(() => {
    // Use the last node received
    setSelectedNode(messages[messages.length - 1]);

    // if (messages.length === 0) {
    //   setSelectedNode({
    //     node: "test-node",
    //     results: [
    //       { label: "A", value1: 1, value2: 2 },
    //       { label: "B", value1: 3, value2: 4 },
    //     ],
    //   });
    // }
  }, [messages]);

  // useEffect(() => {
  //   console.log("WebTableTool mounted. Messages:", messages);
  // }, []);

  // useEffect(() => {
  //   if (messages.length > 0) {
  //     const latest = messages[messages.length - 1];
  //     console.log("Setting selectedNode to:", latest);
  //     setSelectedNode(latest);
  //   }
  // }, [messages]);

  console.log("selectedNode:", selectedNode);

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

  console.log("Rendering WebTableTool with selectedNode:", selectedNode);

  return (
    <div style={{ position: "relative" }}>
      <DataTable selectedNode={selectedNode} />
    </div>
  );
};

export default WebTableTool;

// export const WebTableTool = () => {
//   return (
//     <div className="w-full h-full">
//       <iframe
//         id="code-server"
//         title="Code Server"
//         width="100%"
//         height="100%"
//         src="http://localhost:8000/react"
//       ></iframe>
//     </div>
//   );
// };
