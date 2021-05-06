import { IVersion, ValidVersion } from "../types.ts";

const CURRENT_DATE = new Date();
const VERSION_INFO: IVersion = {
  year: CURRENT_DATE.getFullYear().toString().slice(2) as IVersion["year"],
  month: (CURRENT_DATE.getMonth() + 1).toString().padStart(
    2,
    "0",
  ) as IVersion["month"],
  minor: "0",
  patch: "2",
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
