import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

type Props = ComponentProps<"button"> & {
  icon?: ReactNode;
  children: ReactNode;
};

function LinkBtn({ children, icon, className, ...rest }: Props) {
  return (
    <button
      className={clsx(
        "cursor-pointer text-sm flex flex-nowrap items-center hover:text-indigo-500 focus-visible:outline-indigo-600 text-indigo-600 font-bold",
        className,
      )}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export default LinkBtn;
