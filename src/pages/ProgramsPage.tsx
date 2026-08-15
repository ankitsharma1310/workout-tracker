import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, LockKeyhole, Play } from "lucide-react";

import Page from "../components/layout/Page";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useWorkoutStore } from "../store/workoutStore";
import { canGenerateFiveThreeOne, generateFiveThreeOneWorkout, getFiveThreeOneDays, getFiveThreeOneTrainingMax, type FiveThreeOneWeek } from "../utils/programs";
import { getFiveThreeOneLifts } from "../utils/strength";

const weeks: FiveThreeOneWeek[] = [1, 2, 3, 4];

export default function ProgramsPage() {
  const navigate = useNavigate();
  const { setWorkout } = useWorkoutStore();
  const [week, setWeek] = useState<FiveThreeOneWeek>(1);
  const lifts = useMemo(() => getFiveThreeOneLifts(), []);
  const ready = canGenerateFiveThreeOne();
  const days = getFiveThreeOneDays();

  function startWorkout(dayIndex: number) {
    const workout = generateFiveThreeOneWorkout(week, dayIndex);
    if (!workout) return;
    setWorkout(workout);
    navigate("/workout");
  }

  return (
    <Page>
      <div className="pt-2 pb-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">Programs</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Training Programs</h1>
        <p className="mt-1 text-sm text-zinc-500">Let the app calculate the work. You log the performance.</p>

        <section className="mt-6">
          <Card className="overflow-hidden border-blue-500/30">
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-blue-400">Strength</div>
                  <h2 className="mt-1 text-xl font-bold">5/3/1 + BBB</h2>
                  <p className="mt-1 text-sm text-zinc-500">4-week cycle • Squat, Deadlift, Bench Press, OHP</p>
                </div>
                <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400"><Play size={20} /></div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {weeks.map(item => (
                  <button key={item} type="button" onClick={() => setWeek(item)} className={["rounded-xl py-2 text-xs font-semibold", week === item ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-400"].join(" ")}>{item === 4 ? "Deload" : `Week ${item}`}</button>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-800 bg-zinc-950/30 px-4 py-3">
              <div className="grid grid-cols-2 gap-2">
                {days.map((day, index) => {
                  const tm = getFiveThreeOneTrainingMax(day.name);
                  return (
                    <button key={day.name} type="button" disabled={!ready} onClick={() => startWorkout(index)} className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-left disabled:cursor-not-allowed disabled:opacity-50 active:bg-zinc-800">
                      <div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold">{day.name}</span><ChevronRight size={15} className="text-zinc-600" /></div>
                      <div className="mt-1 text-xs text-zinc-500">TM {tm !== null ? `${tm} kg` : "Not set"}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-semibold">Your 5/3/1 lifts</h2><button type="button" onClick={() => navigate("/bodyweight")} className="text-sm font-medium text-blue-400">Edit in Body</button></div>
          <Card className="p-4">
            {lifts.map(({ name, lift }) => (
              <div key={name} className="flex items-center justify-between border-b border-zinc-800 py-3 last:border-b-0">
                <div><div className="text-sm font-medium">{name}</div><div className="mt-0.5 text-xs text-zinc-500">{lift ? `${lift.weightKg} kg × ${lift.reps} • estimated 1RM ${lift.estimatedOneRepMaxKg.toFixed(1)} kg` : "Add a lift in Body"}</div></div>
                {lift ? <span className="text-xs font-semibold text-green-400">Ready</span> : <LockKeyhole size={15} className="text-zinc-600" />}
              </div>
            ))}
            {!ready && <Button className="mt-4 h-11 w-full" onClick={() => navigate("/bodyweight")}>Add Your Lifts</Button>}
          </Card>
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
          <h2 className="text-sm font-semibold">How it works</h2>
          <p className="mt-2 text-xs leading-5 text-zinc-500">Enter a recent lift such as 100 kg × 8 in Body. The app estimates your 1RM, uses 90% as the Training Max, rounds to 2.5 kg plates, and generates the selected 5/3/1 week. Week 1–3 include the final AMRAP set and BBB 5×10; Week 4 is a deload without AMRAP.</p>
        </section>
      </div>
    </Page>
  );
}
