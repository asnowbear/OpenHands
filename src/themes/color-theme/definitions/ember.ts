import type { AgentServerUICssVariableName } from "#/styles/agent-server-ui-style-scope";
import type { ColorThemeDefinition } from "../types";

// Ember is a night fire: umber surfaces and ivory text. Each stop keeps the
// luminance of the matching OpenHands-Neutral grey so inherited status inks
// stay readable, while the hue is brown rather than grey or blue-slate.
// Primary actions are copper with dark ink; links and the focus ring are a
// lighter peach spark. Ember stays dark regardless of the operating system.

const EMBER_SCALE = {
  "--cool-grey-50": "#F9F7F5",
  "--cool-grey-100": "#F0EBE8",
  "--cool-grey-200": "#E3DBD4",
  "--cool-grey-300": "#D2BAA7",
  "--cool-grey-400": "#BE8D67",
  "--cool-grey-500": "#9A6842",
  "--cool-grey-600": "#764D2D",
  "--cool-grey-700": "#583921",
  "--cool-grey-800": "#442C1A",
  "--cool-grey-900": "#372415",
  "--cool-grey-925": "#2C1D11",
  "--cool-grey-950": "#21160D",
  "--cool-grey-975": "#160E08",
};

const EMBER_HEROUI = {
  "--heroui-background": "27 43.48% 9.02%",
  "--heroui-background-foreground": "30 25% 96.86%",
  "--heroui-foreground-50": "25.71 46.67% 5.88%",
  "--heroui-foreground-100": "27 43.48% 9.02%",
  "--heroui-foreground-200": "26.67 44.26% 11.96%",
  "--heroui-foreground-300": "26.47 44.74% 14.9%",
  "--heroui-foreground-400": "25.71 44.68% 18.43%",
  "--heroui-foreground-500": "26.18 45.45% 23.73%",
  "--heroui-foreground-600": "26.3 44.79% 31.96%",
  "--heroui-foreground-700": "25.91 40% 43.14%",
  "--heroui-foreground-800": "26.21 40.09% 57.45%",
  "--heroui-foreground-900": "26.51 32.33% 73.92%",
  "--heroui-foreground": "26.51 32.33% 73.92%",
  "--heroui-content1": "26.67 44.26% 11.96%",
  "--heroui-content1-foreground": "22.5 21.05% 92.55%",
  "--heroui-content2": "26.47 44.74% 14.9%",
  "--heroui-content2-foreground": "28 21.13% 86.08%",
  "--heroui-content3": "25.71 44.68% 18.43%",
  "--heroui-content3-foreground": "26.51 32.33% 73.92%",
  "--heroui-content4": "26.18 45.45% 23.73%",
  "--heroui-content4-foreground": "26.21 40.09% 57.45%",
  "--heroui-default-50": "25.71 46.67% 5.88%",
  "--heroui-default-100": "27 43.48% 9.02%",
  "--heroui-default-200": "26.67 44.26% 11.96%",
  "--heroui-default-300": "26.47 44.74% 14.9%",
  "--heroui-default-400": "25.71 44.68% 18.43%",
  "--heroui-default-500": "26.18 45.45% 23.73%",
  "--heroui-default-600": "26.3 44.79% 31.96%",
  "--heroui-default-700": "25.91 40% 43.14%",
  "--heroui-default-800": "26.21 40.09% 57.45%",
  "--heroui-default-900": "26.51 32.33% 73.92%",
  "--heroui-default-foreground": "30 25% 96.86%",
  "--heroui-default": "25.71 44.68% 18.43%",
  "--heroui-primary": "31.37 73.21% 59.02%",
  "--heroui-primary-foreground": "27 43.48% 9.02%",
  "--heroui-focus": "29.74 100% 77.06%",
};

const EMBER_TOKENS: Partial<Record<AgentServerUICssVariableName, string>> = {
  // Copper fills; the dark umber accent foreground comes from the scale.
  "--oh-color-primary": "#E39A4A",
  "--oh-accent": "#E39A4A",
  "--oh-color-logo": "#E39A4A",
  // Peach marks what you can follow or where the keyboard is.
  "--oh-focus": "#FFC48A",
  "--oh-link": "#FFC48A",
};

export const ember: ColorThemeDefinition = {
  label: "Ember",
  appearance: "dark",
  scale: EMBER_SCALE,
  heroui: EMBER_HEROUI,
  tokens: EMBER_TOKENS,
};
