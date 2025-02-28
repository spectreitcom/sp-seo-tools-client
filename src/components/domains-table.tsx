import { ComponentProps } from "react";
import { Domain } from "../hooks/use-domains.ts";
import clsx from "clsx";
import DomainsTableRow from "./domains-table-row.tsx";

type Props = ComponentProps<"div"> & {
  domains: Domain[];
  onDeleted: () => void;
};

function DomainsTable({ className, domains, onDeleted, ...rest }: Props) {
  const containerClasses = clsx(className);

  return (
    <div className={containerClasses} {...rest}>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Domain
            </th>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Keywords
            </th>
            <th
              scope="col"
              className="relative py-3.5 pr-4 pl-3 whitespace-nowrap sm:pr-0"
            />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {domains.map((domain) => (
            <DomainsTableRow
              key={domain.domainId}
              domain={domain}
              onDeleted={onDeleted}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DomainsTable;
