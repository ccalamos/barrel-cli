import { Command as CLIMod } from "cliffy/command/mod.ts";
import type { ICommand } from "types";

export default class Command implements ICommand {
  public name!: string;
  public description!: string;
  public action!: (args: string[]) => void;
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
    this.mod.action((_options, ...args) => this.action(args));

    return [this.name, this.mod];
  }
}
