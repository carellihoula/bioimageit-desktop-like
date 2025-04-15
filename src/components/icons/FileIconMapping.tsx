import { FileJson } from "lucide-react";
import { JSX } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { SiJavascript, SiTypescript, SiMarkdown } from "react-icons/si";
import { SiPython } from "react-icons/si";

export const fileIconMapping: { [ext: string]: JSX.Element } = {
  js: <SiJavascript />,
  ts: <SiTypescript />,
  json: <FileJson size={16} />,
  md: <SiMarkdown />,
  py: <SiPython />,
  default: <MdInsertDriveFile />,
};
