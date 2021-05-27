import type {
  GitHubGetUserCodeResponse,
  IGitHubGetUserCodePayload,
  IGitHubGetUserCodeResponseOK,
  IGitHubResponseError,
} from "types";

import { isErrorResponse, post } from "utils";
import { GITHUB_CLIENT_ID, GITHUB_USER_CODE_URI } from "globals";

const PAYLOAD: IGitHubGetUserCodePayload = {
  // deno-lint-ignore camelcase
  client_id: GITHUB_CLIENT_ID,
  scope: ["repo"].join(" "),
};

export default async function () {
  const response = await post<GitHubGetUserCodeResponse>(
    GITHUB_USER_CODE_URI,
    PAYLOAD,
  );

  return new Promise(
    (
      resolve: (response: IGitHubGetUserCodeResponseOK) => void,
      reject: (reason: IGitHubResponseError) => void,
    ) => {
      isErrorResponse(response)
        ? reject(response as IGitHubResponseError)
        : resolve(response as IGitHubGetUserCodeResponseOK);
    },
  );
}
