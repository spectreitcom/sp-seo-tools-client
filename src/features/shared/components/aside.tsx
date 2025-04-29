import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { BarsArrowUpIcon, ChartBarSquareIcon } from "@heroicons/react/16/solid";
import { useAside } from "../hooks/use-aside.ts";
import Logo from "./logo.tsx";

const navigation = [
  { name: "Dashboard", to: "/", icon: HomeIcon, current: false },
  {
    name: "Rank Tracker",
    to: "/rank-tracker",
    icon: BarsArrowUpIcon,
    current: false,
  },
  {
    name: "Serp Analyzer",
    to: "/serp-analyzer",
    icon: ChartBarSquareIcon,
    current: false,
  },
];
function Aside() {
  const { asideMenuOpen, toggleAsideMenu } = useAside();

  return (
    <>
      <Dialog
        open={asideMenuOpen}
        onClose={toggleAsideMenu}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => toggleAsideMenu()}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                {/*<img*/}
                {/*  alt="Your Company"*/}
                {/*  src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"*/}
                {/*  className="h-8 w-auto"*/}
                {/*/>*/}
                <Logo />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <NavLink
                            to={item.to}
                            className={clsx(
                              "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                              // active
                              "[.active]:bg-gray-50 [.active]:text-indigo-600",
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={clsx(
                                "text-gray-400 group-hover:text-indigo-600",
                                "size-6 shrink-0",
                                // active
                                "group-[.active]:text-indigo-600",
                              )}
                            />
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <a
                      href="#"
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    >
                      <Cog6ToothIcon
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                      />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            {/*<img*/}
            {/*  alt="Your Company"*/}
            {/*  src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"*/}
            {/*  className="h-8 w-auto"*/}
            {/*/>*/}
            <Logo />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.to}
                        className={clsx(
                          "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold peer",
                          // active
                          "[.active]:bg-gray-50 [.active]:text-indigo-600",
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={clsx(
                            "text-gray-400 group-hover:text-indigo-600",
                            "size-6 shrink-0",
                            // active
                            "group-[.active]:text-indigo-600",
                          )}
                        />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <a
                  href="#"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                  />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Aside;
