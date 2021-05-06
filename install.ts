import InstallOrUpgrade from "./commands/update/upgrade.ts";

if (import.meta.main) {
  await InstallOrUpgrade();
}
