import type { FilePath, ValidVersion } from "types";
import { getVersion } from "utils";

function getBarrelURI(version: ValidVersion, filePath: FilePath) {
  return `https://deno.land/x/barrel@${version}/${filePath}`;
}

export default async function upgradeCLI(isUpdate = false): Promise<void> {
  console.log("Looking up latest version...");

  const versionMetaUrl = "https://cdn.deno.land/barrel/meta/versions.json";
  const { latest } = await (await fetch(versionMetaUrl)).json();

  const denoExecPath = Deno.execPath();

  if (isUpdate && latest === getVersion()) {
    console.log("Already up-to-date!");
    Deno.exit(0);
  }

  const subProcess = Deno.run({
    cmd: [
      denoExecPath,
      "install",
      "-A",
      "--unstable",
      `--import-map=${getBarrelURI(latest, "import_map.json")}`,
      "--location",
      "http://0.0.0.0/",
      "-n",
      "barrel",
      "-f",
      getBarrelURI(latest, "cli.ts"),
    ],
    stdout: "null",
    stderr: "inherit",
  });
  const status = await subProcess.status();
  if (status.success) {
    if (isUpdate) {
      console.log(`Barrel-CLI is updated to ${latest}!`);
    } else {
      console.log("Barrel-CLI was installed successfully!");
      console.log(`Run 'barrel -h' to get started.`);
    }
  }
  Deno.exit(status.code);
}

if (import.meta.main) {
  upgradeCLI(false);
}
