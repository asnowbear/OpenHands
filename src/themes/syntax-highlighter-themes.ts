import {
  solarizedlight,
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ColorThemeKey } from "#/themes/color-themes";

// Paper sets code like a printed listing: reserved words in bold ink,
// literals in the spot red and the status inks, comments faded italic.
const paper: typeof vs = {
  'code[class*="language-"]': {
    ...vs['code[class*="language-"]'],
    color: "#241c17",
  },
  'pre[class*="language-"]': {
    ...vs['pre[class*="language-"]'],
    color: "#241c17",
    backgroundColor: "#f8f0e1",
    border: "1px solid #cabca6",
  },
  comment: { color: "#615448", fontStyle: "italic" },
  prolog: { color: "#615448" },
  doctype: { color: "#615448" },
  cdata: { color: "#615448" },
  punctuation: { color: "#453b33" },
  operator: { color: "#453b33" },
  keyword: { color: "#241c17", fontWeight: "bold" },
  atrule: { color: "#241c17", fontWeight: "bold" },
  tag: { color: "#241c17", fontWeight: "bold" },
  deleted: { color: "#9a2616" },
  string: { color: "#45572f" },
  char: { color: "#45572f" },
  inserted: { color: "#45572f" },
  "attr-value": { color: "#45572f" },
  number: { color: "#9a2616" },
  boolean: { color: "#9a2616" },
  constant: { color: "#9a2616" },
  symbol: { color: "#9a2616" },
  function: { color: "#6a3b56" },
  "class-name": { color: "#6a3b56" },
  builtin: { color: "#6a3b56" },
  selector: { color: "#5b4130" },
  property: { color: "#5b4130" },
  "attr-name": { color: "#5b4130" },
  url: { color: "#9a2616" },
  regex: { color: "#724d16" },
  important: { color: "#724d16", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
};

// Ember sets code on umber: copper keywords, sage strings, coral numbers,
// and comments in a faded clay that still clears small-text contrast.
const ember: typeof vs = {
  'code[class*="language-"]': {
    ...vs['code[class*="language-"]'],
    color: "#F0EBE8",
  },
  'pre[class*="language-"]': {
    ...vs['pre[class*="language-"]'],
    color: "#F0EBE8",
    backgroundColor: "#2C1D11",
    border: "1px solid #442C1A",
  },
  comment: { color: "#BE8D67", fontStyle: "italic" },
  prolog: { color: "#BE8D67" },
  doctype: { color: "#BE8D67" },
  cdata: { color: "#BE8D67" },
  punctuation: { color: "#D2BAA7" },
  operator: { color: "#D2BAA7" },
  keyword: { color: "#E39A4A", fontWeight: "bold" },
  atrule: { color: "#E39A4A", fontWeight: "bold" },
  tag: { color: "#E39A4A", fontWeight: "bold" },
  deleted: { color: "#F0A08A" },
  string: { color: "#C6D7A1" },
  char: { color: "#C6D7A1" },
  inserted: { color: "#C6D7A1" },
  "attr-value": { color: "#C6D7A1" },
  number: { color: "#F0A08A" },
  boolean: { color: "#F0A08A" },
  constant: { color: "#F0A08A" },
  symbol: { color: "#F0A08A" },
  function: { color: "#FFC48A" },
  "class-name": { color: "#FFC48A" },
  builtin: { color: "#FFC48A" },
  selector: { color: "#E7B6D4" },
  property: { color: "#E7B6D4" },
  "attr-name": { color: "#E7B6D4" },
  url: { color: "#FFC48A" },
  regex: { color: "#F0D48A" },
  important: { color: "#F0D48A", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
};

// Exhaustive: adding a Canvas theme requires an explicit syntax palette.
const SYNTAX_THEMES: Record<ColorThemeKey, typeof vs> = {
  "openhands-deepsea": vscDarkPlus,
  "openhands-neutral": vscDarkPlus,
  "openhands-neo": vscDarkPlus,
  "light-plus": vs,
  "solarized-light": solarizedlight,
  paper,
  ember,
};

export function getSyntaxHighlighterTheme(theme: ColorThemeKey) {
  return SYNTAX_THEMES[theme];
}
