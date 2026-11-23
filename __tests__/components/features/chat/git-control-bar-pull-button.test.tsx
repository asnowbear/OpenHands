import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { GitControlBarPullButton } from "#/components/features/chat/git-control-bar-pull-button";
import { GitControlBarPushButton } from "#/components/features/chat/git-control-bar-push-button";
import { GitControlBarPrButton } from "#/components/features/chat/git-control-bar-pr-button";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("#/hooks/use-tracking", () => ({
  useTracking: () => ({
    trackPullButtonClick: vi.fn(),
    trackPushButtonClick: vi.fn(),
    trackCreatePrButtonClick: vi.fn(),
  }),
}));

vi.mock("#/icons/u-arrow-down.svg?react", () => ({
  default: ({ color }: { color?: string }) => (
    <svg data-testid="pull-icon" data-color={color ?? ""} />
  ),
}));

describe("GitControlBarPullButton", () => {
  it("uses muted theme colors when inactive during conversation loading", () => {
    render(
      <GitControlBarPullButton
        onSuggestionsClick={vi.fn()}
        hasRepository
        providerTokensReady
        isConversationReady={false}
      />,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button.className).toContain("text-muted");
    expect(button.className).toContain("opacity-50");
    expect(button.className).not.toContain("hover:bg-tertiary");
    expect(screen.getByTestId("pull-icon")).toHaveAttribute(
      "data-color",
      "var(--oh-muted)",
    );
  });

  it("uses active theme colors when conversation is ready", () => {
    render(
      <GitControlBarPullButton
        onSuggestionsClick={vi.fn()}
        hasRepository
        providerTokensReady
        isConversationReady
      />,
    );

    const button = screen.getByRole("button", { name: "COMMON$PULL" });
    expect(button).not.toBeDisabled();
    expect(button).not.toHaveTextContent("COMMON$PULL");
    expect(button.className).toContain("text-contrast");
    expect(button.className).toContain("hover:bg-tertiary");
    expect(screen.getByTestId("pull-icon")).toHaveAttribute(
      "data-color",
      "var(--oh-contrast)",
    );
  });

  it("keeps the pull action available from the icon button", async () => {
    const onSuggestionsClick = vi.fn();
    const user = userEvent.setup();
    render(
      <GitControlBarPullButton
        onSuggestionsClick={onSuggestionsClick}
        hasRepository
        providerTokensReady
        isConversationReady
      />,
    );

    await user.click(screen.getByRole("button", { name: "COMMON$PULL" }));

    expect(onSuggestionsClick).toHaveBeenCalledTimes(1);
  });
});

describe("GitControlBarPushButton", () => {
  it("names the icon button and still sends a push prompt", async () => {
    const onSuggestionsClick = vi.fn();
    const user = userEvent.setup();
    render(
      <GitControlBarPushButton
        onSuggestionsClick={onSuggestionsClick}
        hasRepository
        providerTokensReady
        currentGitProvider="github"
        isConversationReady
      />,
    );

    const button = screen.getByRole("button", { name: "COMMON$PUSH" });
    expect(button).not.toHaveTextContent("COMMON$PUSH");
    await user.click(button);
    expect(onSuggestionsClick).toHaveBeenCalledTimes(1);
  });
});

describe("GitControlBarPrButton", () => {
  it("names the icon button and still sends a pull request prompt", async () => {
    const onSuggestionsClick = vi.fn();
    const user = userEvent.setup();
    render(
      <GitControlBarPrButton
        onSuggestionsClick={onSuggestionsClick}
        hasRepository
        providerTokensReady
        currentGitProvider="github"
        isConversationReady
      />,
    );

    const button = screen.getByRole("button", { name: "COMMON$PULL_REQUEST" });
    expect(button).not.toHaveTextContent("COMMON$PULL_REQUEST");
    await user.click(button);
    expect(onSuggestionsClick).toHaveBeenCalledTimes(1);
  });
});
