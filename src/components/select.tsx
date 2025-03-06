import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  ListboxSelectedOption,
} from "@headlessui/react";
import clsx from "clsx";
import { ReactNode } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

export type SelectOption = {
  value: string | number;
  label: string | number;
};

function Placeholder({ text }: { text?: string }) {
  return <span>{text}</span>;
}

function DropdownIcon() {
  return (
    <svg
      className="size-5 stroke-zinc-500 group-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]"
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
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

type Props<T> = {
  value: T | null | undefined | string;
  onChange: (value: T) => void;
  label?: string;
  className?: string;
  options: T[];
  renderOptionAs?: (option: T) => ReactNode;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
};

/**
 * @deprecated
 * @param value
 * @param onChange
 * @param label
 * @param className
 * @param options
 * @param renderOptionAs
 * @param placeholder
 * @param error
 * @param disabled
 * @constructor
 */

function Select<T extends SelectOption>({
  value,
  onChange,
  label,
  className,
  options,
  renderOptionAs,
  placeholder,
  error,
  disabled,
}: Props<T>) {
  const renderOptions = () => {
    return options.map((option) => {
      if (renderOptionAs) return renderOptionAs(option);
      return (
        <ListboxOption
          key={option.value}
          value={option}
          className={clsx(
            // Basic layout
            "group/option grid cursor-pointer grid-cols-[--spacing(5)_1fr] items-baseline gap-x-2 py-2.5 pr-3.5 pl-2 sm:grid-cols-[--spacing(4)_1fr] sm:py-1.5 sm:pr-3 sm:pl-1.5",
            // Typography
            "text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]",
            // Focus
            "outline-hidden data-focus:bg-indigo-600 data-focus:text-white",
            // Forced colors mode
            "forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText]",
            // Disabled
            "data-disabled:opacity-50",
          )}
        >
          {option.label}
        </ListboxOption>
      );
    });
  };

  const renderOptionsForSelected = () => {
    return options.map((option) => (
      <ListboxOption key={option.value} value={option.value}>
        {option.label}
      </ListboxOption>
    ));
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm/6 font-medium text-gray-900 mb-2">
          {label}
        </label>
      )}
      <div className={"relative"}>
        <Listbox value={value} onChange={onChange}>
          <ListboxButton
            disabled={disabled}
            className={clsx(
              "min-h-10",
              "col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 text-gray-900 outline-gray-300 focus:outline-indigo-600 text-left relative",
              error && "text-red-900 outline-red-300 focus:outline-red-600",
              "data-disabled:opacity-50 data-disabled:cursor-not-allowed",
            )}
          >
            <ListboxSelectedOption
              options={renderOptionsForSelected()}
              placeholder={<Placeholder text={placeholder} />}
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <DropdownIcon />
            </span>
            {error && (
              <ExclamationCircleIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 size-5 self-center justify-self-end text-red-500 sm:size-4"
              />
            )}
          </ListboxButton>
          <ListboxOptions
            className={clsx(
              "shadow rounded-md absolute right-0 left-0 bg-white max-h-36 z-10 overflow-scroll",
            )}
          >
            {renderOptions()}
          </ListboxOptions>
        </Listbox>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default Select;
