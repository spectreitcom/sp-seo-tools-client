import { ReactNode } from "react";
import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/16/solid";

type Props = Readonly<{
  children: ReactNode;
  selected?: boolean;
  onSelect: () => void;
}>;

function SelectOption({ children, selected, onSelect }: Props) {
  return (
    <div
      className={clsx(
        "hover:bg-gray-100",
        "cursor-pointer",
        "p-2 rounded-md text-sm",
        "flex justify-between items-center",
        selected && "bg-gray-100",
      )}
      onClick={onSelect}
    >
      <span className={"text-sm text-zinc-950"}>{children}</span>
      {selected && (
        <span>
          <CheckIcon className={"size-3"} />
        </span>
      )}
    </div>
  );
}

export default SelectOption;
