import * as React from "react";
import FileExplorer from "../components/FileExplorer/FileExplorer";

export function Tools() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "100%" }}>
        <FileExplorer />
      </div>
    </div>
  );
}
