import LoginCommand from "./login/index.ts";
import CreateCommand from "./create/index.ts";
import UpgradeCommand from "./upgrade/index.ts";
import LogoutCommand from "./logout/index.ts";

export default [
  LoginCommand.enable(),
  LogoutCommand.enable(),
  CreateCommand.enable(),
  UpgradeCommand.enable(),
].sort(([a], [b]) => a.localeCompare(b));
