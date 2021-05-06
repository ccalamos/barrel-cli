import Command from '../command.ts';

const CreateCommand = new Command('create', {
  description: 'Create a new barrel workspace',
  arguments: ["[workspace_name]"],
  action: () => console.log('hello from create')
});

export default CreateCommand;
