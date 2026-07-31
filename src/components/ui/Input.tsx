import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 outline-none transition",
        "focus:border-blue-500",
        className
      )}
    />
  );
}
