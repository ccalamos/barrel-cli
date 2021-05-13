import type {
  GitHubPollAuthResponse,
  IGitHubPollAuthPayload,
  IGitHubPollAuthResponseOK,
} from "types";

import { poll } from "utils";
import { GITHUB_CLIENT_ID, GITHUB_POLL_URI } from "globals";

export default function (
  deviceCode: string,
  interval: number,
  expiresIn: number,
): Promise<IGitHubPollAuthResponseOK> {
  const Payload: IGitHubPollAuthPayload = {
    // deno-lint-ignore camelcase
    client_id: GITHUB_CLIENT_ID,
    // deno-lint-ignore camelcase
    device_code: deviceCode,
    // deno-lint-ignore camelcase
    grant_type: "urn:ietf:params:oauth:grant-type:device_code",
  };

  return poll<GitHubPollAuthResponse>(GITHUB_POLL_URI, Payload, {
    interval: interval * 1000 + 1000,
    expiresIn: expiresIn * 1000,
  }).then((response) => response as IGitHubPollAuthResponseOK).catch(
    (reason) => {
      console.error(reason);
      Deno.exit(1);
    },
  );
}
