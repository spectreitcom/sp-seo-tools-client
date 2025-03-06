import { ComponentProps, useId } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Label from "./label.tsx";

type Props = ComponentProps<"input"> & {
  label?: string;
  error?: string | null | undefined;
};

function Input({ disabled, className, label, error, ...rest }: Props) {
  const id = useId();

  const classes = clsx(
    "h-10 col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600",
    error &&
      "text-red-900 outline-red-300 focus:outline-red-600 placeholder:text-red-300",
    className,
  );

  return (
    <div>
      <Label text={label} />
      <div className="grid grid-cols-1">
        <input
          id={id}
          className={classes}
          disabled={disabled}
          {...rest}
          autoComplete={"off"}
        />
        {error && (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
          />
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Input;
