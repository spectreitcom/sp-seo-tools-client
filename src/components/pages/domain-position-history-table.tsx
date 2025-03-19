import { ComponentProps } from "react";
import DomainPositionHistoryTableRow from "./domain-position-history-table-row.tsx";
import { DomainPositionHistory } from "../../hooks/use-domain-history-position.ts";

type Props = ComponentProps<"div"> & {
  data: DomainPositionHistory[];
};

function DomainPositionHistoryTable({ data, className, ...rest }: Props) {
  return (
    <div className={className} {...rest}>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Date
            </th>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Position
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item) => (
            <DomainPositionHistoryTableRow
              key={item.domainPositionId}
              item={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DomainPositionHistoryTable;
