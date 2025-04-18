import { useEffect, useRef } from "react";
import moment from "moment";

type Props = {
  expiresAt: number | undefined | null;
  label?: string;
};

function TestModeCounter({ expiresAt, label }: Props) {
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
      {label}
      <span className={"ml-2 font-semibold text-indigo-600"} ref={counterRef} />
    </div>
  );
}

export default TestModeCounter;
