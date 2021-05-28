type _Num = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";

export type Scalar = number | string | boolean;

export type FilePath = `${string}.${string}`;

export interface ICommand<ActionArgs extends string[]> {
  name: string;
  description: string;
  action: (args: ActionArgs) => void;
  arguments?: ActionArgs;
}

export interface IVersion {
  year: `${_Num}${_Num}`;
  month: `${_Num}${_Num}`;
  minor: `${number}`;
  patch: `${number}`;
  separator: ".";
  prefix: "" | "v";
}

export type ValidVersion =
  `${IVersion["prefix"]}${IVersion["year"]}${IVersion["separator"]}${IVersion[
    "month"
  ]}${IVersion["separator"]}${IVersion["minor"]}${IVersion[
    "separator"
  ]}${IVersion["patch"]}`;

export interface IAPIResponseError {
  error: boolean;
  message: string;
}

export interface IGitHubResponseError {
  error: string;
  // deno-lint-ignore camelcase
  error_description: string;
  // deno-lint-ignore camelcase
  error_uri: string;
}

export interface IGitHubGetUserCodePayload {
  // deno-lint-ignore camelcase
  client_id: string;
  scope?: string;
}

export interface IGitHubGetUserCodeResponseOK {
  // deno-lint-ignore camelcase
  device_code: string;
  // deno-lint-ignore camelcase
  user_code: string;
  // deno-lint-ignore camelcase
  verification_uri: string;
  // deno-lint-ignore camelcase
  expires_in: number;
  interval: number;
}

export type GitHubGetUserCodeResponse =
  | IGitHubGetUserCodeResponseOK
  | IGitHubResponseError;

export interface IGitHubPollAuthPayload {
  // deno-lint-ignore camelcase
  client_id: string;
  // deno-lint-ignore camelcase
  device_code: string;
  // deno-lint-ignore camelcase
  grant_type: "urn:ietf:params:oauth:grant-type:device_code";
}

export interface IGitHubPollAuthResponseOK {
  // deno-lint-ignore camelcase
  access_token: string;
  // deno-lint-ignore camelcase
  token_type: "bearer";
  scope: string;
}

export type GitHubPollAuthResponse =
  | IGitHubPollAuthResponseOK
  | IGitHubResponseError;

export type PollOptions = {
  interval: number;
  expiresIn: number;
};
