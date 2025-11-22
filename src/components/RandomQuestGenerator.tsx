import { useState, useEffect } from "react";
import { PixelCard } from "./ui/PixelCard";
import { PixelButton } from "./ui/PixelButton";
import { Sparkles, RefreshCw, Plus } from "lucide-react";

const DAILY_RITUALS = [
    { title: "Drink a glass of water", xp: 20 },
    { title: "Stretch for 5 minutes", xp: 30 },
    { title: "Take a deep breath", xp: 10 },
    { title: "Tidy up your desk", xp: 50 },
    { title: "Read 1 page of a book", xp: 40 },
    { title: "Write down 3 gratitudes", xp: 60 },
    { title: "Look out the window", xp: 15 },
    { title: "High-five yourself", xp: 100 },
    { title: "Eat a piece of fruit", xp: 25 },
    { title: "Listen to a favorite song", xp: 30 },
];

interface RandomQuestGeneratorProps {
    onAddQuest: (title: string, xp: number) => void;
}

export function RandomQuestGenerator({
    onAddQuest,
}: RandomQuestGeneratorProps) {
    const [currentQuest, setCurrentQuest] = useState(DAILY_RITUALS[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    const rollQuest = () => {
        setIsAnimating(true);
        setTimeout(() => {
            const random =
                DAILY_RITUALS[Math.floor(Math.random() * DAILY_RITUALS.length)];
            setCurrentQuest(random);
            setIsAnimating(false);
        }, 300);
    };

    useEffect(() => {
        rollQuest();
    }, []);

    return (
        <PixelCard className="bg-purple-50 border-purple-900 h-fit">
            <div className="flex items-center gap-2 mb-4 text-purple-900">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-sm">DAILY RITUAL</h3>
            </div>

            <div
                className={`mb-6 transition-opacity duration-300 ${
                    isAnimating ? "opacity-0" : "opacity-100"
                }`}
            >
                <p className="text-lg font-bold mb-2 min-h-14 flex items-center">
                    {currentQuest.title}
                </p>
                <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-none border border-purple-800">
                    +{currentQuest.xp} XP
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <PixelButton
                    variant="primary"
                    className="w-full bg-purple-600 hover:bg-purple-700 border-purple-900 flex items-center justify-center gap-2"
                    onClick={() =>
                        onAddQuest(currentQuest.title, currentQuest.xp)
                    }
                >
                    <Plus className="w-4 h-4" />
                    ACCEPT QUEST
                </PixelButton>

                <PixelButton
                    variant="outline"
                    className="w-full border-purple-900 text-purple-900 hover:bg-purple-100 flex items-center justify-center gap-2"
                    onClick={rollQuest}
                >
                    <RefreshCw className="w-4 h-4" />
                    REROLL
                </PixelButton>
            </div>
        </PixelCard>
    );
}
