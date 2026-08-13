import { useEffect, useMemo } from "react";
import {
  Pause,
  Play,
  SkipForward,
} from "lucide-react";

import { useRestTimerStore } from "../../store/restTimerStore";
import { useTimer } from "../../hooks/useTimer";
import { formatDuration } from "../../utils/time";

export default function RestTimer() {
  const {
    timer,
    start,
    pause,
    resume,
    stop,
  } = useRestTimerStore();

  const now = useTimer();

  useEffect(() => {
    if (
      timer.running &&
      timer.endAt &&
      now >= timer.endAt
    ) {
      stop();
    }
  }, [now, timer, stop]);

  const remaining = useMemo(() => {
    if (!timer.running || !timer.endAt) {
      return timer.duration;
    }

    return Math.max(
      0,
      Math.ceil(
        (timer.endAt - now) / 1000,
      ),
    );
  }, [timer, now]);

  const time = formatDuration(remaining);

  return (
    <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 px-3 py-3">
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
              Rest
            </span>

            <span className="text-xl font-bold tabular-nums">
              {time}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={
            timer.running
              ? pause
              : resume
          }
          aria-label={
            timer.running
              ? "Pause rest timer"
              : "Resume rest timer"
          }
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 active:scale-95"
        >
          {timer.running ? (
            <Pause size={18} />
          ) : (
            <Play size={18} />
          )}
        </button>

        <button
          type="button"
          onClick={stop}
          aria-label="Skip rest"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-zinc-300 active:scale-95"
        >
          <SkipForward size={18} />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2">
        {[30, 60, 90, 120].map(sec => (
          <button
            key={sec}
            type="button"
            onClick={() => start(sec)}
            className={[
              "h-9 rounded-lg text-xs font-semibold",
              "transition active:scale-95",
              timer.duration === sec
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-300",
            ].join(" ")}
          >
            {sec}s
          </button>
        ))}
      </div>
    </div>
  );
}
