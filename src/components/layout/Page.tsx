import type { ReactNode } from "react";

export default function Page({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl p-5">
        {children}
      </div>
    </div>
  );
}
