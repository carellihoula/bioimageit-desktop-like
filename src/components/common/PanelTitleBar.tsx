import React, { useState } from "react";
import { Minus, Maximize, X } from "lucide-react";
import { IDockviewPanelProps } from "dockview";

const PanelTitleBar = ({ api }: IDockviewPanelProps) => {
  const [minimized, setMinimized] = useState(false);
  const isPanelMaximized = api.isMaximized();

  // Bascule entre maximiser / restaurer via l'API
  const handleToggleMaximize = () => {
    if (isPanelMaximized) {
      api.exitMaximized();
    } else {
      api.maximize();
    }
  };

  // Gère la minimisation localement
  const handleToggleMinimize = () => {
    setMinimized((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between w-full px-2 py-1 bg-neutral-800 text-white">
      <span className="text-sm font-medium">{api.title}</span>
      <div className="flex items-center gap-2">
        <button
          className="hover:text-yellow-300"
          onClick={handleToggleMinimize}
          title="Minimize"
        >
          <Minus size={14} />
        </button>
        <button
          className="hover:text-green-300"
          onClick={handleToggleMaximize}
          title={isPanelMaximized ? "Restore" : "Maximize"}
        >
          <Maximize size={14} />
        </button>
        <button
          className="hover:text-red-400"
          onClick={() => api.close()}
          title="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default PanelTitleBar;
