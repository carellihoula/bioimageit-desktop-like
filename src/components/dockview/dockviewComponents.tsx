import { CodeServer } from "@/panels/CodeServer";
import { ExecutionControls } from "@/panels/ExecutionControls";
import { LogsPanel } from "@/panels/LogsPanel";
import { Properties } from "@/panels/Properties";
import { Tools } from "@/panels/Tools";
import WebTableTool from "@/panels/WebTableTool";
import Workflow from "@/panels/Workflow";
import { WorkflowManager } from "@/panels/WorkflowManager";
import { IDockviewPanelProps } from "dockview";

export const components = {
  default: (props: IDockviewPanelProps) => {
    switch (props.api.id) {
      case "tools":
        return <Tools />;
      case "properties":
        //mockNode, mockNodeCellpose
        return <Properties />;
      case "workflow-ui":
        return <Workflow />;
      case "webtabletool":
        return <WebTableTool />;
      case "codeserver":
        return <CodeServer />;
      case "execution-controls":
        return <ExecutionControls />;
      case "workflow-manager":
        return <WorkflowManager />;
      case "logstool":
        return <LogsPanel />;
      default:
        return <div>Unknown Panel</div>;
    }
  },
};
