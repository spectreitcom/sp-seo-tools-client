import { TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router";
import KeywordPositionBadge from "./keyword-position-badge.tsx";
import { Keyword, useKeywords } from "../../hooks";
import { RequestAxiosError } from "../../types";
import { getErrorMessage } from "../../utils/get-error-message.ts";
import IconButton from "../ui/icon-button.tsx";
import Alert from "../ui/alert.tsx";

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
        <Link
          to={`/rank-tracker/keywords/${keyword.keywordId}`}
          className={
            "cursor-pointer text-sm flex flex-nowrap items-center hover:text-indigo-500 focus-visible:outline-indigo-600 text-indigo-600 font-bold"
          }
        >
          {keyword.keywordText}
        </Link>
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        <KeywordPositionBadge position={keyword.lastIndexedPosition} />
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        <ReactCountryFlag
          countryCode={keyword.localizationCountryCode}
          className={"mr-2"}
        />
        {keyword.localizationCountryName}
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
