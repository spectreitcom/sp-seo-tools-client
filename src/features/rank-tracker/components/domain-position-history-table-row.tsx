import KeywordPositionBadge from "./keyword-position-badge.tsx";
import { DomainPositionHistory } from "../types";

type Props = Readonly<{
  item: DomainPositionHistory;
}>;

function DomainPositionHistoryTableRow({ item }: Props) {
  return (
    <tr>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {item.createdAt}
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        <KeywordPositionBadge position={item.position} />
      </td>
    </tr>
  );
}

export default DomainPositionHistoryTableRow;
