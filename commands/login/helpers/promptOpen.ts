import { open } from "utils";

function getPrompt(code: string): Uint8Array {
  return new TextEncoder().encode([
    "Allow `barrel` to access GitHub.",
    "Please copy the code below and paste it into the redirect.",
    `User Code: ${code}`,
    "",
    "Press Enter to Open the GitHub Redirect:",
  ].join("\n"));
}

export default async function (
  userCode: string,
  verificationURI: string,
) {
  await Deno.stdout.write(getPrompt(userCode));
  await Deno.stdin.read(new Uint8Array(1024));
  const status = await open(verificationURI);
  console.log("Waiting for response from GitHub...");

  if (!status.success) {
    console.log("Failed to open GitHub...");
    console.log(
      `Please navigate in your browser to \`${verificationURI}\``,
    );
  }
}
