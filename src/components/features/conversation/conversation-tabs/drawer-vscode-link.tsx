import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import VSCodeIcon from "#/icons/vscode.svg?react";
import { I18nKey } from "#/i18n/declaration";
import { useAgentState } from "#/hooks/use-agent-state";
import { useUnifiedVSCodeUrl } from "#/hooks/query/use-unified-vscode-url";
import { RUNTIME_STARTING_STATES } from "#/types/agent-state";
import { cn } from "#/utils/utils";

export function DrawerVSCodeLink() {
  const { t } = useTranslation("openhands");
  const { curAgentState } = useAgentState();
  const { data, refetch, isLoading, isUnavailable } = useUnifiedVSCodeUrl();
  const isRuntimeStarting = RUNTIME_STARTING_STATES.includes(curAgentState);

  const handleClick = async () => {
    let vscodeUrl = data?.url;

    if (!vscodeUrl) {
      const result = await refetch();
      vscodeUrl = result.data?.url ?? null;
    }

    if (vscodeUrl) {
      window.open(vscodeUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Backends that report no editor to open — `enable_vscode: false`, a
  // configured editor whose process is not running, or no URL reported — get
  // no button rather than one that does nothing when clicked.
  if (isUnavailable) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading || isRuntimeStarting}
      aria-label={t(I18nKey.VSCODE$OPEN)}
      title={t(I18nKey.VSCODE$OPEN)}
      data-testid="drawer-vscode-link"
      className={cn(
        "inline-flex size-7 items-center justify-center gap-0.5 rounded-file-action border border-border bg-base-secondary",
        "text-muted transition-colors hover:enabled:bg-surface-raised hover:enabled:text-contrast",
        "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      )}
    >
      <VSCodeIcon className="size-4 shrink-0" aria-hidden />
      <ExternalLink className="size-3 shrink-0" aria-hidden strokeWidth={2} />
    </button>
  );
}
