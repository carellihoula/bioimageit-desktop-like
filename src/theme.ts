import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(
  { ...defaultConfig, preflight: false },
  {
    theme: {
      tokens: {
        colors: {
          // Dockview CSS vars exposed as Chakra tokens
          dvBackground: { value: "var(--dv-background-color)" },
          dvForeground: {
            value: "var(--dv-activegroup-visiblepanel-tab-color)",
          },
          dvHoverBg: { value: "var(--dv-icon-hover-background-color)" },
          dvSeparatorBorder: { value: "var(--dv-separator-border)" },
        },
        // Other tokens (radii, spacing...)
      },
      semanticTokens: {
        colors: {
          // semanticTokens
          background: {
            value: { base: "dvBackground", _dark: "dvBackground" },
          },
          text: { value: { base: "dvForeground", _dark: "dvForeground" } },
          border: {
            value: { base: "dvSeparatorBorder", _dark: "dvSeparatorBorder" },
          },
        },
      },
    },
  }
);
