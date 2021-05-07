import { IGitHubGetUserCodeResponse } from "../../types.ts";
import { Open } from "../../utils/index.ts";

function getPrompt(code: string): Uint8Array {
  return new TextEncoder().encode([
    "Allow `barrel` to access GitHub.",
    "Please copy the code below and paste it into the redirect.",
    `User Code: ${code}`,
    "",
    "Press Enter to Open GitHub:",
  ].join("\n"));
}

export default async function (
  gResponse: Pick<IGitHubGetUserCodeResponse, "user_code" | "verification_uri">,
) {
  await Deno.stdout.write(getPrompt(gResponse.user_code));
  await Deno.stdin.read(new Uint8Array(1024));
  const status = await Open.url(gResponse.verification_uri);

  if (!status.success) {
    console.log("Failed to open GitHub...");
    console.log(
      `Please navigate in your browser to \`${gResponse.verification_uri}\``,
    );
  }
}
