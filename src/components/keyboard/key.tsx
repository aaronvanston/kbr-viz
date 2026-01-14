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
    return "scale-95 border-primary bg-primary text-primary-foreground shadow-inner";
  }
  if (isVisited) {
    return "border-green-500/50 bg-green-500/10 text-card-foreground shadow-sm";
  }
  return "border-border bg-card text-card-foreground shadow-sm hover:bg-accent/50";
}

export function Key({
  keyDef,
  isPressed,
  isVisited,
  isShiftPressed = false,
  baseSize = 48,
}: KeyProps) {
  const width = (keyDef.width || 1) * baseSize;
  const displayLabel =
    isShiftPressed && keyDef.shiftLabel ? keyDef.shiftLabel : keyDef.label;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-lg border font-medium transition-all duration-75",
        "select-none text-sm",
        getKeyStateClass(isPressed, isVisited)
      )}
      style={{
        width: `${width}px`,
        height: `${baseSize}px`,
        minWidth: `${width}px`,
      }}
    >
      {/* Visited indicator dot */}
      {isVisited && !isPressed && (
        <span className="absolute top-1 right-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
      )}
      {keyDef.shiftLabel && !isShiftPressed && (
        <span className="absolute top-1 left-1.5 text-[10px] text-muted-foreground">
          {keyDef.shiftLabel}
        </span>
      )}
      <span className={keyDef.shiftLabel ? "mt-1" : ""}>{displayLabel}</span>
    </div>
  );
}
