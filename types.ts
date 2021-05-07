type _Num = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";

export interface ICommand {
  name: string;
  description: string;
  action: () => void;
  arguments?: string[];
}

export interface IVersion {
  year: `${_Num}${_Num}`;
  month: `${_Num}${_Num}`;
  minor: `${number}`;
  patch: `${number}`;
  separator: ".";
  prefix: "" | "v";
}

export type ValidVersion =
  `${IVersion["prefix"]}${IVersion["year"]}${IVersion["separator"]}${IVersion[
    "month"
  ]}${IVersion["separator"]}${IVersion["minor"]}${IVersion[
    "separator"
  ]}${IVersion["patch"]}`;
