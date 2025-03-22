import { GlobeAltIcon, PlusIcon } from "@heroicons/react/16/solid";
import { ComponentProps } from "react";
import clsx from "clsx";
import Button from "../ui/button.tsx";

type Props = ComponentProps<"div"> & {
  onAction: () => void;
};

function NoDomainsPlaceholder({ className, onAction, ...rest }: Props) {
  const containerClasses = clsx(
    "text-center py-16 rounded-md bg-gray-100",
    className,
  );

  return (
    <div className={containerClasses} {...rest}>
      <GlobeAltIcon className={"mx-auto size-12 text-gray-400"} />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No domains</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new domain.
      </p>
      <div className="mt-6 flex justify-center">
        <Button size={"xl"} onClick={onAction}>
          <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
          New domain
        </Button>
      </div>
    </div>
  );
}

export default NoDomainsPlaceholder;
