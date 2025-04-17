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
          dvGroupBg: { value: "var(--dv-group-view-background-color)" },
          dvHoverBg: { value: "var(--dv-icon-hover-background-color)" },
          dvSeparatorBorder: { value: "var(--dv-separator-border)" },
        },
        shadows: {
          dvFloating: {
            value: "var(--dv-floating-box-shadow)",
          },
        },
        // Other tokens (radii, spacing...)
      },
      semanticTokens: {
        colors: {
          // semanticTokens
          background: {
            value: { base: "dvBackground", _dark: "dvBackground" },
          },
          panel: {
            value: { base: "dvGroupBg", _dark: "dvGroupBg" },
          },
          text: { value: { base: "dvForeground", _dark: "dvForeground" } },
          border: {
            value: { base: "dvSeparatorBorder", _dark: "dvSeparatorBorder" },
          },
        },
        shadows: {
          floating: {
            value: { base: "dvFloating", _dark: "dvFloating" },
          },
        },
      },
    },
  }
);
