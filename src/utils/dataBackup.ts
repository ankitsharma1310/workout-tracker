const BACKUP_VERSION = 1;
const APP_KEY_PREFIX = "workout-";

export type WorkoutTrackerBackup = {
  app: "workout-tracker";
  version: number;
  exportedAt: string;
  data: Record<string, string>;
};

export function createBackup(): WorkoutTrackerBackup {
  const data: Record<string, string> = {};

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(APP_KEY_PREFIX)) continue;
    const value = localStorage.getItem(key);
    if (value !== null) data[key] = value;
  }

  return {
    app: "workout-tracker",
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

export function downloadBackup() {
  const backup = createBackup();
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `workout-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function restoreBackup(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Partial<WorkoutTrackerBackup>;
        if (parsed.app !== "workout-tracker" || parsed.version !== BACKUP_VERSION || !parsed.data || typeof parsed.data !== "object") {
          throw new Error("Invalid Workout Tracker backup.");
        }

        for (const [key, value] of Object.entries(parsed.data)) {
          if (key.startsWith(APP_KEY_PREFIX) && typeof value === "string") {
            localStorage.setItem(key, value);
          }
        }

        resolve();
      } catch (error) {
        reject(error instanceof Error ? error : new Error("Could not restore backup."));
      }
    };
    reader.onerror = () => reject(new Error("Could not read backup file."));
    reader.readAsText(file);
  });
}
