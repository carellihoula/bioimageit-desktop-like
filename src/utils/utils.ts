import React from "react";
import { fileIconMapping } from "../components/icons/FileIconMapping";

interface FileIconProps {
  filename: string;
}

const FileIcon: React.FC<FileIconProps> = ({ filename }) => {
  // On extrait l'extension en prenant le texte après le dernier point.
  const extMatch = filename.match(/\.([^.]+)$/);
  const ext = extMatch ? extMatch[1].toLowerCase() : "";
  // Choix de l'icône : si l'extension n'est pas présente dans le mapping, on renvoie l'icône par défaut.
  return fileIconMapping[ext] ? fileIconMapping[ext] : fileIconMapping.default;
};

export default FileIcon;
