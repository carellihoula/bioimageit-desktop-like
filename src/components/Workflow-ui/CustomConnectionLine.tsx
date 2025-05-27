import { ConnectionLineComponentProps, getBezierPath } from "@xyflow/react";

export function CustomConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
  connectionStatus,
}: ConnectionLineComponentProps) {
  const [edgePath] = getBezierPath({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
  });

  const strokeColor =
    connectionStatus === "valid"
      ? "#b1b1b7"
      : connectionStatus === "invalid"
      ? "red"
      : "#999";

  return (
    <g>
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth={2}
        className="animated"
        d={edgePath}
      />
    </g>
  );
}
