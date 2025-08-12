import { Check, Play, PlayCircle, Trash2 } from "lucide-react";
import { LargeIconButton } from "../components/custom-ui/LargeIconButton";
import { useReactFlow } from "@xyflow/react";
// import { useEffect, useState } from "react";

export function ExecutionControls() {
  const { toObject } = useReactFlow();
  const handleExecute = async () => {
    try {
      const flow = toObject();
      // Calling the Python API via pywebview
      const result = await window.pywebview?.api.run_workflow(
        JSON.stringify(flow)
      );
      // result is typically a JSON string, to be parsed if needed
      const parsedResult = result ? JSON.parse(result) : null;
      // Display or process the result
      console.log("Workflow result:", parsedResult);
      alert("Execution complete! See the console for results.");
    } catch (error) {
      console.error("Error during workflow execution:", error);
      alert("Error during workflow execution.");
    }
  };
  // const [progress, setProgress] = useState(0);

  // // Exposes the global function that Python can call via evaluate_js
  // useEffect(() => {
  //   window.updateProgress = (percent) => {
  //     setProgress(percent);
  //   };
  // }, []);

  return (
    <div className="flex flex-col items-center p-4 overflow-auto h-full">
      <LargeIconButton
        label="Run unexecuted nodes"
        icon={<Play size={16} />}
        // onClick={() => console.log("Clicked Create Tool")}
        onClick={handleExecute}
      />
      <LargeIconButton
        label="Run selected nodes"
        icon={<PlayCircle size={16} />}
        onClick={() => console.log("Clicked Run selected nodes")}
      />
      <LargeIconButton
        label="Clear selected nodes"
        icon={<Trash2 size={16} />}
        onClick={() => console.log("Clicked Create Tool")}
      />
      <LargeIconButton
        label="Set selected nodes executed"
        icon={<Check size={16} />}
        onClick={() => console.log("Clicked Create Tool")}
      />
      {/* <div
        style={{
          width: "100%",
          background: "#eee",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 20,
            width: `${progress}%`,
            background: "#4caf50",
            transition: "width 0.3s ease",
          }}
        />
        <p style={{ textAlign: "center" }}>{progress}%</p>
      </div> */}
    </div>
  );
}
