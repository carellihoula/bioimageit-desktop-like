import { Check, Play, PlayCircle, Trash2 } from "lucide-react";
import { LargeIconButton } from "../components/custom-ui/LargeIconButton";

export function ExecutionControls() {
  return (
    <div className="flex flex-col items-center p-4">
      <LargeIconButton
        label="Run unexecuted nodes"
        icon={<Play size={16} />}
        onClick={() => console.log("Clicked Create Tool")}
      />
      <LargeIconButton
        label="Run selected nodes"
        icon={<PlayCircle size={16} />}
        onClick={() => console.log("Clicked Create Tool")}
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
    </div>
  );
}
