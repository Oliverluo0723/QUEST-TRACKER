import { useState, useEffect } from "react";
import { PlayerStats } from "./components/PlayerStats";
import { QuestList, type Quest } from "./components/QuestList";
import { AddQuestForm } from "./components/AddQuestForm";
import { PixelCard } from "./components/ui/PixelCard";
import { PixelButton } from "./components/ui/PixelButton";
import { RandomQuestGenerator } from "./components/RandomQuestGenerator";
import {
  playSuccessSound,
  playLevelUpSound,
  playDeleteSound,
} from "./lib/audio";

function App() {
  // ... (state initialization remains same)
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem("quest-level");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem("quest-xp");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [quests, setQuests] = useState<Quest[]>(() => {
    const saved = localStorage.getItem("quest-list");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "1", title: "Drink Water", xpReward: 50, completed: false },
          {
            id: "2",
            title: "Code for 1 hour",
            xpReward: 100,
            completed: false,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("quest-level", level.toString());
    localStorage.setItem("quest-xp", xp.toString());
    localStorage.setItem("quest-list", JSON.stringify(quests));
  }, [level, xp, quests]);

  const nextLevelXp = level * 100;

  const handleAddQuest = (title: string, xpReward: number) => {
    const newQuest: Quest = {
      id: Date.now().toString(),
      title,
      xpReward,
      completed: false,
    };
    setQuests([...quests, newQuest]);
  };

  const handleCompleteQuest = (id: string) => {
    const quest = quests.find((q) => q.id === id);
    if (!quest || quest.completed) return;

    setQuests(quests.map((q) => (q.id === id ? { ...q, completed: true } : q)));

    let newXp = xp + quest.xpReward;
    let newLevel = level;

    if (newXp >= nextLevelXp) {
      newXp -= nextLevelXp;
      newLevel += 1;
      playLevelUpSound();
      alert("LEVEL UP! YOU ARE NOW LEVEL " + newLevel);
    } else {
      playSuccessSound();
    }

    setXp(newXp);
    setLevel(newLevel);
  };

  const handleDeleteQuest = (id: string) => {
    playDeleteSound();
    setQuests(quests.filter((q) => q.id !== id));
  };

  const handleClearAllQuests = () => {
    playDeleteSound();
    setQuests([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex justify-center font-pixel">
      <div className="w-full max-w-5xl">
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
            QUEST TRACKER
          </h1>
          <p className="text-xs text-gray-500 mt-2">8-BIT EDITION</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Sidebar (Desktop) / Top (Mobile) */}
          <div className="md:col-span-1 space-y-6">
            <PlayerStats level={level} xp={xp} nextLevelXp={nextLevelXp} />

            <RandomQuestGenerator onAddQuest={handleAddQuest} />
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <AddQuestForm onAdd={handleAddQuest} />

            <div className="relative">
              <div className="absolute -top-3 left-4 z-10 bg-gray-100 px-2 text-xs font-bold text-gray-500">
                ACTIVE QUESTS
              </div>
              <PixelCard>
                <QuestList
                  quests={quests}
                  onComplete={handleCompleteQuest}
                  onDelete={handleDeleteQuest}
                />
              </PixelCard>
            </div>
            <PixelButton
              variant="destructive"
              size="sm"
              onClick={handleClearAllQuests}
              title="Clear All Quests"
            >
              Clear All Quests
            </PixelButton>
          </div>
        </div>

        <footer className="text-center text-[10px] text-gray-400 mt-12 flex flex-col gap-2">
          <span>PRESS START TO BEGIN</span>
          <span>DEV BY BD</span>
          <a
            className="text-blue-600 hover:underline"
            href="https://github.com/Oliverluo0723"
          >
            GitHub
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;
