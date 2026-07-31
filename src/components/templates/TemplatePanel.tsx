import { Trash2 } from "lucide-react";

import Button from "../ui/Button";
import Card from "../ui/Card";

import type { Exercise } from "../../types/workout";
import { useTemplateStore } from "../../store/templateStore";

type Props = {
  onAdd: (exercise: Exercise) => void;
};

export default function TemplatePanel({
  onAdd,
}: Props) {

  const {
    templates,
    deleteTemplate,
  } = useTemplateStore();

  return (

    <Card>

      <h2 className="mb-4 text-lg font-bold">
        Exercise Templates
      </h2>

      {templates.length === 0 && (
        <p className="text-sm text-zinc-500">
          No templates saved.
        </p>
      )}

      <div className="space-y-3">

        {templates.map(template => (

          <div
            key={template.id}
            className="flex items-center justify-between"
          >

            <div>

              <div className="font-semibold">
                {template.exercise.name}
              </div>

              <div className="text-sm text-zinc-500">
                {template.exercise.sets.length} sets
              </div>

            </div>

            <div className="flex gap-2">

              <Button
                className="w-auto px-4"
                onClick={() =>
                  onAdd({
                    ...structuredClone(
                      template.exercise,
                    ),
                    id: crypto.randomUUID(),
                    sets:
                      template.exercise.sets.map(
                        set => ({
                          ...set,
                          id: crypto.randomUUID(),
                          completed: false,
                        }),
                      ),
                  })
                }
              >
                Add
              </Button>

              <Button
                className="w-auto bg-red-600 px-3 hover:bg-red-700"
                onClick={() =>
                  deleteTemplate(template.id)
                }
              >
                <Trash2 size={16} />
              </Button>

            </div>

          </div>

        ))}

      </div>

    </Card>

  );

}
