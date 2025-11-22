import { PixelCard } from "./ui/PixelCard";
import { PixelButton } from "./ui/PixelButton";
import { Check, Trash2 } from "lucide-react";

export interface Quest {
  id: string;
  title: string;
  xpReward: number;
  completed: boolean;
}

interface QuestListProps {
  quests: Quest[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function QuestList({ quests, onComplete, onDelete }: QuestListProps) {
  if (quests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 font-pixel text-xs">
        NO QUESTS AVAILABLE...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {quests.map((quest) => (
          <PixelCard
            key={quest.id}
            className={`transition-all ${
              quest.completed
                ? "opacity-50 bg-gray-100"
                : "hover:-translate-y-1"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3
                  className={`font-bold mb-1 ${
                    quest.completed ? "line-through" : ""
                  }`}
                >
                  {quest.title}
                </h3>
                <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-0.5 border-2 border-yellow-600 inline-block">
                  +{quest.xpReward} XP
                </span>
              </div>

              <div className="flex gap-2">
                {!quest.completed && (
                  <PixelButton
                    variant="primary"
                    size="sm"
                    onClick={() => onComplete(quest.id)}
                    title="Complete Quest"
                  >
                    <Check className="w-4 h-4" />
                  </PixelButton>
                )}
                <PixelButton
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(quest.id)}
                  title="Abandon Quest"
                >
                  <Trash2 className="w-4 h-4" />
                </PixelButton>
              </div>
            </div>
          </PixelCard>
        ))}
      </div>
    </>
  );
}
