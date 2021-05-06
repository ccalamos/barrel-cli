import Program from "./program.ts";

async function main(): Promise<void> {
  await Program.parse(Deno.args);
}

if (import.meta.main) {
  main();
}
