import { Keyword, useKeywords } from "../hooks";
import IconButton from "./icon-button.tsx";
import { TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Alert from "./alert.tsx";
import { useMutation } from "@tanstack/react-query";
import { RequestAxiosError } from "../types";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/get-error-message.ts";

type Props = {
  keyword: Keyword;
  onDeleted: () => void;
};

function KeywordsTableRow({ keyword, onDeleted }: Props) {
  const [showAlert, setShowAlert] = useState(false);
  const { deleteKeywordFn } = useKeywords();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteKeywordFn,
    onSuccess: () => {
      toast.success("Keyword was removed successfully");
      setShowAlert(false);
      onDeleted();
    },
    onError: (error: RequestAxiosError) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleConfirm = () => {
    mutate(keyword.keywordId);
  };

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
          onClick={() => setShowAlert(true)}
          icon={<TrashIcon className={"size-4"} />}
        />
        <Alert
          open={showAlert}
          onClose={() => setShowAlert(false)}
          onConfirm={handleConfirm}
          title={"Delete keyword"}
          description={"Removing keyword will delete all associated data."}
          loading={isPending}
        />
      </td>
    </tr>
  );
}

export default KeywordsTableRow;
