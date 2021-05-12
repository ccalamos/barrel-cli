import { Command as CLIMod } from "cliffy/command/mod.ts";

import Commands from "commands/index.ts";
import { getVersion } from "utils";

const Program = new CLIMod();
Program.name("barrel");
Program.version(getVersion());
Program.description("Mono-Repo for Multi-Repos");
Program.allowEmpty(false);

Commands.forEach(([name, command]) => {
  Program.command(name, command);
});

export default Program;
