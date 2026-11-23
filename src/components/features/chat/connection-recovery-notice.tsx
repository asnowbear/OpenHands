import { RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StyledTooltip } from "#/components/shared/buttons/styled-tooltip";
import { I18nKey } from "#/i18n/declaration";
import type { ConnectionRecoveryState } from "#/hooks/use-connection-error-grace-period";

export function ConnectionRecoveryNotice({
  state,
  onRetry,
}: {
  state: ConnectionRecoveryState;
  onRetry: () => void;
}) {
  const { t } = useTranslation("openhands");
  if (state === "idle") return null;
  return (
    <div
      role="status"
      className="relative z-10 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-raised p-2 text-sm text-muted"
    >
      <span>
        {t(
          state === "retryable"
            ? I18nKey.CHAT_INTERFACE$STILL_RECONNECTING
            : I18nKey.CHAT_INTERFACE$RECONNECTING,
        )}
      </span>
      {state === "retryable" && (
        <StyledTooltip
          content={t(I18nKey.CHAT_INTERFACE$MESSAGE_RETRY)}
          placement="top"
        >
          <span className="inline-flex">
            <button
              type="button"
              onClick={onRetry}
              aria-label={t(I18nKey.CHAT_INTERFACE$MESSAGE_RETRY)}
              className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded text-foreground hover:bg-white/5"
            >
              <RotateCcw className="size-3.5" aria-hidden />
            </button>
          </span>
        </StyledTooltip>
      )}
    </div>
  );
}
