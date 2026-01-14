"use client";

import type { KeyDefinition } from "@/lib/layouts/types";
import { cn } from "@/lib/utils";

interface KeyProps {
  keyDef: KeyDefinition;
  isPressed: boolean;
  isVisited: boolean;
  isShiftPressed?: boolean;
  baseSize?: number;
}

function getKeyStateClass(isPressed: boolean, isVisited: boolean): string {
  if (isPressed) {
    return "translate-y-[2px] border-primary/80 bg-primary text-primary-foreground shadow-none ring-2 ring-primary/30";
  }
  if (isVisited) {
    return "border-emerald-500/30 bg-emerald-500/5 text-foreground shadow-[0_2px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.05)]";
  }
  return "border-border/60 bg-gradient-to-b from-card to-card/80 text-foreground shadow-[0_2px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.05)] hover:from-accent/50 hover:to-accent/30";
}

export function Key({
  keyDef,
  isPressed,
  isVisited,
  isShiftPressed = false,
  baseSize = 44,
}: KeyProps) {
  const width = (keyDef.width || 1) * baseSize;
  const displayLabel =
    isShiftPressed && keyDef.shiftLabel ? keyDef.shiftLabel : keyDef.label;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-md border font-medium transition-all duration-100 ease-out",
        "select-none text-xs tracking-tight",
        getKeyStateClass(isPressed, isVisited)
      )}
      style={{
        width: `${width}px`,
        height: `${baseSize}px`,
        minWidth: `${width}px`,
      }}
    >
      {/* Visited indicator */}
      {isVisited && !isPressed && (
        <span className="absolute top-1 right-1 h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
      )}
      {/* Shift label */}
      {keyDef.shiftLabel && !isShiftPressed && (
        <span className="absolute top-0.5 left-1 font-normal text-[8px] text-muted-foreground/70">
          {keyDef.shiftLabel}
        </span>
      )}
      <span
        className={cn(
          "truncate px-1",
          keyDef.shiftLabel && !isShiftPressed ? "mt-1.5" : ""
        )}
      >
        {displayLabel}
      </span>
    </div>
  );
}
