import { ComponentProps } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Button from "./button.tsx";

type Props = ComponentProps<"div"> & {
  onAction: () => void;
  heading: string;
  description: string;
  actionText: string;
};

function EmptyTablePlaceholder({
  className,
  onAction,
  actionText,
  heading,
  description,
  ...rest
}: Props) {
  const containerClasses = clsx(
    "text-center py-16 rounded-md bg-gray-100    ",
    className,
  );

  return (
    <div className={containerClasses} {...rest}>
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mx-auto size-12 text-gray-400"
      >
        <path
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{heading}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6 flex justify-center">
        <Button size={"xl"} onClick={onAction}>
          <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
          {actionText}
        </Button>
      </div>
    </div>
  );
}

export default EmptyTablePlaceholder;
