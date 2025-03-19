import { ComponentProps } from "react";
import clsx from "clsx";
import Spinner from "./loader/spinner.tsx";

type Props = ComponentProps<"button"> & {
  size: "xs" | "sm" | "lg" | "xl" | "xxl";
  soft?: boolean;
  block?: boolean;
  loading?: boolean;
  color?: "primary" | "danger";
};

function Button({
  children,
  size = "sm",
  soft = false,
  block = false,
  className,
  disabled,
  loading,
  color = "primary",
  ...rest
}: Props) {
  const cssClasses = clsx(
    "rounded-sm font-semibold shadow-xs cursor-pointer flex items-center justify-center flex-nowrap",
    !soft &&
      color === "primary" &&
      "hover:bg-indigo-500 focus-visible:outline-indigo-600 bg-indigo-600 text-white",
    !soft &&
      color === "danger" &&
      "hover:bg-red-500 focus-visible:outline-red-600 bg-red-600 text-white",
    soft &&
      color === "primary" &&
      "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
    soft && color === "danger" && "bg-red-50 text-red-600 hover:bg-red-100",
    size === "sm" && "px-2 py-1 text-xs",
    size === "sm" && "px-2 py-1 text-sm",
    size === "lg" && "px-2.5 py-1.5 text-sm",
    size === "xl" && "px-3 py-2 text-sm",
    size === "xxl" && "px-3.5 py-2.5 text-sm",
    block && "w-full",
    className,
    // disabled state
    "disabled:opacity-50 disabled:cursor-not-allowed",
  );

  return (
    <button className={cssClasses} disabled={disabled || loading} {...rest}>
      {loading && (
        <span className={"mr-2"}>
          <Spinner borderWidth={2} width={15} />
        </span>
      )}
      {children}
    </button>
  );
}

export default Button;
