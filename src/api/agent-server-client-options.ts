import { buildHttpBaseUrl } from "#/utils/websocket-url";
import { getAgentServerWorkingDir } from "./agent-server-config";
import { getEffectiveLocalBackend } from "./backend-registry/active-store";
import type { Backend } from "./backend-registry/types";

/**
 * 本地协议调用的客户端选项。默认的 host 与 apiKey 都来自当前有效的 local
 * 后端；选中 Cloud 时没有有效 Local，调用会抛出 NoBackendAvailableError，
 * 除非调用方显式传入某次对话的 runtime 地址。
 */

export interface AgentServerClientOverrides {
  conversationId?: string;
  host?: string;
  apiKey?: string | null;
  sessionApiKey?: string | null;
  workingDir?: string;
  conversationUrl?: string | null;
  timeout?: number;
}

export interface AgentServerClientOptions {
  conversationId?: string;
  host: string;
  apiKey?: string;
  workingDir: string;
  timeout?: number;
}

export class NoBackendAvailableError extends Error {
  constructor() {
    super("No backend is configured.");
    this.name = "NoBackendAvailableError";
  }
}

function normalizeHost(host: string): string {
  return host.replace(/\/+$/, "");
}

function resolveHost(
  overrides: AgentServerClientOverrides,
  backend: Backend | null,
): string {
  if (overrides.host) return normalizeHost(overrides.host);
  if (overrides.conversationUrl)
    return normalizeHost(buildHttpBaseUrl(overrides.conversationUrl));
  return normalizeHost(backend?.host ?? "");
}

/**
 * 组装本地协议客户端选项。host 与 apiKey 取自有效 Local，
 * 可被单次调用的 overrides 覆盖。
 */
export function getAgentServerClientOptions(
  overrides: AgentServerClientOverrides = {},
): AgentServerClientOptions {
  const backend = getEffectiveLocalBackend();
  if (!backend && !overrides.host && !overrides.conversationUrl) {
    throw new NoBackendAvailableError();
  }

  const apiKey =
    overrides.sessionApiKey ?? overrides.apiKey ?? backend?.apiKey ?? undefined;

  const conversationId =
    overrides.conversationId ??
    overrides.conversationUrl?.match(
      /\/api\/conversations\/([^/?#]+)(?:[/?#]|$)/,
    )?.[1];

  return {
    host: resolveHost(overrides, backend),
    ...(conversationId ? { conversationId } : {}),
    ...(apiKey ? { apiKey } : {}),
    workingDir: overrides.workingDir ?? getAgentServerWorkingDir(),
    ...(overrides.timeout !== undefined ? { timeout: overrides.timeout } : {}),
  };
}

export function getAgentServerHttpClientOptions(
  overrides?: AgentServerClientOverrides,
) {
  const { host, apiKey, timeout, conversationId } =
    getAgentServerClientOptions(overrides);
  return {
    baseUrl: host,
    ...(conversationId ? { conversationId } : {}),
    ...(apiKey ? { apiKey } : {}),
    timeout: timeout ?? 60000,
  };
}
