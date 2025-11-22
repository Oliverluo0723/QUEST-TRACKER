import React from "react";
import { cn } from "@/lib/utils";

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "destructive";
}

export function PixelCard({ className, children, ...props }: PixelCardProps) {
  return (
    <div
      className={cn(
        "relative bg-white p-6 font-pixel text-sm text-black",
        "before:absolute before:-top-1 before:left-1 before:right-1 before:h-1 before:bg-black",
        "after:absolute after:-bottom-1 after:left-1 after:right-1 after:h-1 after:bg-black",
        "shadow-[4px_0_0_0_#000,-4px_0_0_0_#000]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
