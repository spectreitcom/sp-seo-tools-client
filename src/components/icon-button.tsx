import { ComponentProps, ReactNode } from "react";
import { classNames } from "../utils/class-names.ts";

type Props = ComponentProps<"button"> & {
  size: "sm" | "md" | "lg";
  color: "primary" | "danger";
  icon: ReactNode;
};

function IconButton({
  className,
  size,
  color,
  disabled,
  icon,
  ...rest
}: Props) {
  const classes = classNames(
    "rounded-full shadow-xs cursor-pointer",
    size === "sm" && "p-1",
    size === "md" && "p-1.5",
    size === "lg" && "p-2",
    color === "primary" && "text-white bg-indigo-600 hover:bg-indigo-500",
    color === "danger" && "text-white bg-red-600 hover:bg-red-500",
    disabled && "cursor-not-allowed opacity-50",
    className,
  );

  return (
    <button type="button" className={classes} {...rest}>
      {icon}
    </button>
  );
}

export default IconButton;
