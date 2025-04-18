import { Handle, HandleType, Position } from "@xyflow/react";
import * as React from "react";

export interface IHandle {
  type: HandleType;
  position: Position;
  style?: React.CSSProperties;
}

export function CustomHandle(props: IHandle) {
  return (
    <Handle
      type={props.type}
      position={props.position}
      // style={{ top: "50%", background: "#3b82f6" }}
      style={{
        top: "50%",
        width: 16,
        height: 16,
        background: "#10b981",
        border: "2px solid white",
      }}
    />
  );
}
