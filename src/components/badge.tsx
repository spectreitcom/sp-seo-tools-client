import { ComponentProps } from "react";
import clsx from "clsx";

type Props = Omit<ComponentProps<"div">, "color"> & {
  text?: string | number | null;
  color?: "primary" | "warning" | "danger" | "success" | "info";
};

function Badge({ className, text, color = "primary", ...rest }: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-inset",
        // primary
        color === "primary" && "bg-gray-50 text-gray-600 ring-gray-500/10",
        // warning
        color === "warning" &&
          "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
        // danger
        color === "danger" && "bg-red-50 text-red-700 ring-red-600/10",
        // success
        color === "success" && "bg-green-50 text-green-700 ring-green-600/20",
        // info
        color === "info" && "bg-indigo-50 text-indigo-700 ring-indigo-700/10",
        className,
      )}
      {...rest}
    >
      {text}
    </span>
  );
}

export default Badge;
