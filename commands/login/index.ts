import Command from "../command.ts";
import getUserCode from "./getUserCode.ts";
import promptOpen from "./promptOpen.ts";
import pollAuth from "./pollAuth.ts";

import { Store } from "utils";
import { tty } from "cliffy/ansi/mod.ts";

const LoginCommand = new Command("login", {
  description: "Login to GitHub",
  action: async (): Promise<void> => {
    const { access_token: accessToken } = await getUserCode().then(
      (response) => {
        promptOpen(response.user_code, response.verification_uri);
        return pollAuth(
          response.device_code,
          response.interval,
          response.expires_in,
        );
      },
    ).catch((reason) => {
      console.error(reason.message);
      Deno.exit(1);
    });

    Store.set("accessToken", accessToken);
    tty.clearScreen();
    console.log("Logged in succesfully!");
  },
});

export default LoginCommand;
