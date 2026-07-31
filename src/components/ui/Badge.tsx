import type { ReactNode } from "react";

export default function Badge({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
      {children}
    </div>
  );
}
