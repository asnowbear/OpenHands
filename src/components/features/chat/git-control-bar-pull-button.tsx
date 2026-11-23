import { useTranslation } from "react-i18next";
import ArrowDownIcon from "#/icons/u-arrow-down.svg?react";
import { StyledTooltip } from "#/components/shared/buttons/styled-tooltip";
import { cn, getGitPullPrompt } from "#/utils/utils";
import {
  gitControlBarActionButtonClassName,
  gitControlBarActionIconColor,
} from "#/utils/git-control-bar-classes";
import { I18nKey } from "#/i18n/declaration";
import { useTracking } from "#/hooks/use-tracking";

interface GitControlBarPullButtonProps {
  onSuggestionsClick: (value: string) => void;
  hasRepository: boolean;
  providerTokensReady: boolean;
  isConversationReady?: boolean;
}

export function GitControlBarPullButton({
  onSuggestionsClick,
  hasRepository,
  providerTokensReady,
  isConversationReady = true,
}: GitControlBarPullButtonProps) {
  const { t } = useTranslation("openhands");
  const { trackPullButtonClick } = useTracking();

  const isButtonEnabled =
    providerTokensReady && hasRepository && isConversationReady;

  const handlePullClick = () => {
    trackPullButtonClick();
    onSuggestionsClick(getGitPullPrompt());
  };

  const label = t(I18nKey.COMMON$PULL);

  return (
    <StyledTooltip content={label} placement="top">
      <span className="inline-flex">
        <button
          type="button"
          onClick={handlePullClick}
          disabled={!isButtonEnabled}
          aria-label={label}
          className={cn(
            gitControlBarActionButtonClassName(isButtonEnabled),
            "size-7",
          )}
        >
          <span className="flex size-3 items-center justify-center" aria-hidden>
            <ArrowDownIcon
              width={12}
              height={12}
              color={gitControlBarActionIconColor(isButtonEnabled)}
            />
          </span>
        </button>
      </span>
    </StyledTooltip>
  );
}
