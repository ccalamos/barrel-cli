import Command from "../command.ts";

import { Store } from "utils";

const LogoutCommand = new Command<[]>("logout", {
  description: "Logout of GitHub",
  action: (): void => {
    const authConfigKeys = ["accessToken", "username", "name"];
    authConfigKeys.forEach((key: string) => Store.remove(key));

    console.log("Successfully logged out!");
  },
});

export default LogoutCommand;
