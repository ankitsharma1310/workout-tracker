import type { ReactNode } from "react";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg ${className ?? ""}`}>
      {children}
    </div>
  );
}
