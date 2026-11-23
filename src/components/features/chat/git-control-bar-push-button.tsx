import { useTranslation } from "react-i18next";
import ArrowUpIcon from "#/icons/u-arrow-up.svg?react";
import { StyledTooltip } from "#/components/shared/buttons/styled-tooltip";
import { cn, getGitPushPrompt } from "#/utils/utils";
import {
  gitControlBarActionButtonClassName,
  gitControlBarActionIconColor,
} from "#/utils/git-control-bar-classes";
import { I18nKey } from "#/i18n/declaration";
import { Provider } from "#/types/settings";
import { useTracking } from "#/hooks/use-tracking";

interface GitControlBarPushButtonProps {
  onSuggestionsClick: (value: string) => void;
  hasRepository: boolean;
  providerTokensReady: boolean;
  currentGitProvider: Provider;
  isConversationReady?: boolean;
}

export function GitControlBarPushButton({
  onSuggestionsClick,
  hasRepository,
  providerTokensReady,
  currentGitProvider,
  isConversationReady = true,
}: GitControlBarPushButtonProps) {
  const { t } = useTranslation("openhands");
  const { trackPushButtonClick } = useTracking();

  const isButtonEnabled =
    providerTokensReady && hasRepository && isConversationReady;

  const handlePushClick = () => {
    trackPushButtonClick();
    onSuggestionsClick(getGitPushPrompt(currentGitProvider));
  };

  const label = t(I18nKey.COMMON$PUSH);

  return (
    <StyledTooltip content={label} placement="top">
      <span className="inline-flex">
        <button
          type="button"
          onClick={handlePushClick}
          disabled={!isButtonEnabled}
          aria-label={label}
          className={cn(
            gitControlBarActionButtonClassName(isButtonEnabled),
            "size-7",
          )}
        >
          <span className="flex size-3 items-center justify-center" aria-hidden>
            <ArrowUpIcon
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
