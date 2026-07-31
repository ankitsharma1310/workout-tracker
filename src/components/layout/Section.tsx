import type { ReactNode } from "react";

export default function Section({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-6">
      {title && (
        <h2 className="mb-3 text-xl font-bold">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}
