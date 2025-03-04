import { Keyword } from "../hooks";
import IconButton from "./icon-button.tsx";
import { TrashIcon } from "@heroicons/react/16/solid";

type Props = {
  keyword: Keyword;
};

function KeywordsTableRow({ keyword }: Props) {
  return (
    <tr>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {keyword.keywordText}
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {keyword.lastIndexedPosition}
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {keyword.localizationCountryName}
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {keyword.searchEngineName}
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {keyword.deviceName}
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {keyword.domain}
      </td>
      <td className="relative py-2 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
        <IconButton
          size={"sm"}
          color={"danger"}
          onClick={() => {}}
          icon={<TrashIcon className={"size-4"} />}
        />
        {/*<Alert*/}
        {/*    open={showAlert}*/}
        {/*    onClose={() => setShowAlert(false)}*/}
        {/*    onConfirm={handleConfirm}*/}
        {/*    title={"Delete domain"}*/}
        {/*    description={*/}
        {/*        "Removing domain will delete all keywords associated with it and other associated data."*/}
        {/*    }*/}
        {/*    loading={isPending}*/}
        {/*/>*/}
      </td>
    </tr>
  );
}

export default KeywordsTableRow;
