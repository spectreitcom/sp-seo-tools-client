import { classNames } from "../utils/class-names.ts";
import { ReactNode } from "react";
import { Transition, TransitionChild } from "@headlessui/react";

type Props = {
  contentClassName?: string;
  open: boolean;
  title?: string;
  footerAddon?: ReactNode;
  children?: ReactNode;
  onClose: () => void;
};

function AsideModal({
  contentClassName,
  footerAddon,
  title,
  children,
  open,
  onClose,
}: Props) {
  const contentClasses = classNames(
    "absolute top-0 right-0 bottom-0 w-full lg:w-[33%] bg-white shadow flex flex-col justify-between",
    contentClassName,
  );

  return (
    <Transition show={open}>
      <div className={"fixed top-0 left-0 bottom-0 right-0 z-50"}>
        <TransitionChild
          enter={"transition-opacity ease-in-out duration-200"}
          enterFrom={"opacity-0"}
          enterTo={"opacity-100"}
          leave="transition-opacity ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={"bg-black/35 absolute top-0 right-0 bottom-0 left-0"}
            onClick={onClose}
          />
        </TransitionChild>
        <TransitionChild
          enter={"transition-transform ease-in-out duration-200"}
          enterFrom={"translate-x-full"}
          enterTo={"translate-x-0"}
          leave="transition-transform ease-linear duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className={contentClasses}>
            {title && (
              <header className={"shadow py-8 px-4"}>
                <h3 className={"text-xl font-semibold"}>{title}</h3>
              </header>
            )}
            <div className={"flex-grow shadow overflow-auto p-4"}>
              {children}
            </div>
            {footerAddon && <footer className={"p-4"}>{footerAddon}</footer>}
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
}

export default AsideModal;
