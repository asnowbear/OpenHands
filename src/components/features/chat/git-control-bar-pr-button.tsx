import { useTranslation } from "react-i18next";
import PRIcon from "#/icons/u-pr.svg?react";
import { StyledTooltip } from "#/components/shared/buttons/styled-tooltip";
import { cn, getCreatePRPrompt } from "#/utils/utils";
import {
  gitControlBarActionButtonClassName,
  gitControlBarActionIconColor,
} from "#/utils/git-control-bar-classes";
import { I18nKey } from "#/i18n/declaration";
import { Provider } from "#/types/settings";
import { useTracking } from "#/hooks/use-tracking";

interface GitControlBarPrButtonProps {
  onSuggestionsClick: (value: string) => void;
  hasRepository: boolean;
  providerTokensReady: boolean;
  currentGitProvider: Provider;
  isConversationReady?: boolean;
}

export function GitControlBarPrButton({
  onSuggestionsClick,
  hasRepository,
  providerTokensReady,
  currentGitProvider,
  isConversationReady = true,
}: GitControlBarPrButtonProps) {
  const { t } = useTranslation("openhands");
  const { trackCreatePrButtonClick } = useTracking();

  const isButtonEnabled =
    providerTokensReady && hasRepository && isConversationReady;

  const handlePrClick = () => {
    trackCreatePrButtonClick();
    onSuggestionsClick(getCreatePRPrompt(currentGitProvider));
  };

  const label = t(I18nKey.COMMON$PULL_REQUEST);

  return (
    <StyledTooltip content={label} placement="top">
      <span className="inline-flex">
        <button
          type="button"
          onClick={handlePrClick}
          disabled={!isButtonEnabled}
          aria-label={label}
          className={cn(
            gitControlBarActionButtonClassName(isButtonEnabled),
            "size-7",
          )}
        >
          <span className="flex size-3 items-center justify-center" aria-hidden>
            <PRIcon
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
