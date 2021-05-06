import { Command as CLIMod } from 'cliffy/command/mod.ts';

import Commands from '/commands/index.ts';
import { Version } from 'utils/index.ts';

const Program = new CLIMod();
Program.name("barrel");
Program.version(Version.getVersion());
Program.description("Mono-Repo for Multi-Repos");

Commands.forEach((command) => {
  Program.command(command[0], command[1]);
});

export default Program;
