export function formatDuration(
  seconds: number,
) {

  const h = Math.floor(seconds / 3600);

  const m = Math.floor(
    (seconds % 3600) / 60,
  );

  const s = seconds % 60;

  return [h, m, s]
    .map(v =>
      String(v).padStart(2, "0"),
    )
    .join(":");

}

export function remainingSeconds(
  endAt: number,
) {

  return Math.max(
    0,
    Math.ceil(
      (endAt - Date.now()) / 1000,
    ),
  );

}
