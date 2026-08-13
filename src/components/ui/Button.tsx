import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Props =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
  };

export default function Button({
  children,
  className = "",
  type,
  ...props
}: Props) {
  return (
    <button
      type={type ?? "button"}
      {...props}
      className={[
        "inline-flex min-h-11 w-full",
        "items-center justify-center",
        "rounded-xl px-4 py-2.5",
        "bg-blue-600 text-sm font-semibold text-white",
        "transition active:scale-[0.98]",
        "disabled:pointer-events-none disabled:opacity-50",
        "hover:bg-blue-500",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
