export async function open(url: string): Promise<Deno.ProcessStatus> {
  const programAliases: Record<symbol | string, string> = {
    windows: "explorer",
    darwin: "open",
    linux: "sensible-browser",
  };

  const process = Deno.run({ cmd: [programAliases[Deno.build.os], url] });
  return await process.status();
}
