import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import Page from "../components/layout/Page";
import { useBodyweightStore } from "../store/bodyweightStore";
import { useSettingsStore } from "../store/settingsStore";
import { getLocalDateKey, getRecentAverageBodyweight, kgToUnit } from "../utils/bodyweight";
import { addBodyMeasurement, cmToUnit, deleteBodyMeasurement, getBodyProfile, saveHeight, unitToCm } from "../utils/body";
import { defaultLifts, deleteStrengthLift, getStrengthLifts, saveStrengthLift } from "../utils/strength";

const commonMeasurements = ["Chest", "Biceps", "Forearms", "Waist", "Shoulders", "Thighs", "Calves", "Neck", "Hips"];

export default function BodyweightPage() {
  const { entries, save, remove } = useBodyweightStore();
  const { settings } = useSettingsStore();
  const [profile, setProfile] = useState(getBodyProfile());
  const [strengthLifts, setStrengthLifts] = useState(getStrengthLifts());
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState(profile.heightCm > 0 ? String(profile.heightCm) : "");
  const [measurementName, setMeasurementName] = useState("Chest");
  const [measurementValue, setMeasurementValue] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState<"cm" | "in">("cm");
  const [liftName, setLiftName] = useState("Bench Press");
  const [liftWeight, setLiftWeight] = useState("");
  const [liftReps, setLiftReps] = useState("");

  const today = getLocalDateKey();
  const todayEntry = entries.find(entry => entry.date === today);
  const averageKg = useMemo(() => getRecentAverageBodyweight(7), [entries]);
  const average = averageKg === null ? null : kgToUnit(averageKg, settings.weightUnit);

  function saveToday() { const value = Number(weight); if (!Number.isFinite(value) || value <= 0) return; save(value, settings.weightUnit); setWeight(""); }
  function saveHeightValue() { saveHeight(Number(height)); setProfile(getBodyProfile()); }
  function saveMeasurement() { const value = Number(measurementValue); if (!Number.isFinite(value) || value <= 0 || !measurementName.trim()) return; addBodyMeasurement(measurementName, unitToCm(value, measurementUnit)); setProfile(getBodyProfile()); setMeasurementValue(""); }
  function removeMeasurement(id: string) { deleteBodyMeasurement(id); setProfile(getBodyProfile()); }
  function saveLift() { const weightValue = Number(liftWeight); const repsValue = Number(liftReps); if (!Number.isFinite(weightValue) || weightValue <= 0 || !Number.isInteger(repsValue) || repsValue < 1) return; saveStrengthLift(liftName, weightValue, repsValue); setStrengthLifts(getStrengthLifts()); setLiftWeight(""); setLiftReps(""); }
  function removeLift(id: string) { deleteStrengthLift(id); setStrengthLifts(getStrengthLifts()); }

  return (
    <Page>
      <div className="pt-2 pb-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">Body</p>
        <h1 className="mt-2 text-3xl font-bold">Body</h1>
        <p className="mt-1 text-sm text-zinc-500">Track bodyweight, physique measurements and strength.</p>

        <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70"><div className="p-5"><div className="text-xs uppercase tracking-wide text-zinc-500">7-day average</div><div className="mt-2 text-3xl font-bold tabular-nums">{average !== null ? average.toFixed(1) : "—"}<span className="ml-1 text-sm font-medium text-zinc-500">{average !== null ? settings.weightUnit : ""}</span></div></div><div className="border-l border-zinc-800 p-5"><div className="text-xs uppercase tracking-wide text-zinc-500">Height</div><div className="mt-2 text-3xl font-bold tabular-nums">{profile.heightCm > 0 ? profile.heightCm : "—"}<span className="ml-1 text-sm font-medium text-zinc-500">{profile.heightCm > 0 ? "cm" : ""}</span></div></div></div>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4"><h2 className="text-lg font-semibold">Height</h2><div className="mt-3 flex gap-2"><input type="number" inputMode="decimal" value={height} placeholder="Height in cm" onFocus={e => e.currentTarget.select()} onChange={e => setHeight(e.target.value)} className="h-12 min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 outline-none focus:border-blue-500" /><button type="button" onClick={saveHeightValue} className="h-12 rounded-xl bg-blue-600 px-5 text-sm font-semibold active:scale-[0.98]">Save</button></div></section>

        <section className="mt-6"><div className="mb-3"><h2 className="text-lg font-semibold">Today's weight</h2><p className="mt-1 text-xs text-zinc-500">One entry per day</p></div><div className="flex gap-2"><input type="number" inputMode="decimal" value={weight} placeholder="Weight" onFocus={e => e.currentTarget.select()} onChange={e => setWeight(e.target.value)} className="h-13 min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-lg font-semibold outline-none focus:border-blue-500" /><button type="button" onClick={saveToday} className="h-13 shrink-0 rounded-xl bg-blue-600 px-5 text-sm font-semibold active:scale-[0.98]">Save</button></div>{todayEntry && <p className="mt-2 text-xs text-zinc-500">Today's entry: {kgToUnit(todayEntry.weightKg, settings.weightUnit).toFixed(1)} {settings.weightUnit}</p>}</section>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4"><div className="mb-4"><h2 className="text-lg font-semibold">Body measurements</h2><p className="mt-1 text-xs text-zinc-500">Optional measurements for tracking physique changes.</p></div><div className="grid grid-cols-2 gap-2"><select value={measurementName} onChange={e => setMeasurementName(e.target.value)} className="h-12 rounded-xl border border-zinc-700 bg-zinc-800 px-3 outline-none focus:border-blue-500">{commonMeasurements.map(name => <option key={name}>{name}</option>)}</select><div className="flex gap-2"><input type="number" inputMode="decimal" value={measurementValue} placeholder="Value" onFocus={e => e.currentTarget.select()} onChange={e => setMeasurementValue(e.target.value)} className="h-12 min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-3 outline-none focus:border-blue-500" /><select value={measurementUnit} onChange={e => setMeasurementUnit(e.target.value as "cm" | "in")} className="h-12 w-20 rounded-xl border border-zinc-700 bg-zinc-800 px-2 outline-none focus:border-blue-500"><option value="cm">cm</option><option value="in">in</option></select></div></div><button type="button" onClick={saveMeasurement} className="mt-3 h-11 w-full rounded-xl bg-blue-600 text-sm font-semibold active:scale-[0.98]">Add Measurement</button><div className="mt-5 divide-y divide-zinc-800">{profile.measurements.length === 0 ? <p className="py-3 text-sm text-zinc-500">No measurements recorded yet.</p> : profile.measurements.slice(0, 20).map(item => <div key={item.id} className="flex items-center justify-between gap-3 py-3"><div><div className="text-sm font-medium">{item.name}</div><div className="text-xs text-zinc-500">{new Date(item.recordedAt).toLocaleDateString()}</div></div><div className="flex items-center gap-3"><div className="text-sm font-semibold">{cmToUnit(item.valueCm, measurementUnit).toFixed(1)} {measurementUnit}</div><button type="button" onClick={() => removeMeasurement(item.id)} aria-label={`Delete ${item.name} measurement`} className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 active:bg-zinc-800 active:text-red-400"><Trash2 size={15} /></button></div></div>)}</div></section>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4"><div className="mb-4"><h2 className="text-lg font-semibold">Strength & 1RM</h2><p className="mt-1 text-xs text-zinc-500">Enter a true 1RM or any recent weight × reps. The app estimates 1RM automatically.</p></div><div className="grid grid-cols-[1.2fr_1fr_0.8fr] gap-2"><input list="lift-options" value={liftName} onChange={e => setLiftName(e.target.value)} placeholder="Exercise / lift" className="h-12 min-w-0 rounded-xl border border-zinc-700 bg-zinc-800 px-3 outline-none focus:border-blue-500" /><datalist id="lift-options">{[...new Set([...defaultLifts, ...strengthLifts.map(lift => lift.name)])].map(name => <option key={name} value={name} />)}</datalist><input type="number" inputMode="decimal" value={liftWeight} placeholder="kg" onFocus={e => e.currentTarget.select()} onChange={e => setLiftWeight(e.target.value)} className="h-12 min-w-0 rounded-xl border border-zinc-700 bg-zinc-800 px-3 outline-none focus:border-blue-500" /><input type="number" inputMode="numeric" value={liftReps} placeholder="reps" onFocus={e => e.currentTarget.select()} onChange={e => setLiftReps(e.target.value)} className="h-12 min-w-0 rounded-xl border border-zinc-700 bg-zinc-800 px-3 outline-none focus:border-blue-500" /></div><button type="button" onClick={saveLift} className="mt-3 h-11 w-full rounded-xl bg-blue-600 text-sm font-semibold active:scale-[0.98]">Save Lift</button><div className="mt-5 divide-y divide-zinc-800">{strengthLifts.length === 0 ? <p className="py-3 text-sm text-zinc-500">No lifts recorded yet.</p> : strengthLifts.map(lift => <div key={lift.id} className="flex items-center justify-between gap-3 py-3"><div><div className="text-sm font-medium">{lift.name}</div><div className="mt-0.5 text-xs text-zinc-500">{lift.weightKg} kg × {lift.reps} • estimated 1RM {lift.estimatedOneRepMaxKg.toFixed(1)} kg</div></div><button type="button" onClick={() => removeLift(lift.id)} aria-label={`Delete ${lift.name}`} className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 active:bg-zinc-800 active:text-red-400"><Trash2 size={15} /></button></div>)}</div>{strengthLifts.length > 0 && <div className="mt-4 rounded-xl bg-zinc-950/60 p-3 text-xs text-zinc-500">Estimated 1RM uses weight × (1 + reps ÷ 30). For 5/3/1, Training Max is 90% of estimated 1RM and rounded to the nearest 2.5 kg.</div>}</section>

        <section className="mt-8"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-semibold">Recent weight</h2><span className="text-xs text-zinc-500">{entries.length} entries</span></div><div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">{entries.length === 0 ? <div className="p-5 text-sm text-zinc-500">No bodyweight entries yet.</div> : entries.slice(0, 14).map(entry => { const display = kgToUnit(entry.weightKg, settings.weightUnit); const date = new Date(`${entry.date}T12:00:00`); const label = entry.date === today ? "Today" : date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }); return <div key={entry.date} className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 last:border-b-0"><div className="text-sm font-medium">{label}</div><div className="flex items-center gap-4"><div className="text-sm font-semibold tabular-nums">{display.toFixed(1)} {settings.weightUnit}</div><button type="button" onClick={() => remove(entry.date)} aria-label={`Delete ${label} entry`} className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 active:bg-zinc-800 active:text-red-400"><Trash2 size={15} /></button></div></div>; })}</div></section>
      </div>
    </Page>
  );
}
