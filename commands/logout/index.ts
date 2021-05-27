import Command from "../command.ts";

import { Store } from "utils";

const LogoutCommand = new Command("logout", {
  description: "Logout of GitHub",
  action: (): void => {
    Store.remove("accessToken");
    console.log("Successfully logged out!");
  },
});

export default LogoutCommand;
