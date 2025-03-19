import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import moment from "moment";
import { useErrorHandler, useTestingMode } from "../../hooks";
import { RequestAxiosError } from "../../types";
import { getErrorMessage } from "../../utils/get-error-message.ts";
import Spinner from "../ui/loader/spinner.tsx";
import Button from "../ui/button.tsx";

type Props = {
  className?: string;
};

function TestingModeBanner({ className }: Props) {
  const { createUserTestingModeQueryOptions, activateFn } = useTestingMode();
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
      {data?.isActive && <ActiveTestMode expiresAt={data.expiresAt?.value} />}
    </div>
  );
}

type ActiveTestModeProps = {
  expiresAt: number | undefined | null;
};

function ActiveTestMode({ expiresAt }: ActiveTestModeProps) {
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let momentExpiresAt: moment.Moment | null = null;

    if (expiresAt) {
      momentExpiresAt = moment(expiresAt * 1000);
    }

    const interval = setInterval(() => {
      if (!momentExpiresAt || !counterRef.current) return;

      const nowMoment = moment();
      const secondsLeft = momentExpiresAt.diff(nowMoment, "seconds");

      const diffDays = Math.floor(secondsLeft / (3600 * 24));
      const diffHours = Math.floor((secondsLeft % (3600 * 24)) / 3600);
      const diffMinutes = Math.floor((secondsLeft % 3600) / 60);
      const diffSeconds = secondsLeft % 60;

      counterRef.current.textContent = `${diffDays} days ${diffHours} hours ${diffMinutes} minutes ${diffSeconds} seconds`;
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  if (!expiresAt) return null;
  return (
    <div>
      Testing mode ends in
      <span className={"ml-2 font-semibold text-indigo-600"} ref={counterRef} />
    </div>
  );
}

export default TestingModeBanner;
