import { useTranslation } from "react-i18next";
import PuzzleIcon from "#/icons/u-puzzle-piece.svg?react";
import { I18nKey } from "#/i18n/declaration";
import { StyledTooltip } from "#/components/shared/buttons/styled-tooltip";
import { cn } from "#/utils/utils";
import {
  formControlBorderClassName,
  formControlSurfaceClassName,
  formControlTransitionClassName,
} from "#/utils/form-control-classes";

interface PluginPickerTriggerProps {
  /** Number of currently-attached plugins, shown as a badge when > 0. */
  count: number;
  onClick: () => void;
  disabled?: boolean;
}

/** Pill button that opens the plugin picker; mirrors `OpenLauncherButton`. */
export function PluginPickerTrigger({
  count,
  onClick,
  disabled = false,
}: PluginPickerTriggerProps) {
  const { t } = useTranslation("openhands");
  const label = t(I18nKey.PLUGINS$PICKER_TRIGGER);

  return (
    <StyledTooltip content={label} placement="top">
      <span className="inline-flex">
        <button
          type="button"
          data-testid="open-plugin-picker"
          onClick={onClick}
          disabled={disabled}
          aria-label={label}
          className={cn(
            "inline-flex h-7 items-center justify-center gap-1 rounded-full px-1.5 text-contrast",
            formControlBorderClassName,
            formControlSurfaceClassName,
            formControlTransitionClassName,
            disabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-surface-raised",
          )}
        >
          <span
            className="flex size-4 shrink-0 items-center justify-center"
            aria-hidden
          >
            <PuzzleIcon width={16} height={16} className="shrink-0" />
          </span>
          {count > 0 ? (
            <span
              data-testid="plugin-picker-count"
              className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-contrast px-1 text-2xs font-semibold leading-none text-contrast-foreground"
            >
              {count}
            </span>
          ) : null}
        </button>
      </span>
    </StyledTooltip>
  );
}
