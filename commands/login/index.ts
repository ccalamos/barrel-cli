import LoginAction from "./login.ts";
import Command from "../command.ts";

const LoginCommand = new Command<[]>("login", {
  description: "Login to GitHub",
  action: LoginAction,
});

export default LoginCommand;
