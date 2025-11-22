import React from "react";
import { cn } from "@/lib/utils";
import { playClickSound } from "@/lib/audio";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
}

export function PixelButton({ 
  className, 
  variant = "default", 
  size = "md", 
  children, 
  onClick,
  ...props 
}: PixelButtonProps) {
  const variants = {
    default: "bg-white text-black hover:bg-gray-100",
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "bg-transparent text-black border-2 border-black hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    onClick?.(e);
  };

  return (
    <button
      className={cn(
        "relative font-pixel uppercase transition-transform active:translate-y-1",
        // Pixel borders using box-shadow for that crisp 8-bit look
        "shadow-[inset_-4px_-4px_0px_0px_rgba(0,0,0,0.2)]",
        "border-4 border-black",
        variants[variant],
        sizes[size],
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
