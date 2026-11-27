import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AgentServerUIRoot } from "#/components/providers/agent-server-ui-root";
import { ThemeInput } from "#/components/features/settings/app-settings/theme-input";
import {
  AVAILABLE_COLOR_THEMES,
  COLOR_THEMES,
  DEFAULT_COLOR_THEME,
  applyColorTheme,
  readPersistedColorTheme,
} from "#/themes/color-themes";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Ember color theme", () => {
  beforeEach(() => {
    window.localStorage.clear();
    applyColorTheme(DEFAULT_COLOR_THEME);
  });

  afterEach(() => {
    window.localStorage.clear();
    applyColorTheme(DEFAULT_COLOR_THEME);
    document.getElementById("oh-color-theme-override")?.remove();
  });

  it("registers Ember as a dark palette the settings picker can select", async () => {
    const user = userEvent.setup();
    const ember = COLOR_THEMES.ember;

    expect(ember.label).toBe("Ember");
    expect(ember.appearance).toBe("dark");
    expect(ember.scale["--cool-grey-950"]).not.toBe(
      COLOR_THEMES["openhands-neutral"].scale["--cool-grey-950"],
    );
    expect(ember.scale["--cool-grey-950"]).not.toBe(
      COLOR_THEMES["openhands-deepsea"].scale["--cool-grey-950"],
    );
    expect(AVAILABLE_COLOR_THEMES).toContainEqual({
      key: "ember",
      label: "Ember",
    });

    render(
      <>
        <AgentServerUIRoot data-testid="scope">{null}</AgentServerUIRoot>
        <ThemeInput />
      </>,
    );

    await user.click(screen.getByLabelText("SETTINGS$COLOR_THEME"));
    await user.click(await screen.findByText("Ember"));

    expect(readPersistedColorTheme()).toBe("ember");
    expect(screen.getByTestId("scope")).toHaveAttribute(
      "data-color-theme",
      "ember",
    );
    expect(screen.getByTestId("scope")).toHaveAttribute(
      "data-color-scheme",
      "dark",
    );
    expect(document.documentElement.style.colorScheme).toBe("dark");
    const css = document.getElementById("oh-color-theme-override")?.textContent;
    expect(css).toContain("--cool-grey-950: #21160D;");
    expect(css).toContain("--oh-color-primary: #E39A4A;");
    expect(css).toContain("--oh-focus: #FFC48A;");
    expect(css).toContain("color-scheme: dark;");
  });
});
