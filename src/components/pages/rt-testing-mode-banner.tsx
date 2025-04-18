import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useErrorHandler, useRtTestingMode } from "../../hooks";
import { RequestAxiosError } from "../../types";
import { getErrorMessage } from "../../utils/get-error-message.ts";
import Spinner from "../ui/loader/spinner.tsx";
import Button from "../ui/button.tsx";
import TestModeCounter from "./test-mode-counter.tsx";

type Props = Readonly<{
  className?: string;
}>;

function RtTestingModeBanner({ className }: Props) {
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
      <div className={"rounded-md bg-gray-100 p-4"}>
        <Spinner width={30} borderWidth={4} />
      </div>
    );

  if (data && !data.canActivate && !data.isActive) return null;

  return (
    <div className={clsx("rounded-md bg-gray-100 p-4", className)}>
      {data?.canActivate && (
        <div className={"flex items-center"}>
          <span className={"mr-4"}>
            You can test this tool by activating testing mode
          </span>
          <Button size={"sm"} onClick={() => mutate()} loading={isPending}>
            Activate
          </Button>
        </div>
      )}
      {data?.isActive && (
        <TestModeCounter
          label={"Test mode ends in"}
          expiresAt={data.expiresAt?.value}
        />
      )}
    </div>
  );
}

export default RtTestingModeBanner;
