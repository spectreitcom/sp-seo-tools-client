import { Keyword } from "../hooks";
import { ComponentProps } from "react";
import clsx from "clsx";
import KeywordsTableRow from "./keywords-table-row.tsx";

type Props = ComponentProps<"div"> & {
  keywords: Keyword[];
};

function KeywordsTable({ className, keywords, ...rest }: Props) {
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
              Keyword
            </th>
            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Last indexed position
            </th>

            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Localization
            </th>

            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Search engine
            </th>

            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Device
            </th>

            <th
              scope="col"
              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold whitespace-nowrap text-gray-900 sm:pl-0"
            >
              Domain
            </th>

            <th
              scope="col"
              className="relative py-3.5 pr-4 pl-3 whitespace-nowrap sm:pr-0"
            />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {keywords.map((keyword) => (
            <KeywordsTableRow key={keyword.keywordId} keyword={keyword} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KeywordsTable;
