import { Command as CLIMod } from "https://deno.land/x/cliffy@v0.18.2/command/mod.ts";

import Commands from "./commands/index.ts";
import { Version } from "./utils/index.ts";

const Program = new CLIMod();
Program.name("barrel");
Program.version(Version.getVersion());
Program.description("Mono-Repo for Multi-Repos");
Program.allowEmpty(false);

Commands.forEach(([name, command]) => {
  Program.command(name, command);
});

export default Program;
