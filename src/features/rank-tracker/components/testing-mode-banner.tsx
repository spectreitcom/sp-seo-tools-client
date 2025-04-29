import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import toast from "react-hot-toast";
import {
  getErrorMessage,
  RequestAxiosError,
  useErrorHandler,
} from "../../shared";
import Spinner from "../../shared/components/loader/spinner.tsx";
import Button from "../../shared/components/button.tsx";
import TestModeCounter from "../../shared/components/test-mode-counter.tsx";
import { useRtTestingMode } from "../hooks/use-testing-mode.ts";

type Props = Readonly<{
  className?: string;
}>;

function TestingModeBanner({ className }: Props) {
  const { createUserTestingModeQueryOptions, activateFn } = useRtTestingMode();
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
      <div className="rounded-md bg-gray-50 p-4 flex justify-center items-center">
        <Spinner width={30} borderWidth={4} />
      </div>
    );

  if (data && !data.canActivate && !data.isActive) return null;

  return (
    <div
      className={clsx(
        "flex flex-col lg:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg shadow-md mb-8",
        className,
      )}
    >
      {data?.canActivate && (
        <div className="flex flex-col space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Testing Mode</h3>
          <p className="text-gray-600">
            You can test this tool by activating testing mode.
          </p>
        </div>
      )}
      {data?.canActivate && (
        <div className="mt-4 lg:mt-0">
          <Button
            size="lg"
            loading={isPending}
            onClick={() => mutate()}
            className="bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Activate
          </Button>
        </div>
      )}
      <TestModeCounter
        label="Test mode ends in"
        expiresAt={data?.expiresAt?.value}
      />
    </div>
  );
}

export default TestingModeBanner;
