import { useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Hammer } from "lucide-react";
import { StyledTooltip } from "#/components/shared/buttons/styled-tooltip";
import LessonPlanIcon from "#/icons/lesson-plan.svg?react";
import { Typography } from "#/ui/typography";
import { I18nKey } from "#/i18n/declaration";
import { MarkdownRenderer } from "#/components/features/markdown/markdown-renderer";
import { useHandleBuildPlanClick } from "#/hooks/use-handle-build-plan-click";
import { cn } from "#/utils/utils";
import { useSelectConversationTab } from "#/hooks/use-select-conversation-tab";
import {
  planComponents,
  createPlanComponents,
} from "#/components/features/markdown/plan-components";
import { useScrollContext } from "#/context/scroll-context";

const MAX_CONTENT_LENGTH = 300;
const BUILD_SHORTCUT = "⌘↩";

// Shine effect class for streaming text
const SHINE_TEXT_CLASS = "shine-text";

// Plan components with shine effect applied for streaming state
const shineComponents = createPlanComponents(SHINE_TEXT_CLASS);

interface PlanPreviewProps {
  /** Raw plan content from PLAN.md file */
  planContent?: string | null;
  /** Whether the plan content is actively being streamed */
  isStreaming?: boolean;
  /** Whether the Build button should be disabled (e.g., while streaming) */
  isBuildDisabled?: boolean;
}

export function PlanPreview({
  planContent,
  isStreaming,
  isBuildDisabled,
}: PlanPreviewProps) {
  const { t } = useTranslation("openhands");
  const { navigateToTab } = useSelectConversationTab();
  const { handleBuildPlanClick } = useHandleBuildPlanClick();
  const { scrollDomToBottom } = useScrollContext();

  const handleViewClick = () => {
    navigateToTab("planner");
  };

  // Handle Build action with scroll to bottom
  const handleBuildClick = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      handleBuildPlanClick(event);
      scrollDomToBottom();
    },
    [handleBuildPlanClick, scrollDomToBottom],
  );

  // Truncate plan content for preview
  const truncatedContent = useMemo(() => {
    if (!planContent) return "";
    if (planContent.length <= MAX_CONTENT_LENGTH) return planContent;
    return `${planContent.slice(0, MAX_CONTENT_LENGTH)}...`;
  }, [planContent]);

  if (!planContent) {
    return null;
  }

  return (
    <div className="bg-surface border border-[#597FF4] rounded-xl w-full mt-2">
      {/* Header */}
      <div className="border-b border-border flex h-10.25 items-center px-2 gap-1">
        <LessonPlanIcon width={18} height={18} color="var(--oh-muted)" />
        <Typography.Text className="font-normal text-2xs text-contrast tracking-metadata leading-4">
          {t(I18nKey.COMMON$PLAN_MD)}
        </Typography.Text>
        <div className="flex-1" />
        <button
          type="button"
          onClick={handleViewClick}
          className="flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
          data-testid="plan-preview-view-button"
        >
          <Typography.Text className="font-normal text-2xs text-contrast tracking-metadata leading-4">
            {t(I18nKey.COMMON$VIEW)}
          </Typography.Text>
          <ArrowUpRight className="text-contrast" size={18} />
        </button>
      </div>

      {/* Content */}
      <div
        data-testid="plan-preview-content"
        className="flex flex-col gap-2.5 p-4 text-sm-plus text-contrast leading-7.25"
      >
        {truncatedContent && (
          <>
            <MarkdownRenderer
              includeStandard
              components={isStreaming ? shineComponents : planComponents}
            >
              {truncatedContent}
            </MarkdownRenderer>
            {planContent && planContent.length > MAX_CONTENT_LENGTH && (
              <button
                type="button"
                onClick={handleViewClick}
                className="text-[#4a67bd] cursor-pointer hover:underline text-left"
                data-testid="plan-preview-read-more-button"
              >
                {t(I18nKey.COMMON$READ_MORE)}
              </button>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border flex h-13.5 items-center justify-start px-4">
        <StyledTooltip
          content={`${t(I18nKey.COMMON$BUILD)} ${BUILD_SHORTCUT}`}
          placement="top"
        >
          <span className="inline-flex">
            <button
              type="button"
              onClick={handleBuildClick}
              disabled={isBuildDisabled}
              aria-label={t(I18nKey.COMMON$BUILD)}
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-sm bg-contrast text-contrast-foreground transition-opacity",
                isBuildDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:opacity-90",
              )}
              data-testid="plan-preview-build-button"
            >
              <Hammer className="size-4" aria-hidden />
            </button>
          </span>
        </StyledTooltip>
      </div>
    </div>
  );
}
