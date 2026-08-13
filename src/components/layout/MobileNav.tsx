import {
  Home,
  Dumbbell,
  History,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  {
    to: "/",
    label: "Home",
    icon: Home,
  },
  {
    to: "/workout",
    label: "Workout",
    icon: Dumbbell,
  },
  {
    to: "/history",
    label: "History",
    icon: History,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-md items-center justify-around px-2 pt-2 pb-[max(env(safe-area-inset-bottom),8px)]">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                "flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] transition",
                isActive
                  ? "text-blue-400"
                  : "text-zinc-500 active:text-zinc-300",
              ].join(" ")
            }
          >
            <Icon size={21} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
