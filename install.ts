if (import.meta.main) {
  const installProcess = Deno.run({
    cmd: [
      Deno.execPath(),
      "run",
      "-A",
      `--import-map=./import_map.json`,
      `./commands/upgrade/upgrade.ts`,
    ],
    stdout: "inherit",
    stderr: "inherit",
  });
  const status = await installProcess.status();

  Deno.exit(status.code);
}
