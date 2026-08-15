import type { Workout } from "../types/workout";

export function exportHistoryPdf(workouts: Workout[], weightUnit: string) {
  const popup = window.open("", "_blank");
  if (!popup) return false;

  const totalVolume = workouts.reduce(
    (total, workout) => total + workout.exercises.reduce(
      (sum, exercise) => sum + exercise.sets.reduce((setSum, set) => setSum + set.weight * set.reps, 0),
      0,
    ),
    0,
  );

  const rows = workouts.map(workout => {
    const date = new Date(workout.finishedAt ?? workout.startedAt);
    const volume = workout.exercises.reduce(
      (sum, exercise) => sum + exercise.sets.reduce((setSum, set) => setSum + set.weight * set.reps, 0),
      0,
    );
    return `<tr><td>${escapeHtml(date.toLocaleDateString())}</td><td>${escapeHtml(workout.name || "Untitled Workout")}</td><td>${workout.exercises.length}</td><td>${volume.toLocaleString()} ${escapeHtml(weightUnit)}</td></tr>`;
  }).join("");

  popup.document.write(`<!doctype html><html><head><title>Workout History</title><style>@page{size:A4;margin:16mm}*{box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#18181b;margin:0}header{border-bottom:2px solid #18181b;padding-bottom:14px;margin-bottom:20px}h1{margin:0 0 5px;font-size:26px}.muted{color:#71717a;font-size:12px}.summary{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:24px}.stat{border:1px solid #d4d4d8;border-radius:8px;padding:10px}.label{color:#71717a;font-size:11px;text-transform:uppercase}.value{margin-top:3px;font-size:16px;font-weight:700}table{width:100%;border-collapse:collapse;font-size:11px}th{text-align:left;background:#f4f4f5;font-weight:700}th,td{border:1px solid #d4d4d8;padding:7px 8px}.print{margin-bottom:20px;padding:9px 14px;border:0;border-radius:7px;background:#18181b;color:white;cursor:pointer}@media print{.print{display:none}}</style></head><body><button class="print" onclick="window.print()">Print / Save as PDF</button><header><h1>Workout History</h1><div class="muted">${workouts.length} workouts</div></header><div class="summary"><div class="stat"><div class="label">Total Workouts</div><div class="value">${workouts.length}</div></div><div class="stat"><div class="label">Total Volume</div><div class="value">${totalVolume.toLocaleString()} ${escapeHtml(weightUnit)}</div></div></div><table><thead><tr><th>Date</th><th>Workout</th><th>Exercises</th><th>Volume</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
  popup.document.close();
  popup.focus();
  setTimeout(() => popup.print(), 300);
  return true;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>\"']/g, character => {
    switch (character) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "\"": return "&quot;";
      case "'": return "&#39;";
      default: return character;
    }
  });
}
