import IconButton from "./icon-button.tsx";
import { TrashIcon } from "@heroicons/react/16/solid";
import Alert from "./alert.tsx";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { RequestAxiosError } from "../types";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/get-error-message.ts";
import { Domain, useDomains } from "../hooks";

type Props = {
  domain: Domain;
  onDeleted: () => void;
};

function DomainsTableRow({ domain, onDeleted }: Props) {
  const [showAlert, setShowAlert] = useState(false);
  const { removeDomainFn } = useDomains();

  const { isPending, mutate } = useMutation({
    mutationFn: removeDomainFn,
    onSuccess: () => {
      setShowAlert(false);
      toast.success("Domain was removed successfully");
      onDeleted();
    },
    onError: (error: RequestAxiosError) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleConfirm = () => {
    mutate(domain.domainId);
  };

  return (
    <tr>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {domain.domain}
      </td>
      <td className="py-2 pr-3 pl-4 text-sm whitespace-nowrap text-gray-500 sm:pl-0">
        {domain.keywordsCount}
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
          title={"Delete domain"}
          description={
            "Removing domain will delete all keywords associated with it and other associated data."
          }
          loading={isPending}
        />
      </td>
    </tr>
  );
}

export default DomainsTableRow;
