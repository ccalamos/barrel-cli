import { post } from "utils";
import type {
  IGitHubGetUserCodePayload,
  IGitHubGetUserCodeResponse,
} from "types";

const PAYLOAD: IGitHubGetUserCodePayload = {
  // deno-lint-ignore camelcase
  client_id: "44d84527b1f7f3af59ed",
};

export default async function (): Promise<IGitHubGetUserCodeResponse> {
  return await post<IGitHubGetUserCodeResponse>(
    "https://github.com/login/device/code",
    PAYLOAD,
  );
}
