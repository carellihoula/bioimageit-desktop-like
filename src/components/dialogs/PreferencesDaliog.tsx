import React, { useState } from "react";
import { tabs } from "@/lib/const";
import { RenderThemeTab } from "../preferences/RenderThemeTab";
import { RenderInputTab } from "../preferences/RenderInputTab";
import { RenderGeneralTab } from "../preferences/RenderGeneralTab";
import { Button } from "@chakra-ui/react";

interface PreferencesProps {
  onClose?: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("General");
  const [searchQuery, setSearchQuery] = useState("");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Input":
        return <RenderInputTab />;
      case "Theme":
        return <RenderThemeTab />;
      case "General":
        return <RenderGeneralTab />;
      default:
        return <RenderGeneralTab />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-md">
      <div className="flex flex-col h-[600px]">
        {/* Sidebar */}
        <div className="w-48 flex items-center">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-100 ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700 border-b-2 border-blue-700 box-content"
                    : "text-gray-700 border-b-2 border-transparent hover:border-gray-100"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="search..."
            className="w-full px-3 py-2 mb-4 text-sm border border-gray-300 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Tab Content */}
          <div className="flex-1 overflow-auto">{renderTabContent()}</div>

          {/* Footer Buttons */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-end gap-3">
              <Button
                variant="subtle"
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Save as default
              </Button>
              <Button
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={onClose}
              >
                Save and close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
