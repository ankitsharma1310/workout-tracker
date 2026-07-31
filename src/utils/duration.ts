export function formatDuration(
  startedAt: string,
  finishedAt: string,
) {

  const start = new Date(startedAt).getTime();

  const end = new Date(finishedAt).getTime();

  const seconds = Math.floor((end - start) / 1000);

  const hours = Math.floor(seconds / 3600);

  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes} min`;
  }

  return `${hours}h ${minutes}m`;

}
