import type { ReactNode } from "react";

export default function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 ${className ?? ""}`}>
      {children}
    </div>
  );
}
