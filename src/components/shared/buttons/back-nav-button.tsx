import React from "react";
import { ArrowLeft } from "lucide-react";
import { NavigationLink } from "#/components/shared/navigation-link";
import { cn } from "#/utils/utils";
import { formControlBackNavButtonClassName } from "#/utils/form-control-classes";
import { BackNavButtonContent } from "./back-nav-button-content";
import { StyledTooltip } from "./styled-tooltip";

type BackNavButtonBaseProps = {
  children?: React.ReactNode;
  ariaLabel?: string;
  testId?: string;
  className?: string;
};

type BackNavButtonAsButtonProps = BackNavButtonBaseProps & {
  onClick: () => void;
};

type BackNavButtonAsLinkProps = BackNavButtonBaseProps & {
  to: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type BackNavButtonProps =
  BackNavButtonAsButtonProps | BackNavButtonAsLinkProps;

export function BackNavButton(
  props: BackNavButtonAsLinkProps,
): React.JSX.Element;
export function BackNavButton(
  props: BackNavButtonAsButtonProps,
): React.JSX.Element;
export function BackNavButton(props: BackNavButtonProps) {
  const { children, ariaLabel, testId, className } = props;
  const classes = cn(formControlBackNavButtonClassName, className);

  if ("to" in props) {
    return (
      <NavigationLink
        to={props.to}
        onClick={props.onClick}
        data-testid={testId}
        aria-label={ariaLabel}
        className={classes}
      >
        <BackNavButtonContent>{children}</BackNavButtonContent>
      </NavigationLink>
    );
  }

  const label =
    ariaLabel ?? (typeof children === "string" ? children : undefined);
  const iconOnly = typeof children === "string" && label !== undefined;

  const button = (
    <button
      type="button"
      onClick={props.onClick}
      data-testid={testId}
      aria-label={label}
      className={cn(classes, iconOnly && "w-9 justify-center px-0")}
    >
      {iconOnly ? (
        <ArrowLeft size={20} aria-hidden />
      ) : (
        <BackNavButtonContent>{children}</BackNavButtonContent>
      )}
    </button>
  );

  if (!iconOnly || !label) {
    return button;
  }

  return (
    <StyledTooltip content={label} placement="bottom">
      <span className="inline-flex self-start">{button}</span>
    </StyledTooltip>
  );
}
