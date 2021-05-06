import LoginCommand from "./login/index.ts";
import CreateCommand from "./create/index.ts";
import UpdateCommand from "./update/index.ts";

export default [
  LoginCommand.enable(),
  CreateCommand.enable(),
  UpdateCommand.enable(),
].sort(([a], [b]) => a.localeCompare(b));
