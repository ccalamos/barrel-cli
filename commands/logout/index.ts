import LogoutAction from "./logout.ts";
import Command from "../command.ts";

const LogoutCommand = new Command<[]>("logout", {
  description: "Logout of GitHub",
  action: LogoutAction,
});

export default LogoutCommand;
