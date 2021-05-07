import { IVersion, ValidVersion } from "../types.ts";

const VERSION_INFO: IVersion = {
  year: "21",
  month: "05",
  minor: "0",
  patch: "11",
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
  console.log(getVersion());
}
