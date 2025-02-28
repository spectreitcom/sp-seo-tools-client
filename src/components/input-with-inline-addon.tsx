import { ComponentProps, ReactNode, useId } from "react";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

type Props = ComponentProps<"input"> & {
  label?: string;
  error?: string | null | undefined;
  leadingAddon?: string | ReactNode;
  trailingAddon?: string | ReactNode;
};

function InputWithInlineAddon({
  label,
  error,
  disabled,
  leadingAddon,
  trailingAddon,
  ...rest
}: Props) {
  const id = useId();

  const classes = clsx(
    "flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600",
    error &&
      "outline-red-300 focus:outline-red-600 placeholder:text-red-300 focus-within:outline-red-600",
  );

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <div className={classes}>
          {leadingAddon && (
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
              {leadingAddon}
            </div>
          )}
          <input
            id={id}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            disabled={disabled}
            {...rest}
          />
          {trailingAddon && (
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6 mr-3">
              {trailingAddon}
            </div>
          )}
          {error && (
            <ExclamationCircleIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
            />
          )}
        </div>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default InputWithInlineAddon;
