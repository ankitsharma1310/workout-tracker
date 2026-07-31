import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={clsx(
        "w-full rounded-xl py-3 font-semibold transition active:scale-95",
        {
          "bg-blue-600 hover:bg-blue-700 text-white":
            variant === "primary",

          "bg-zinc-800 hover:bg-zinc-700 text-white":
            variant === "secondary",

          "bg-red-600 hover:bg-red-700 text-white":
            variant === "danger",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
