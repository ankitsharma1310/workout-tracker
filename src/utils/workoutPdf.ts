import type { Workout } from "../types/workout";

export function exportWorkoutPdf(workout: Workout, weightUnit: string) {
  const popup = window.open("", "_blank");
  if (!popup) return false;

  const date = new Date(workout.finishedAt ?? workout.startedAt);
  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const duration = workout.finishedAt
    ? formatDuration(workout.startedAt, workout.finishedAt)
    : "In progress";
  const volume = workout.exercises.reduce(
    (total, exercise) =>
      total + exercise.sets.reduce((sum, set) => sum + set.weight * set.reps, 0),
    0,
  );

  const exercises = workout.exercises
    .map(
      exercise => `
        <section class="exercise">
          <div class="exercise-head">
            <div>
              <h2>${escapeHtml(exercise.name)}</h2>
              <div class="muted">${escapeHtml(exercise.muscleGroup)}</div>
            </div>
            <div class="muted">${exercise.sets.length} sets</div>
          </div>
          <table>
            <thead><tr><th>Set</th><th>Weight</th><th>Reps</th><th>Status</th></tr></thead>
            <tbody>
              ${exercise.sets
                .map(
                  (set, index) => `
                    <tr>
                      <td>${index + 1}</td>
                      <td>${set.weight} ${escapeHtml(weightUnit)}</td>
                      <td>${set.reps}</td>
                      <td>${set.completed ? "Completed" : "Not completed"}</td>
                    </tr>`,
                )
                .join("")}
            </tbody>
          </table>
          ${exercise.notes ? `<p class="notes"><strong>Notes:</strong> ${escapeHtml(exercise.notes)}</p>` : ""}
        </section>`,
    )
    .join("");

  popup.document.write(`<!doctype html><html><head><title>${escapeHtml(workout.name || "Workout")}</title>
    <style>
      @page { size: A4; margin: 16mm; }
      * { box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #18181b; margin: 0; }
      header { border-bottom: 2px solid #18181b; padding-bottom: 14px; margin-bottom: 20px; }
      h1 { margin: 0 0 5px; font-size: 26px; }
      h2 { margin: 0; font-size: 17px; }
      .muted { color: #71717a; font-size: 12px; }
      .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }
      .stat { border: 1px solid #d4d4d8; border-radius: 8px; padding: 10px; }
      .stat-label { color: #71717a; font-size: 11px; text-transform: uppercase; }
      .stat-value { margin-top: 3px; font-size: 16px; font-weight: 700; }
      .exercise { break-inside: avoid; margin-bottom: 22px; }
      .exercise-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th { text-align: left; background: #f4f4f5; font-weight: 700; }
      th, td { border: 1px solid #d4d4d8; padding: 7px 8px; }
      .notes { font-size: 12px; margin-top: 8px; }
      footer { margin-top: 30px; padding-top: 10px; border-top: 1px solid #d4d4d8; color: #71717a; font-size: 10px; }
      .print { margin-bottom: 20px; padding: 9px 14px; border: 0; border-radius: 7px; background: #18181b; color: white; cursor: pointer; }
      @media print { .print { display: none; } }
    </style></head><body>
      <button class="print" onclick="window.print()">Print / Save as PDF</button>
      <header><h1>${escapeHtml(workout.name || "Untitled Workout")}</h1><div class="muted">${dateLabel}</div></header>
      <div class="summary">
        <div class="stat"><div class="stat-label">Duration</div><div class="stat-value">${duration}</div></div>
        <div class="stat"><div class="stat-label">Exercises</div><div class="stat-value">${workout.exercises.length}</div></div>
        <div class="stat"><div class="stat-label">Volume</div><div class="stat-value">${volume.toLocaleString()} ${escapeHtml(weightUnit)}</div></div>
      </div>
      ${exercises}
      <footer>Workout Tracker • ${date.toLocaleDateString()}</footer>
    </body></html>`);
  popup.document.close();
  popup.focus();
  setTimeout(() => popup.print(), 300);
  return true;
}

function formatDuration(startedAt: number, finishedAt: number) {
  const minutes = Math.floor(Math.max(0, finishedAt - startedAt) / 60000);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining ? `${hours}h ${remaining}m` : `${hours}h`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>\"']/g, character =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" })[character] ?? character,
  );
}
