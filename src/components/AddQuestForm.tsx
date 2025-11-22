import React, { useState } from "react";
import { PixelButton } from "./ui/PixelButton";
import { PixelCard } from "./ui/PixelCard";

interface AddQuestFormProps {
  onAdd: (title: string, xp: number) => void;
}

export function AddQuestForm({ onAdd }: AddQuestFormProps) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const xpRewards = {
      easy: 50,
      medium: 100,
      hard: 200,
    };

    onAdd(title, xpRewards[difficulty]);
    setTitle("");
    setDifficulty("easy");
  };

  return (
    <PixelCard className="mb-6">
      <h3 className="font-bold mb-4 text-center border-b-4 border-gray-200 pb-2">NEW QUEST</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs mb-2">QUEST TITLE</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border-4 border-black font-pixel text-sm focus:outline-none focus:bg-yellow-50"
            placeholder="Defeat the laundry..."
          />
        </div>
        
        <div>
          <label className="block text-xs mb-2">DIFFICULTY</label>
          <div className="flex gap-2">
            {(["easy", "medium", "hard"] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setDifficulty(diff)}
                className={`flex-1 py-2 text-xs border-4 border-black uppercase transition-colors ${
                  difficulty === diff 
                    ? "bg-black text-white" 
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        <PixelButton type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
          ACCEPT QUEST
        </PixelButton>
      </form>
    </PixelCard>
  );
}
