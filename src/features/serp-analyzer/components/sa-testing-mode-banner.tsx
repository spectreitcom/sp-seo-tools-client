import { useSaTestingMode } from "../hooks/use-sa-testing-mode.ts";
import {
  getErrorMessage,
  RequestAxiosError,
  useErrorHandler,
} from "../../shared";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../../shared/components/loader/spinner.tsx";
import Button from "../../shared/components/button.tsx";
import TestModeCounter from "../../shared/components/test-mode-counter.tsx";

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
      <div className={"rounded-md bg-gray-100 p-4"}>
        <Spinner width={30} borderWidth={4} />
      </div>
    );

  if (!data?.canActivate && !data?.isActive) return null;

  return (
    <div
      className={
        "flex justify-between items-center bg-gray-100 p-4 rounded-md mb-8"
      }
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
