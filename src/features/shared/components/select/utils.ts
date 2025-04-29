import { Option, SelectValue } from "./types.ts";

export const findOption = (value: SelectValue, options: Option[]) => {
  return options.find((option) => option.value === value);
};
