import { Command as CLIMod } from "cliffy/command/mod.ts";
import type { ICommand } from "types";

export default class Command<Arguments extends string[]>
  implements ICommand<Arguments> {
  public name!: string;
  public description!: string;
  public action!: (args: Arguments) => void;
  public arguments: Arguments;
  private mod: CLIMod<void, Arguments>;

  constructor(name: string, options: Omit<ICommand<Arguments>, "name">) {
    this.name = name;
    this.description = options.description;
    this.action = options.action;
    this.arguments = (options.arguments ?? []) as Arguments;
    this.mod = new CLIMod<void, Arguments>();
  }

  enable(): [name: string, command: CLIMod] {
    if (this.arguments.length) {
      this.mod.arguments(this.arguments.join(" "));
    }

    this.mod.description(this.description);
    this.mod.action((_options, ...args) => this.action(args as Arguments));

    return [this.name, this.mod];
  }
}
