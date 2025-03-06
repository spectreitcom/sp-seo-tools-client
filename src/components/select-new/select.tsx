import clsx from "clsx";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import SelectHeader from "./select-header";
import SelectOptions from "./select-options.tsx";
import SelectOption from "./select-option.tsx";
import { Option, SelectValue } from "./types.ts";
import { findOption } from "./utils.ts";

type Props = {
  error?: string;
  className?: string;
  loading?: boolean;
  searchable?: boolean;
  options: Option[];
  value?: SelectValue;
  onChange?: (option: Option) => void;
  label?: string;
  clearable?: boolean;
  onClear?: () => void;
  noOptionsText?: string;
  customPlaceholder?: ReactNode;
  placeholderText?: string;
  disabled?: boolean;
  onSearch?: (searchText: string) => void;
  onOpen?: () => void;
  foundedOption?: Option | null;
};

function Select({
  className,
  loading,
  searchable,
  value,
  options,
  onChange,
  label,
  clearable,
  onClear,
  noOptionsText,
  customPlaceholder,
  placeholderText,
  disabled,
  onSearch,
  error,
  onOpen,
  foundedOption,
}: Props) {
  const [open, setOpen] = useState(false);

  const cachedOptions = useMemo(() => options, [options]);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (option: Option) => {
    setOpen(false);
    onChange?.(option);
  };

  useEffect(() => {
    if (open) {
      onOpen?.();
    }

    searchInputRef.current?.focus();

    const handleClick = (e: MouseEvent) => {
      if (open && !containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick, false);

    return () => {
      document.removeEventListener("click", handleClick, false);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={className}>
      {label && (
        <label className="block text-sm/6 font-medium text-gray-900 mb-2">
          {label}
        </label>
      )}
      <div className={clsx("relative w-full")}>
        <SelectHeader
          onClick={() => setOpen((prev) => !prev)}
          option={foundedOption ? foundedOption : findOption(value, options)}
          clearable={clearable}
          onClear={() => {
            onClear?.();
            setOpen(false);
          }}
          placeholderText={placeholderText}
          disabled={disabled}
          error={error}
        />
        <SelectOptions
          ref={searchInputRef}
          loading={loading}
          searchable={searchable}
          open={open}
          noOptionsText={noOptionsText}
          customPlaceholder={customPlaceholder}
          onSearch={onSearch}
        >
          {cachedOptions.map((option) => (
            <SelectOption
              key={option.value}
              option={option}
              selected={option.value === value}
              onSelect={() => handleSelect(option)}
            >
              {option.label}
            </SelectOption>
          ))}
        </SelectOptions>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Select;
