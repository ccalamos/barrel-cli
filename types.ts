type _Num = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";

export interface ICommand {
  name: string;
  description: string;
  action: () => void;
  arguments?: string[];
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

export interface IGitHubGetUserCodePayload {
  // deno-lint-ignore camelcase
  client_id: string;
  scope?: string;
}

export interface IGitHubGetUserCodeResponse {
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

export interface IGitHubPollAuthPayload {
  // deno-lint-ignore camelcase
  client_id: string;
  // deno-lint-ignore camelcase
  device_code: string;
  // deno-lint-ignore camelcase
  grant_type: "urn:ietf:params:oauth:grant-type:device_code";
}

export interface IGitHubPollAuthResponse {
  // deno-lint-ignore camelcase
  access_token: string;
  // deno-lint-ignore camelcase
  token_type: "bearer";
  scope: string;
}
