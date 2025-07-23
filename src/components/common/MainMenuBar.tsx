import { Button, Menu, Portal } from "@chakra-ui/react";
import { dockviewThemes, DockviewThemeSelector } from "./DockviewThemeSelector";
import { mainMenus } from "@/lib/const";
import { showDockviewPanel } from "@/lib/showDockviewPanel";
import { useCodeServerStore } from "@/store/useCodeServerStore";
import { useDialogStore } from "@/store/useDialogStore";
import { exportAndSaveWorkflow } from "@/api/Javascript–Python-bridge/exportWorkflowAPI";
import { toaster } from "../ui/toaster";
import { useOpenWorkflow } from "@/hooks/workflow-ui/useOpenWorkflow";

type ThemeOption = (typeof dockviewThemes)[number];

/**
 * MainMenuBar component to display a menu bar with main menus.
 * Each menu can have multiple items.
 * the user must click on the menu to view the items.
 */
export const MainMenuBar = ({
  setTheme,
  theme,
}: {
  setTheme: (theme: ThemeOption["theme"]) => void;
  theme?: ThemeOption["theme"];
}) => {
  const codeServerStore = useCodeServerStore.getState();
  const { openDialog } = useDialogStore();
  const { handleOpenWorkflow, selectedPath, selectedName } = useOpenWorkflow();

  const showToaster = () => {
    toaster.create({
      description: "File saved successfully",
      type: "info",
      duration: 3000,
    });
  };

  const handleMenuAction = (itemValue: string) => {
    const actions: Record<string, () => void> = {
      preferences: () => openDialog("preferences"),
      "new-workflow": () => openDialog("create"),
      "open-workflow": () => handleOpenWorkflow(),
      "export-workflow": () => {
        if (selectedPath && selectedName) {
          exportAndSaveWorkflow(selectedPath, selectedName);
        }
      },
      "save-workflow": () => showToaster(),
    };

    const action = actions[itemValue];
    if (action) action();
  };

  return (
    <div
      className={`flex justify-between items-center overflow-hidden dv-group-bg `}
    >
      <div>
        {mainMenus.map((menu) => (
          <Menu.Root key={menu.label}>
            <Menu.Trigger asChild>
              <Button variant={"plain"} size="sm" color={"dvForeground"}>
                {menu.label}
              </Button>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content bg={"dvGroupBg"} boxShadow={"dvFloating"}>
                  {menu.items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Menu.Item
                        key={item.value}
                        value={item.value.toLowerCase().replace(/\s+/g, "-")}
                        // className="flex items-center px-3 py-1 gap-2"
                        color={"dvForeground"}
                        cursor={"pointer"}
                        onClick={() => handleMenuAction(item.value)}
                        onSelect={() => {
                          if (item.value === "codeserver") {
                            if (!codeServerStore.isOpen) {
                              codeServerStore.openPanel();
                              window?.pywebview?.api.launchCodeServer();
                            }
                          } else {
                            showDockviewPanel(item.value);
                          }
                        }}
                      >
                        {IconComponent && <IconComponent size={16} />}
                        {item.label}
                      </Menu.Item>
                    );
                  })}
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        ))}
      </div>
      <DockviewThemeSelector onChange={setTheme} initialTheme={theme} />
    </div>
  );
};
