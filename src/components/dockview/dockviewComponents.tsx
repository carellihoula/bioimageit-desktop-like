import { useSocket } from "@/context/SocketContext";
import { CodeServer } from "@/panels/CodeServer";
import { ExecutionControls } from "@/panels/ExecutionControls";
import { LogsPanel } from "@/panels/LogsPanel";
import { Properties } from "@/panels/Properties";
import { Tools } from "@/panels/Tools";
import WebTableTool from "@/panels/WebTableTool";
import Workflow from "@/panels/Workflow";
import { WorkflowManager } from "@/panels/WorkflowManager";
import { IDockviewPanelProps } from "dockview";

// export const useComponents = () => {
//   // const { messages } = useSocket();
//   // console.log("useComponents messages:", messages);

//   return {
//     default: (props: IDockviewPanelProps) => {
//       switch (props.api.id) {
//         case "tools":
//           return <Tools />;
//         case "properties":
//           //mockNode, mockNodeCellpose
//           return <Properties />;
//         case "workflow":
//           return <Workflow />;
//         case "webtabletool":
//           return <WebTableTool />;
//         case "codeserver":
//           return <CodeServer />;
//         case "execution-controls":
//           return <ExecutionControls />;
//         case "Workflow-manager":
//           return <WorkflowManager />;
//         case "logstool":
//           return <LogsPanel />;
//         default:
//           return <div>Panel inconnu</div>;
//       }
//     },
//     // tab: (props: IDockviewPanelProps) => <PanelTitleBar {...props} />,
//   };
// };

export const components = {
  default: (props: IDockviewPanelProps) => {
    switch (props.api.id) {
      case "tools":
        return <Tools />;
      case "properties":
        //mockNode, mockNodeCellpose
        return <Properties />;
      case "workflow":
        return <Workflow />;
      case "webtabletool":
        return <WebTableTool />;
      case "codeserver":
        return <CodeServer />;
      case "execution-controls":
        return <ExecutionControls />;
      case "Workflow-manager":
        return <WorkflowManager />;
      case "logstool":
        return <LogsPanel />;
      default:
        return <div>Panel inconnu</div>;
    }
  },
  // tab: (props: IDockviewPanelProps) => <PanelTitleBar {...props} />,
};
