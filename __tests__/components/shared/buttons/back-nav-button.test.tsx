import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BackNavButton } from "#/components/shared/buttons/back-nav-button";

describe("BackNavButton", () => {
  it("renders a back button that fires onClick when clicked", () => {
    const onClick = vi.fn();
    render(
      <BackNavButton onClick={onClick} testId="back-button">
        <span />
      </BackNavButton>,
    );

    fireEvent.click(screen.getByTestId("back-button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows a back arrow and keeps the label as the accessible name", () => {
    const onClick = vi.fn();
    const label = "BUTTON$BACK";
    render(
      <BackNavButton onClick={onClick} testId="back-button">
        {label}
      </BackNavButton>,
    );

    const button = screen.getByRole("button", { name: "BUTTON$BACK" });
    expect(button).toBe(screen.getByTestId("back-button"));
    expect(button).not.toHaveTextContent("BUTTON$BACK");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
