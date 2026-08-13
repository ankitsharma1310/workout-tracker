import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import MobileNav from "./MobileNav";

export default function Page({
  children,
}: {
  children: ReactNode;
}) {
  const { pathname } = useLocation();

  const hideNav =
    pathname.startsWith("/workout") ||
    pathname.startsWith("/workout-complete");

  return (
    <main
      className={[
        "min-h-dvh bg-zinc-950 text-white",
        "pt-[max(env(safe-area-inset-top),16px)]",
        hideNav
          ? "pb-[max(env(safe-area-inset-bottom),24px)]"
          : "pb-[calc(max(env(safe-area-inset-bottom),24px)+76px)]",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-md px-4">
        {children}
      </div>

      {!hideNav && <MobileNav />}
    </main>
  );
}
