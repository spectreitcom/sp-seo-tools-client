import clsx from "clsx";
import SelectDropdownIcon from "./select-dropdown-icon.tsx";
import { Option } from "./types.ts";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { forwardRef } from "react";

type Props = {
  onClick: () => void;
  option: Option | null | undefined;
  clearable?: boolean;
  onClear?: () => void;
  placeholderText?: string;
  disabled?: boolean;
  error?: string;
};

const SelectHeader = forwardRef<HTMLDivElement, Props>(function SelectHeader(
  { onClick, option, clearable, onClear, placeholderText, disabled, error },
  ref,
) {
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={clsx(
        "h-10 rounded-md bg-white py-1.5 pr-3 pl-3 text-base outline-1 -outline-offset-1 sm:text-sm/6 text-gray-900 outline-gray-300 text-left",
        !disabled && "cursor-pointer",
        "flex justify-between items-center",
        "relative",
        disabled && "opacity-50 pointer-events-none",
        error && "text-red-900 outline-red-600",
        "data-select-focus:outline-2 data-select-focus:-outline-2 data-select-focus:outline-indigo-600",
      )}
    >
      {!option && placeholderText && (
        <div className={"text-gray-400"}>{placeholderText}</div>
      )}
      <div>{option ? option.label : ""}</div>
      <div className={"flex items-center"}>
        {error && (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 size-5 self-center justify-self-end text-red-500 sm:size-4 mr-2"
          />
        )}
        {clearable && option && (
          <XMarkIcon
            className={"size-4 mr-2"}
            onClick={(e) => {
              e.stopPropagation();
              onClear?.();
            }}
          />
        )}
        <SelectDropdownIcon className={"size-5"} />
      </div>
    </div>
  );
});

export default SelectHeader;
