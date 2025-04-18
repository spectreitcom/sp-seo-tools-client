import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import { useEffect, useId } from "react";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import moment from "moment";
import Label from "../label.tsx";
import "./date-picker.css";

type Props = Readonly<{
  className?: string;
  error?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  mode?: "single" | "multiple" | "range";
  onChange?: (dates: string[]) => void;
  defaultEmittedDateFormat?: string;
  values?: string[];
  minDate?: string;
  maxDate?: string;
}>;

function DatePicker({
  className,
  error,
  label,
  placeholder,
  disabled,
  mode = "single",
  onChange,
  defaultEmittedDateFormat = "YYYY-MM-DD",
  minDate,
  maxDate,
  values,
}: Props) {
  const inputId = useId();

  const getInputId = () => {
    return inputId.split(":")[1];
  };

  const inputClasses = clsx(
    "h-10 col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6 text-gray-900 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600",
    error &&
      "text-red-900 outline-red-300 focus:outline-red-600 placeholder:text-red-300",
  );

  useEffect(() => {
    const flatpickrInstance = flatpickr(`#${getInputId()}`, {
      mode,
      minDate,
      maxDate,
      onChange: [
        function (selectedDates) {
          const dateStrings: string[] = [];

          for (const selectedDate of selectedDates) {
            dateStrings.push(
              moment(selectedDate).format(defaultEmittedDateFormat),
            );
          }

          if (mode === "range" && selectedDates.length !== 2) return;
          onChange?.(dateStrings);
        },
      ],
    });

    if (values?.length && !Array.isArray(flatpickrInstance)) {
      if (mode === "single") {
        flatpickrInstance.setDate(values[0]);
      } else {
        flatpickrInstance.setDate(values);
      }
    }

    return () => {
      if (!Array.isArray(flatpickrInstance)) {
        flatpickrInstance.destroy();
      }
    };
  }, [values]);

  return (
    <div className={className}>
      <Label text={label} id={getInputId()} />
      <div className="grid grid-cols-1">
        <input
          id={getInputId()}
          type="text"
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
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

export default DatePicker;
