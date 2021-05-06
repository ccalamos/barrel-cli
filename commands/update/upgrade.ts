import { dirname, join } from "https://deno.land/std@0.95.0/path/mod.ts";
import { existsSync } from "https://deno.land/std@0.95.0/fs/exists.ts";
import { getVersion } from "../../utils/version.ts";

export default async function () {
  console.log("Looking up latest version...");

  const versionMetaUrl = "https://cdn.deno.land/barrel-cli/meta/versions.json";
  const { latest } = await (await fetch(versionMetaUrl)).json();

  if (latest === getVersion(true)) {
    console.log("Already up-to-date!");
    Deno.exit(0);
  }

  const denoExecPath = Deno.execPath();
  const cmdExists = existsSync(join(dirname(denoExecPath), "barrel"));
  const p = Deno.run({
    cmd: [
      denoExecPath,
      "install",
      "-A",
      "--unstable",
      "--import-map",
      "https://deno.land/x/barrel-cli@${latest}/import_map.json",
      "-n",
      "barrel",
      "-f",
      `https://deno.land/x/barrel-cli@${latest}/cli.ts`,
    ],
    stdout: "null",
    stderr: "inherit",
  });
  const status = await p.status();
  if (status.success) {
    if (cmdExists) {
      console.log(`Barrel-CLI is up to ${latest}`);
    } else {
      console.log("Barrel-CLI was installed successfully");
      console.log(`Run 'barrel -h' to get started`);
    }
  }
  Deno.exit(status.code);
}