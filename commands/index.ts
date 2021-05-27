import LoginCommand from "./login/index.ts";
import CreateCommand from "./create/index.ts";
import UpdateCommand from "./update/index.ts";
import LogoutCommand from "./logout/index.ts";

export default [
  LoginCommand.enable(),
  LogoutCommand.enable(),
  CreateCommand.enable(),
  UpdateCommand.enable(),
].sort(([a], [b]) => a.localeCompare(b));
