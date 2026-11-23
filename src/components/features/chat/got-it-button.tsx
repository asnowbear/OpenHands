import { useTranslation } from "react-i18next";
import CheckCircle from "#/icons/check-circle-solid.svg?react";
import { StyledTooltip } from "#/components/shared/buttons/styled-tooltip";
import { I18nKey } from "#/i18n/declaration";
import { statusToneBadgeClassName } from "#/utils/status-tone-classes";
import { cn } from "#/utils/utils";

export function GotItButton({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation("openhands");
  const label = t(I18nKey.CHAT_INTERFACE$BTW_GOT_IT);
  return (
    <StyledTooltip content={label} placement="top">
      <span className="inline-flex">
        <button
          type="button"
          onClick={onClick}
          aria-label={label}
          className={cn(
            "inline-flex size-7 items-center justify-center rounded-full border border-success/30 hover:border-success transition-colors dark:bg-success/10 dark:text-success dark:hover:border-success/30 dark:hover:bg-success/20",
            statusToneBadgeClassName.success,
          )}
        >
          <CheckCircle className="size-3.5 fill-current" aria-hidden />
        </button>
      </span>
    </StyledTooltip>
  );
}
