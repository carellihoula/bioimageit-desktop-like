import React, { useState } from "react";
import {
  ChevronDown,
  Mouse,
  Palette,
  Settings,
  ChevronRight,
} from "lucide-react";
import {
  dockviewThemes,
  DockviewThemeSelector,
} from "../common/DockviewThemeSelector";

interface PreferencesProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Input");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "navigation",
    "refactoring",
    "editing",
    "background",
    "common",
    "error-reports",
    "omero",
  ]);

  // General preferences state
  const [generalSettings, setGeneralSettings] = useState({
    externalCodeEditor: "",
    napariEnvironment: "",
    alwaysInstallDependencies: false,
    historyDepth: 10,
    bioImageJTVersion: "latest (auto update)",
    emailAddress: "",
    mailApiKey: "",
    mailApiSecret: "",
    omeroHost: "demo.openmicroscopy.org",
    omeroPort: 4064,
    omeroUsername: "",
    omeroPassword: "",
  });

  const tabs = [
    { id: "General", label: "General", icon: Settings },
    { id: "Input", label: "Input", icon: Mouse },
    { id: "Theme", label: "Theme", icon: Palette },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const AccordionSection: React.FC<{
    id: string;
    title: string;
    children: React.ReactNode;
  }> = ({ id, title, children }) => {
    const isExpanded = expandedSections.includes(id);

    return (
      <div className="border border-gray-200 rounded mb-2">
        <button
          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-t"
          onClick={() => toggleSection(id)}
        >
          <span className="font-semibold text-left">{title}</span>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        {isExpanded && <div className="p-4 bg-white">{children}</div>}
      </div>
    );
  };

  const renderInputTab = () => <div className="space-y-4">In Process</div>;

  const renderThemeTab = () => {
    // const [theme, setTheme] = useState(dockviewThemes[0].theme);
    return (
      <div className="space-y-4">
        <select className="w-full px-3 py-2 border border-gray-300 rounded">
          <option value="DarkGreen">DarkGreen</option>
          <option value="DarkBlue">DarkBlue</option>
          <option value="Light">Light</option>
        </select>
        {/* <DockviewThemeSelector onChange={setTheme} initialTheme={theme} /> */}
      </div>
    );
  };

  const renderGeneralTab = () => (
    <div className="space-y-4">
      <AccordionSection id="common" title="Common">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              External code editor:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.externalCodeEditor}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  externalCodeEditor: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Napari environment:
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.napariEnvironment}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  napariEnvironment: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="napari-deps"
              checked={generalSettings.alwaysInstallDependencies}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  alwaysInstallDependencies: e.target.checked,
                })
              }
              className="rounded"
            />
            <label htmlFor="napari-deps" className="text-sm">
              Always install Napari dependencies
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              History depth:
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.historyDepth}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  historyDepth: parseInt(e.target.value) || 10,
                })
              }
              min="1"
              max="100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              BioImageIT version:
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.bioImageJTVersion}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  bioImageJTVersion: e.target.value,
                })
              }
            >
              <option value="latest (auto update)">latest (auto update)</option>
              <option value="1.0.0">1.0.0</option>
              <option value="0.9.0">0.9.0</option>
            </select>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection id="error-reports" title="Error reports">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email address:
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.emailAddress}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  emailAddress: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Mail API Key:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.mailApiKey}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  mailApiKey: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Mail API Secret:
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.mailApiSecret}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  mailApiSecret: e.target.value,
                })
              }
            />
          </div>
        </div>
      </AccordionSection>

      <AccordionSection id="omero" title="Omero">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Host:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.omeroHost}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  omeroHost: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Port:</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.omeroPort}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  omeroPort: parseInt(e.target.value) || 4064,
                })
              }
              min="1"
              max="65535"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.omeroUsername}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  omeroUsername: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={generalSettings.omeroPassword}
              onChange={(e) =>
                setGeneralSettings({
                  ...generalSettings,
                  omeroPassword: e.target.value,
                })
              }
            />
          </div>
        </div>
      </AccordionSection>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "Input":
        return renderInputTab();
      case "Theme":
        return renderThemeTab();
      case "General":
        return renderGeneralTab();
      default:
        return renderGeneralTab();
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
                    ? "bg-blue-100 text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-700"
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
              <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Save as default
              </button>
              <button
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={onClose}
              >
                Save and close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
