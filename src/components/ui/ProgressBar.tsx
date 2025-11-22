import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  color?: string;
  label?: string;
}

export function ProgressBar({ 
  value, 
  max = 100, 
  color = "bg-green-500", 
  label,
  className,
  ...props 
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {label && (
        <div className="flex justify-between text-xs font-pixel mb-1">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className="relative h-6 w-full border-4 border-black bg-gray-200 p-0.5">
        <div
          className={cn("h-full transition-all duration-300", color)}
          style={{ width: `${percentage}%` }}
        />
        {/* Shine effect */}
        <div className="absolute top-1 left-1 right-1 h-1 bg-white/20 pointer-events-none" />
      </div>
    </div>
  );
}
