import UpgradeAction from "./upgrade.ts";
import Command from "../command.ts";

const UpgradeCommand = new Command<[]>("upgrade", {
  description: "Upgrade barrel to latest version",
  action: async (): Promise<void> => await UpgradeAction(true),
});

export default UpgradeCommand;
