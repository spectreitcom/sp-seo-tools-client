import { useEffect, useRef } from "react";
import moment from "moment";

type Props = Readonly<{
  expiresAt: number | undefined | null;
  label?: string;
}>;

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
    <div className="flex items-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-sm">
      {label && <span className="text-gray-700 font-medium">{label}</span>}
      <span
        className="ml-2 font-semibold text-indigo-600 text-lg"
        ref={counterRef}
      />
    </div>
  );
}

export default TestModeCounter;
