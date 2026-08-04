import type { ReactNode } from "react";

export default function Page({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main
      className="
        min-h-dvh
        bg-zinc-950
        text-white
        px-4
        pt-[max(env(safe-area-inset-top),16px)]
        pb-[max(env(safe-area-inset-bottom),24px)]
      "
    >
      <div className="mx-auto w-full max-w-md">
        {children}
      </div>
    </main>
  );
}
