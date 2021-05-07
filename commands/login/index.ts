import Command from "../command.ts";
import getUserCode from "./getUserCode.ts";
import promptOpen from "./promptOpen.ts";

const LoginCommand = new Command("login", {
  description: "Login to GitHub",
  action: async (): Promise<void> => {
    await getUserCode().then((response) => {
      /**
       *
       * Promise Race
       *
       * Show user prompt
       *
       * Setup Polling call to GitHub
       * Setup TimeOut to fail
       * Setup Promise Race to see which one will resolve first
       *
       */
      return promptOpen(response);
    });
  },
});

export default LoginCommand;
