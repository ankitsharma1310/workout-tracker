import { useEffect, useMemo, useState } from "react";
import { Pause, Play, SkipForward } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

import { useRestTimerStore } from "../../store/restTimerStore";

export default function RestTimer() {

  const {
    timer,
    start,
    pause,
    resume,
    stop,
  } = useRestTimerStore();

  const [now, setNow] = useState(Date.now());

  useEffect(() => {

    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);

  }, []);

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
      Math.ceil((timer.endAt - now) / 1000),
    );

  }, [timer, now]);

  const minutes = String(
    Math.floor(remaining / 60),
  ).padStart(2, "0");

  const seconds = String(
    remaining % 60,
  ).padStart(2, "0");

  return (

    <Card>

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-lg font-bold">
            Rest Timer
          </h2>

          <div className="mt-2 text-4xl font-bold">
            {minutes}:{seconds}
          </div>

        </div>

        <div className="flex gap-2">

          {timer.running ? (

            <Button
              className="w-auto px-4"
              onClick={pause}
            >
              <Pause size={18} />
            </Button>

          ) : (

            <Button
              className="w-auto px-4"
              onClick={resume}
            >
              <Play size={18} />
            </Button>

          )}

          <Button
            className="w-auto px-4 bg-red-600 hover:bg-red-700"
            onClick={stop}
          >
            <SkipForward size={18} />
          </Button>

        </div>

      </div>

      <div className="mt-5 flex gap-3">

        {[30, 60, 90, 120].map(sec => (

          <Button
            key={sec}
            className="w-auto px-4"
            onClick={() => start(sec)}
          >
            {sec}s
          </Button>

        ))}

      </div>

    </Card>

  );

}
