import { dirname, join } from "https://deno.land/std@0.95.0/path/mod.ts";
import { existsSync } from "https://deno.land/std@0.95.0/fs/exists.ts";
import { getVersion } from "../../utils/version.ts";

export default async function (isUpdate = false) {
  console.log("Looking up latest version...");

  const versionMetaUrl = "https://cdn.deno.land/barrel/meta/versions.json";
  const { latest } = await (await fetch(versionMetaUrl)).json();

  const denoExecPath = Deno.execPath();

  if (isUpdate && latest === getVersion()) {
    console.log("Already up-to-date!");
    Deno.exit(0);
  }

  try {
    const p = Deno.run({
      cmd: [
        denoExecPath,
        "install",
        "-A",
        "--unstable",
        "--location",
        "http://0.0.0.0/",
        "-n",
        "barrel",
        "-f",
        `https://deno.land/x/barrel@${latest}/cli.ts`,
      ],
      stdout: "null",
      stderr: "inherit",
    });
    const status = await p.status();
    if (status.success) {
      if (isUpdate) {
        console.log(`Barrel-CLI is updated to ${latest}!`);
      } else {
        console.log("Barrel-CLI was installed successfully!");
        console.log(`Run 'barrel -h' to get started.`);
      }
    }
    Deno.exit(status.code);
  } catch (e) {
    console.log(e);
  }
}
