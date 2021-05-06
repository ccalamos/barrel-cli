import LoginCommand from './login/index.ts';
import CreateCommand from './create/index.ts';

export default [
  LoginCommand.enable(),
  CreateCommand.enable(),
].sort(([a], [b]) => a.localeCompare(b));
