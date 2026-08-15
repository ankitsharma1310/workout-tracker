import { useRef, useState } from "react";
import Page from "../components/layout/Page";
import { useSettingsStore } from "../store/settingsStore";
import { downloadBackup, restoreBackup } from "../utils/dataBackup";

export default function SettingsPage() {
  const { settings, update } = useSettingsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [backupMessage, setBackupMessage] = useState("");

  async function handleRestore(file: File) {
    try {
      await restoreBackup(file);
      setBackupMessage("Backup restored. Reloading app…");
      window.setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      setBackupMessage(error instanceof Error ? error.message : "Could not restore backup.");
    }
  }

  return (
    <Page>
      <div className="pt-2 pb-24">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">Keep the workout experience the way you like it.</p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 p-4"><div className="text-xs uppercase tracking-wide text-zinc-500">Workout</div></div>
          <div className="border-b border-zinc-800 p-4">
            <label className="block"><span className="text-sm font-medium">Default Rest Timer</span><select value={settings.defaultRestTimer} onChange={e => update({ defaultRestTimer: Number(e.target.value) })} className="mt-3 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 outline-none focus:border-blue-500"><option value={30}>30 seconds</option><option value={60}>60 seconds</option><option value={90}>90 seconds</option><option value={120}>120 seconds</option></select></label>
          </div>
          <div className="border-b border-zinc-800 p-4">
            <label className="block"><span className="text-sm font-medium">Weight Unit</span><select value={settings.weightUnit} onChange={e => update({ weightUnit: e.target.value as "kg" | "lb" })} className="mt-3 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 outline-none focus:border-blue-500"><option value="kg">Kilograms (kg)</option><option value="lb">Pounds (lb)</option></select></label>
          </div>
          <label className="flex items-center justify-between gap-4 p-4"><div><div className="text-sm font-medium">Auto Start Rest Timer</div><div className="mt-1 text-xs text-zinc-500">Start the rest timer when you complete a set.</div></div><input type="checkbox" checked={settings.autoStartRestTimer} onChange={e => update({ autoStartRestTimer: e.target.checked })} className="h-5 w-5 accent-blue-500" /></label>
        </div>

        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">
          <div><h2 className="text-lg font-semibold">Data & Backup</h2><p className="mt-1 text-xs leading-5 text-zinc-500">App updates do not normally remove your data. Keep a backup in the iPhone Files app so your workout history, body data, strength records and settings can always be restored.</p></div>
          <button type="button" onClick={() => { downloadBackup(); setBackupMessage("Backup exported. Save the JSON file somewhere safe."); }} className="mt-4 h-11 w-full rounded-xl bg-blue-600 text-sm font-semibold active:scale-[0.98]">Export Full Backup</button>
          <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-2 h-11 w-full rounded-xl bg-zinc-800 text-sm font-semibold active:scale-[0.98]">Restore Backup</button>
          <input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={e => { const file = e.target.files?.[0]; if (file) void handleRestore(file); e.currentTarget.value = ""; }} />
          {backupMessage && <p className="mt-3 text-xs text-zinc-500">{backupMessage}</p>}
        </section>

        <div className="mt-8 border-t border-zinc-800 pt-6 text-center"><div className="text-sm font-semibold">Workout Tracker</div><div className="mt-1 text-xs text-zinc-500">Built by Ankit Sharma</div><div className="mt-1 text-xs text-zinc-600">Version 2.0.0</div></div>
      </div>
    </Page>
  );
}
