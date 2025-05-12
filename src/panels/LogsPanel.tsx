// import React from "react";
// import { Button } from "@chakra-ui/react";

const fakeLogs = [
  {
    timestamp: "2025-04-23 15:42:01",
    level: "INFO",
    message: "Tool execution started.",
  },
  {
    timestamp: "2025-04-23 15:42:03",
    level: "INFO",
    message: "Loading dataset from /data/images",
  },
  {
    timestamp: "2025-04-23 15:42:05",
    level: "WARN",
    message: "Some images are missing metadata.",
  },
  {
    timestamp: "2025-04-23 15:42:11",
    level: "INFO",
    message: "Model Cellpose loaded successfully.",
  },
  {
    timestamp: "2025-04-23 15:42:12",
    level: "ERROR",
    message: "Execution failed: invalid input shape.",
  },
  {
    timestamp: "2025-04-23 15:42:15",
    level: "INFO",
    message: "Process terminated with exit code 1.",
  },
  {
    timestamp: "2025-04-23 15:42:20",
    level: "SUCCESS",
    message: "All operations finished gracefully.",
  },
];

const logLevelStyles: Record<string, string> = {
  INFO: "text-blue-400",
  WARN: "text-yellow-400",
  ERROR: "text-red-400",
  SUCCESS: "text-green-400",
};

export const LogsPanel = () => {
  return (
    <div className="p-4 h-full w-full dv-fg overflow-y-auto bg-[var(--dv-background-color)] text-sm font-mono space-y-2">
      {/* <h2 className="text-lg font-semibold mb-2">Logs</h2> */}
      {fakeLogs.map((log, idx) => (
        <div key={idx} className="flex gap-2 items-start">
          <span className="text-gray-500 min-w-[170px]">{log.timestamp}</span>
          <span
            className={`${logLevelStyles[log.level] ?? "text-white"} font-bold`}
          >
            [{log.level}]
          </span>
          <span className="flex-1">{log.message}</span>
        </div>
      ))}
      {/* <Button onClick={selectFolderFromBackend}>Choisir un dossier</Button>; */}
    </div>
  );
};

// async function selectFolderFromBackend() {
//   const res = await fetch("http://localhost:8000/select-folder");
//   const data = await res.json();

//   if (res.ok) {
//     console.log("Dossier sélectionné :", data.path);
//     // Tu peux afficher un message, ou envoyer une requête pour créer un projet
//   } else {
//     alert("Aucun dossier sélectionné");
//   }
// }
