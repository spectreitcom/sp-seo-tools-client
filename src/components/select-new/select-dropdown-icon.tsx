import { ComponentProps } from "react";
import clsx from "clsx";

type Props = ComponentProps<"svg">;

function SelectDropdownIcon({ className, ...rest }: Props) {
  return (
    <svg
      className={clsx(
        "stroke-zinc-500 group-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]",
        className,
      )}
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      {...rest}
    >
      <path
        d="M5.75 10.75L8 13L10.25 10.75"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.25 5.25L8 3L5.75 5.25"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SelectDropdownIcon;
