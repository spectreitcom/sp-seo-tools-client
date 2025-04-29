import { useId } from "react";
import clsx from "clsx";

type Props = Readonly<{
  checked?: boolean;
  label?: string;
  onChange?: () => void;
  className?: string;
}>;

function Checkbox({ checked, label, onChange, className }: Props) {
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={clsx(
        "flex items-center cursor-pointer select-none group",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => onChange?.()}
        className="hidden peer"
      />
      <span className="w-4 h-4 border-1 border-gray-400 rounded flex items-center justify-center transition-all duration-300 peer-checked:bg-indigo-600 peer-checked:border-indigo-600">
        <svg
          className={clsx(
            "w-10 h-10 text-white opacity-0 transition-opacity duration-300",
            checked && "opacity-100",
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M20.292 5.292a1 1 0 011.416 1.416l-11 11a1 1 0 01-1.416 0l-5-5a1 1 0 011.416-1.416L10 15.586l10.292-10.294z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      {label && (
        <span className="ml-2 text-sm text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
          {label}
        </span>
      )}
    </label>
  );
}

export default Checkbox;
