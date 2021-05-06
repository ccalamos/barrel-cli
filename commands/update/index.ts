import UpgradeAction from "./upgrade.ts";
import Command from "../command.ts";

const UpdateCommand = new Command("update", {
  description: "Update barrel to latest version",
  action: UpgradeAction,
});

export default UpdateCommand;
