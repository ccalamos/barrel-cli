import CreateAction from "./create.ts";
import Command from "../command.ts";

export type CreateArguments = [] | [workspace_name: string];

const CreateCommand = new Command<CreateArguments>("create", {
  description: "Create a new barrel workspace",
  arguments: ["[workspace_name]"],
  action: CreateAction,
});

export default CreateCommand;
