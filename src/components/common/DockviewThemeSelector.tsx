import React, { useState } from "react";
import { Button, Menu, Portal } from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu";
import {
  themeLight,
  themeDark,
  themeVisualStudio,
  themeAbyss,
  themeDracula,
  // themeReplit,
  // themeLightSpaced,
  // themeAbyssSpaced,
} from "dockview";

export const dockviewThemes = [
  { label: "Light", theme: themeLight },
  { label: "Dark", theme: themeDark },
  { label: "Visual Studio", theme: themeVisualStudio },
  { label: "Abyss", theme: themeAbyss },
  { label: "Dracula", theme: themeDracula },
  // { label: "Replit", theme: themeReplit },
  // { label: "Light Spaced", theme: themeLightSpaced },
  // { label: "Abyss Spaced", theme: themeAbyssSpaced },
] as const;

type ThemeOption = (typeof dockviewThemes)[number];

/**
 * DockviewThemeSelector component to display a theme selector.
 * The user can select a theme from the list of available themes.
 * We use The DockView themes for the theme selector.
 */
export function DockviewThemeSelector({
  onChange,
  initialTheme = themeLight,
}: {
  onChange: (theme: ThemeOption["theme"]) => void;
  initialTheme?: ThemeOption["theme"];
}) {
  const [selected, setSelected] = useState<ThemeOption["theme"]>(initialTheme);
  const active = dockviewThemes.find((t) => t.theme === selected);

  const handleSelect = (opt: ThemeOption) => {
    setSelected(opt.theme);
    onChange(opt.theme);
  };

  return (
    <Menu.Root>
      {/* The button that opens the menu */}
      <Menu.Trigger asChild>
        <Button variant={"plain"} size="sm" color={"dvForeground"}>
          Theme <LuChevronDown />
          {active?.label ?? "Theme"}
        </Button>
      </Menu.Trigger>

      {/* The portal containing the menu content */}
      <Portal>
        <Menu.Positioner>
          <Menu.Content bg={"dvGroupBg"} boxShadow={"dvFloating"}>
            {dockviewThemes.map((opt) => (
              <Menu.Item
                key={opt.label}
                onClick={() => handleSelect(opt)}
                fontWeight={opt.theme === selected ? "bold" : "normal"}
                color={"dvForeground"}
              >
                {opt.label}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
