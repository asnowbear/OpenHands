import { Hammer } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StyledTooltip } from "#/components/shared/buttons/styled-tooltip";
import { cn } from "#/utils/utils";
import { I18nKey } from "#/i18n/declaration";
import { useConversationStore } from "#/stores/conversation-store";
import { useSelectConversationTab } from "#/hooks/use-select-conversation-tab";
import { useHandleBuildPlanClick } from "#/hooks/use-handle-build-plan-click";
import { useAgentState, usePlanningAgentState } from "#/hooks/use-agent-state";
import { AgentState } from "#/types/agent-state";

const BUILD_SHORTCUT = "⌘↩";

/**
 * The Planner tab's Build row, shown below the drawer tab row while the
 * Planner tab is open. Rendered by the desktop drawer header and, at phone
 * width, below the panel page's fixed-height top bar.
 */
export function ConversationPlannerBuildBar({
  className,
}: {
  className?: string;
}) {
  const { t } = useTranslation("openhands");
  const planContent = useConversationStore((state) => state.planContent);
  const { isTabActive } = useSelectConversationTab();
  const { handleBuildPlanClick } = useHandleBuildPlanClick();
  const { curAgentState } = useAgentState();
  const { isPlanningAgentRunning } = usePlanningAgentState();

  if (!isTabActive("planner")) return null;

  const isAgentRunning =
    curAgentState === AgentState.RUNNING ||
    curAgentState === AgentState.LOADING ||
    isPlanningAgentRunning;
  const isBuildDisabled = isAgentRunning || !planContent;
  const buildLabel = t(I18nKey.COMMON$BUILD);

  return (
    <div
      className={cn(
        "flex h-10 min-h-10 shrink-0 items-center border-t border-border pl-2.5 pr-1",
        className,
      )}
    >
      <StyledTooltip
        content={`${buildLabel} ${BUILD_SHORTCUT}`}
        placement="top"
      >
        <span className="inline-flex">
          <button
            type="button"
            onClick={handleBuildPlanClick}
            disabled={isBuildDisabled}
            aria-label={buildLabel}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded bg-contrast text-contrast-foreground transition-opacity",
              isBuildDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:opacity-90",
            )}
            data-testid="planner-tab-build-button"
          >
            <Hammer className="size-3.5" aria-hidden />
          </button>
        </span>
      </StyledTooltip>
    </div>
  );
}
