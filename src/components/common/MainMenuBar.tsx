import { Button, Menu, Portal } from "@chakra-ui/react";
import { dockviewThemes, DockviewThemeSelector } from "./DockviewThemeSelector";
import { mainMenus } from "@/lib/const";
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
