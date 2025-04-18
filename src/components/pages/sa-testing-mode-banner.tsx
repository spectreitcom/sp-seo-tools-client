import Button from "../ui/button.tsx";
import TestModeCounter from "./test-mode-counter.tsx";
import { useSaTestingMode } from "../../hooks/use-sa-testing-mode.ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useErrorHandler } from "../../hooks";
import Spinner from "../ui/loader/spinner.tsx";
import { RequestAxiosError } from "../../types";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/get-error-message.ts";

function SaTestingModeBanner() {
  const { createUserTestingModeQueryOptions, activateFn } = useSaTestingMode();
  const { handle401Error } = useErrorHandler();

  const { data, isLoading, refetch } = useQuery(
    createUserTestingModeQueryOptions(),
  );

  const { mutate, isPending } = useMutation({
    mutationFn: activateFn,
    retry: 4,
    onSuccess: async () => {
      toast.success("Testing mode activated");
      await refetch();
    },
    onError: (error: RequestAxiosError) => {
      toast.error(getErrorMessage(error));
      handle401Error(error);
    },
  });

  if (isLoading)
    return (
      <div className={"rounded-md bg-gray-100 p-4 mb-4"}>
        <Spinner width={30} borderWidth={4} />
      </div>
    );

  return (
    <div
      className={"flex justify-between items-center bg-gray-100 p-4 rounded-md"}
    >
      {data?.canActivate && (
        <>
          <div>
            <h3 className={"text-lg font-semibold"}>Testing Mode</h3>
            <p>You can test this tool by activating testing mode</p>
          </div>
          <div>
            <Button size={"lg"} loading={isPending} onClick={() => mutate()}>
              Activate
            </Button>
          </div>
        </>
      )}
      <TestModeCounter
        label={"Test mode ends in"}
        expiresAt={data?.expiresAt?.value}
      />
    </div>
  );
}

export default SaTestingModeBanner;
