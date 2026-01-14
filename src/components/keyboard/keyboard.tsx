"use client";

import { Button } from "@/components/ui/button";
import { ansiQwerty } from "@/lib/layouts";
import { Key } from "./key";

interface KeyboardProps {
  pressedKeys: Set<string>;
  visitedKeys: Set<string>;
  showNumpad: boolean;
  onToggleNumpad: () => void;
  onClearVisited: () => void;
}

export function Keyboard({
  pressedKeys,
  visitedKeys,
  showNumpad,
  onToggleNumpad,
  onClearVisited,
}: KeyboardProps) {
  const isShiftPressed =
    pressedKeys.has("ShiftLeft") || pressedKeys.has("ShiftRight");
  const baseSize = 44;
  const gap = 3;

  // Main keyboard rows (0-5 are the main keys)
  const mainKeyboardRows = ansiQwerty.mainRows.slice(0, 6);
  // Navigation cluster
  const navCluster = ansiQwerty.mainRows.slice(6, 8);
  // Arrow keys
  const arrowRows = ansiQwerty.mainRows.slice(8);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-foreground text-sm tracking-tight">
            Keyboard
          </h2>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
              {visitedKeys.size} pressed
            </span>
            {visitedKeys.size > 0 && (
              <button
                className="text-[10px] text-muted-foreground transition-colors hover:text-foreground"
                onClick={onClearVisited}
                type="button"
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <Button
          className="h-7 px-2 text-xs"
          onClick={onToggleNumpad}
          variant="ghost"
        >
          {showNumpad ? "Hide Numpad" : "Show Numpad"}
        </Button>
      </div>

      {/* Keyboard container */}
      <div className="inline-flex gap-5 rounded-xl border border-border/40 bg-gradient-to-b from-muted/30 to-muted/10 p-4 backdrop-blur-sm">
        {/* Main keyboard section */}
        <div className="flex flex-col" style={{ gap: `${gap}px` }}>
          {mainKeyboardRows.map((row, rowIndex) => (
            <div className="flex" key={rowIndex} style={{ gap: `${gap}px` }}>
              {row.map((keyDef) => (
                <Key
                  baseSize={baseSize}
                  isPressed={pressedKeys.has(keyDef.code)}
                  isShiftPressed={isShiftPressed}
                  isVisited={visitedKeys.has(keyDef.code)}
                  key={keyDef.code}
                  keyDef={keyDef}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Navigation and arrow keys */}
        <div className="flex flex-col gap-3">
          {/* Spacer for function row */}
          <div style={{ height: `${baseSize}px` }} />

          {/* Navigation cluster */}
          <div className="flex flex-col" style={{ gap: `${gap}px` }}>
            {navCluster.map((row, rowIndex) => (
              <div className="flex" key={rowIndex} style={{ gap: `${gap}px` }}>
                {row.map((keyDef) => (
                  <Key
                    baseSize={baseSize}
                    isPressed={pressedKeys.has(keyDef.code)}
                    isShiftPressed={isShiftPressed}
                    isVisited={visitedKeys.has(keyDef.code)}
                    key={keyDef.code}
                    keyDef={keyDef}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Spacer before arrow keys */}
          <div style={{ height: `${baseSize}px` }} />

          {/* Arrow keys */}
          <div
            className="flex flex-col items-center"
            style={{ gap: `${gap}px` }}
          >
            {arrowRows.map((row, rowIndex) => (
              <div className="flex" key={rowIndex} style={{ gap: `${gap}px` }}>
                {row.map((keyDef) => (
                  <Key
                    baseSize={baseSize}
                    isPressed={pressedKeys.has(keyDef.code)}
                    isShiftPressed={isShiftPressed}
                    isVisited={visitedKeys.has(keyDef.code)}
                    key={keyDef.code}
                    keyDef={keyDef}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Numpad */}
        {showNumpad && (
          <div className="flex flex-col gap-3 border-border/30 border-l pl-5">
            {/* Spacer for function row */}
            <div style={{ height: `${baseSize}px` }} />

            <div className="flex flex-col" style={{ gap: `${gap}px` }}>
              {ansiQwerty.numpadRows.map((row, rowIndex) => (
                <div
                  className="flex"
                  key={rowIndex}
                  style={{ gap: `${gap}px` }}
                >
                  {row.map((keyDef) => (
                    <Key
                      baseSize={baseSize}
                      isPressed={pressedKeys.has(keyDef.code)}
                      isShiftPressed={isShiftPressed}
                      isVisited={visitedKeys.has(keyDef.code)}
                      key={keyDef.code}
                      keyDef={keyDef}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
