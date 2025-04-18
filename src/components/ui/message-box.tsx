import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import clsx from "clsx";

type Props = Readonly<{
  children?: ReactNode[];
  severity: "info" | "warning" | "error" | "success";
  text?: string;
  showCloseBtn?: boolean;
  onClose?: () => void;
}>;

function MessageBox({
  children,
  severity,
  text,
  showCloseBtn,
  onClose,
}: Props) {
  const containerClasses = clsx(
    // general
    "rounded-md p-4",
    // for severity
    severity === "info" && "bg-blue-50",
    severity === "warning" && "bg-yellow-50",
    severity === "error" && "bg-red-50",
    severity === "success" && "bg-green-50",
  );

  const textClasses = clsx(
    // general
    "text-sm font-medium",
    // for severity
    severity === "info" && "text-blue-800",
    severity === "warning" && "text-yellow-600",
    severity === "error" && "text-red-800",
    severity === "success" && "text-green-800",
  );

  const btnClasses = clsx(
    "inline-flex rounded-md p-1.5 focus:ring-2 focus:ring-offset-2 focus:outline-hidden",
    severity === "info" &&
      "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50",
    severity === "warning" &&
      "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50",
    severity === "error" &&
      "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50",
    severity === "success" &&
      "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50",
  );

  return (
    <div className={containerClasses}>
      <div className="flex">
        <div className="shrink-0">
          {severity === "success" && (
            <CheckCircleIcon
              aria-hidden="true"
              className="size-5 text-green-400"
            />
          )}
          {severity === "warning" && (
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="size-5 text-yellow-400"
            />
          )}
          {severity === "info" && (
            <InformationCircleIcon
              aria-hidden="true"
              className="size-5 text-blue-400"
            />
          )}
          {severity === "error" && (
            <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
          )}
        </div>
        <div className="ml-3">
          {children?.length ? children : <p className={textClasses}>{text}</p>}
        </div>
        {showCloseBtn && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button onClick={onClose} type="button" className={btnClasses}>
                <span className="sr-only">Dismiss</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBox;
