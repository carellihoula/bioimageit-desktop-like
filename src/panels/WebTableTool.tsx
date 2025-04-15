// import { useEffect, useState } from "react";
// import { DataTable } from "../components/WebTableTool/DataTable";
// import { MyTableProps, NodeData } from "../types";
// import { MaterialReactTable } from "material-react-table";

// // Component to display the table
// const WebTableTool: React.FC<MyTableProps> = ({ messages }) => {
//   const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

//   // Update the selected node when new messages are received
//   useEffect(() => {
//     if (messages && messages.length > 0) {
//       // Use the last node received
//       setSelectedNode(messages[messages.length - 1]);
//     }
//   }, [messages]);

//   if (!selectedNode) {
//     return (
//       <MaterialReactTable
//         columns={[]}
//         data={[]}
//         muiTableContainerProps={{
//           sx: {
//             flex: 1, // the table takes up the available space
//           },
//         }}
//         muiTablePaperProps={{
//           sx: {
//             height: "100%",
//             display: "flex",
//             flexDirection: "column",
//           },
//         }}
//         renderEmptyRowsFallback={() => (
//           <div style={{ padding: "1rem", textAlign: "center" }}>
//             No data from workflow
//           </div>
//         )}
//       />
//     );
//   }

//   return (
//     <div className="w-full h-full">
//       <DataTable selectedNode={selectedNode} />
//     </div>
//   );
// };

// export default WebTableTool;

// import React from 'react'

export const WebTableTool = () => {
  return (
    <div className="w-full h-full">
      <iframe
        id="code-server"
        title="Code Server"
        width="100%"
        height="100%"
        src="http://localhost:8000/react"
      ></iframe>
    </div>
  );
};
