import type { CreateArguments } from "./index.ts";

// deno-lint-ignore camelcase
export default function create([workspace_name]: CreateArguments): void {
  console.log("Hello world,", workspace_name);
}
