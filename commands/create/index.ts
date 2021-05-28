import Command from "../command.ts";

const CreateCommand = new Command<[workspace_name: string] | []>("create", {
  description: "Create a new barrel workspace",
  arguments: ["[workspace_name]"],
  action: ([workspace_name]) =>
    console.log("hello from create (args: ", workspace_name, ")"),
});

export default CreateCommand;
