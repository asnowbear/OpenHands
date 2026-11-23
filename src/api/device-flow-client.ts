import {
  pollForToken as sdkPollForToken,
  startDeviceFlow as sdkStartDeviceFlow,
} from "@openhands/typescript-client/client/device-flow-client";
import type {
  DeviceAuthorizationResponse,
  DeviceTokenResponse,
  PollDeviceTokenOptions,
} from "@openhands/typescript-client/client/device-flow-client";
import { AGENT_CANVAS_CLIENT_HEADERS } from "./client-source";

export {
  DeviceFlowError,
  isOpenHandsCloudHost,
} from "@openhands/typescript-client/client/device-flow-client";

/**
 * 授权一条 Cloud 后端的入口：向 Cloud 主机发起设备码流程，
 * 用户在浏览器确认后由 pollForToken 换取访问令牌。
 */
export function startDeviceFlow(
  host: string,
): Promise<DeviceAuthorizationResponse> {
  return sdkStartDeviceFlow(host, { headers: AGENT_CANVAS_CLIENT_HEADERS });
}

export function pollForToken(
  host: string,
  deviceCode: string,
  options: PollDeviceTokenOptions,
): Promise<DeviceTokenResponse> {
  return sdkPollForToken(host, deviceCode, {
    ...options,
    headers: AGENT_CANVAS_CLIENT_HEADERS,
  });
}

export type {
  DeviceAuthorizationResponse,
  DeviceTokenResponse,
} from "@openhands/typescript-client/client/device-flow-client";
