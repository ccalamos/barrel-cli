import { Command as CLIMod } from "https://deno.land/x/cliffy@v0.18.2/command/mod.ts";
import type { ICommand } from "../types.ts";

export default class Command implements ICommand {
  public name!: string;
  public description!: string;
  public action!: () => void;
  public arguments: string[];
  private mod: CLIMod;

  constructor(name: string, options: Omit<ICommand, "name">) {
    this.name = name;
    this.description = options.description;
    this.action = options.action;
    this.arguments = options.arguments ?? [];
    this.mod = new CLIMod();
  }

  enable(): [name: string, command: CLIMod] {
    if (this.arguments.length) {
      this.mod.arguments(this.arguments.join(" "));
    }

    this.mod.description(this.description);
    this.mod.action(this.action);

    return [this.name, this.mod];
  }
}
