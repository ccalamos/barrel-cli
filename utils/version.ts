import type { IVersion, ValidVersion } from "types";

const VERSION_INFO: IVersion = {
  year: "21",
  month: "05",
  minor: "1",
  patch: "0",
  separator: ".",
  prefix: "v",
};

export function getVersion(usePrefix = false): ValidVersion {
  const { year, month, minor, patch, prefix: v, separator: _ } = {
    ...VERSION_INFO,
    ...{ prefix: usePrefix && VERSION_INFO["prefix"] || "" },
  } as IVersion;

  return `${v}${year}${_}${month}${_}${minor}${_}${patch}` as ValidVersion;
}

if (import.meta.main) {
  console.log(getVersion(["--prefix", "-p"].includes(Deno.args[0])));
}
