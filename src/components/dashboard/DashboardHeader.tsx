import { Dumbbell } from "lucide-react";

export default function DashboardHeader() {

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (

    <div className="mb-8">

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-blue-600 p-4">

          <Dumbbell size={32} />

        </div>

        <div>

          <h1 className="text-3xl font-bold">
            {greeting}
          </h1>

          <p className="text-zinc-400">
            Ready for today's workout?
          </p>

        </div>

      </div>

    </div>

  );

}
