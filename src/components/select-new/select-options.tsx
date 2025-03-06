import { forwardRef, ReactNode } from "react";
import clsx from "clsx";
import Spinner from "../loader/spinner.tsx";
import SelectNoOptionsPlaceholder from "./select-no-options-placeholder.tsx";

type Props = {
  children: ReactNode[];
  loading?: boolean;
  searchable?: boolean;
  open: boolean;
  noOptionsText?: string;
  customPlaceholder?: ReactNode;
  onSearch?: (searchText: string) => void;
};

const SelectOptions = forwardRef<HTMLInputElement, Props>(
  function SelectOptions(
    {
      children,
      loading,
      searchable,
      open,
      noOptionsText,
      customPlaceholder,
      onSearch,
    },
    ref,
  ) {
    if (!open) return null;

    return (
      <div
        className={clsx(
          "absolute top-12",
          "rounded-md",
          "bg-white",
          "w-full",
          "shadow-md",
          "p-2",
        )}
      >
        {searchable && (
          <div className={"relative"}>
            <input
              ref={ref}
              type="text"
              className={clsx("w-full", "p-2")}
              placeholder={"Search..."}
              onChange={(e) => onSearch?.(e.target.value)}
            />
            {loading && (
              <span className={"absolute top-1/2 right-4 -translate-y-1/2"}>
                <Spinner borderWidth={3} width={20} />
              </span>
            )}
          </div>
        )}
        {children.length ? (
          <div
            className={"overflow-auto h-full max-h-36 flex flex-col gap-y-1"}
          >
            {children}
          </div>
        ) : customPlaceholder ? (
          customPlaceholder
        ) : (
          <SelectNoOptionsPlaceholder noOptionsText={noOptionsText} />
        )}
      </div>
    );
  },
);

export default SelectOptions;
