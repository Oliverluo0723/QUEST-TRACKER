import { PixelCard } from "./ui/PixelCard";
import { ProgressBar } from "./ui/ProgressBar";

interface PlayerStatsProps {
  level: number;
  xp: number;
  nextLevelXp: number;
}

export function PlayerStats({ level, xp, nextLevelXp }: PlayerStatsProps) {
  // Determine avatar based on level
  const getAvatar = (lvl: number) => {
    if (lvl >= 50) return "👑"; // King/God
    if (lvl >= 25) return "🐉"; // Dragon
    if (lvl >= 10) return "🧙‍♂️"; // Wizard
    if (lvl >= 5) return "⚔️"; // Knight
    if (lvl >= 2) return "🛡️"; // Squire
    return "👶"; // Novice
  };

  return (
    <PixelCard className="mb-6 bg-slate-100">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 border-4 border-black bg-blue-400 p-1">
          <div className="h-full w-full bg-blue-300 flex items-center justify-center text-3xl">
            {getAvatar(level)}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-lg font-bold">HERO</h2>
            <span className="text-xl text-blue-600">LVL {level}</span>
          </div>
          <ProgressBar 
            value={xp} 
            max={nextLevelXp} 
            color="bg-yellow-400" 
            label="EXP" 
          />
        </div>
      </div>
    </PixelCard>
  );
}
