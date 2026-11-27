import type { ITheme } from "@xterm/xterm";
import { COLOR_THEMES, type ColorThemeKey } from "./color-themes";

// Specify every ANSI slot so switching back to dark also resets light colors.
const dark: ITheme = {
  black: "#000000",
  red: "#cd0000",
  green: "#00cd00",
  yellow: "#cdcd00",
  blue: "#0000ee",
  magenta: "#cd00cd",
  cyan: "#00cdcd",
  white: "#e5e5e5",
  brightBlack: "#7f7f7f",
  brightRed: "#ff0000",
  brightGreen: "#00ff00",
  brightYellow: "#ffff00",
  brightBlue: "#5c5cff",
  brightMagenta: "#ff00ff",
  brightCyan: "#00ffff",
  brightWhite: "#ffffff",
};

const light: ITheme = {
  black: "#1f1f1f",
  red: "#a31515",
  green: "#167040",
  yellow: "#795e00",
  blue: "#0451a5",
  magenta: "#800080",
  cyan: "#006b73",
  white: "#616161",
  brightBlack: "#616161",
  brightRed: "#b52020",
  brightGreen: "#12743c",
  brightYellow: "#806000",
  brightBlue: "#005cc5",
  brightMagenta: "#950095",
  brightCyan: "#007880",
  brightWhite: "#424242",
};

const solarized: ITheme = {
  black: "#073642",
  red: "#b52624",
  green: "#586e00",
  yellow: "#826200",
  blue: "#006ab1",
  magenta: "#a72d70",
  cyan: "#147a74",
  white: "#586e75",
  brightBlack: "#657b83",
  brightRed: "#b84313",
  brightGreen: "#657b00",
  brightYellow: "#936f00",
  brightBlue: "#0879ba",
  brightMagenta: "#6c71c4",
  brightCyan: "#16827a",
  brightWhite: "#002b36",
};

// Every ANSI slot is an ink that stays legible on aged newsprint; "white" is
// the faded ink, and bright variants print one shade heavier.
const paper: ITheme = {
  black: "#241c17",
  red: "#9a2616",
  green: "#45572f",
  yellow: "#724d16",
  blue: "#335069",
  magenta: "#6a3b56",
  cyan: "#315855",
  white: "#615448",
  brightBlack: "#615448",
  brightRed: "#891809",
  brightGreen: "#364622",
  brightYellow: "#5f3d06",
  brightBlue: "#234058",
  brightMagenta: "#572d45",
  brightCyan: "#204745",
  brightWhite: "#241c17",
  selectionBackground: "rgba(154, 38, 22, 0.18)",
};

// Dim slots stay light enough to read on umber; hue still separates the
// ANSI colors, so the terminal is not a second copy of the copper chrome.
const ember: ITheme = {
  black: "#BE8D67",
  red: "#F0A08A",
  green: "#C6D7A1",
  yellow: "#F0D48A",
  blue: "#A9C7E8",
  magenta: "#E7B6D4",
  cyan: "#A8D8D0",
  white: "#F0EBE8",
  brightBlack: "#D2BAA7",
  brightRed: "#FFB8A4",
  brightGreen: "#D5E6B8",
  brightYellow: "#FFE0A3",
  brightBlue: "#C5DCF3",
  brightMagenta: "#F3D0E6",
  brightCyan: "#C6E8E2",
  brightWhite: "#F9F7F5",
  selectionBackground: "rgba(227, 154, 74, 0.28)",
};

const palettes: Record<ColorThemeKey, ITheme> = {
  "openhands-deepsea": dark,
  "openhands-neutral": dark,
  "openhands-neo": dark,
  "light-plus": light,
  "solarized-light": solarized,
  paper,
  ember,
};

export function getTerminalTheme(
  key: ColorThemeKey,
  foreground: string,
): ITheme {
  return {
    ...palettes[key],
    background: "rgba(0, 0, 0, 0)",
    foreground,
    cursor: foreground,
    selectionBackground:
      palettes[key].selectionBackground ??
      (COLOR_THEMES[key].appearance === "light"
        ? "rgba(0, 80, 160, 0.2)"
        : "rgba(255, 255, 255, 0.25)"),
  };
}
