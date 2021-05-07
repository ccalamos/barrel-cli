import { Request } from "../../utils/index.ts";
import type {
  IGitHubGetUserCodePayload,
  IGitHubGetUserCodeResponse,
} from "../../types.ts";

const PAYLOAD: IGitHubGetUserCodePayload = {
  // deno-lint-ignore camelcase
  client_id: "44d84527b1f7f3af59ed",
};

export default async function (): Promise<IGitHubGetUserCodeResponse> {
  return await Request.post<IGitHubGetUserCodeResponse>(
    "https://github.com/login/device/code",
    PAYLOAD,
  );
}
