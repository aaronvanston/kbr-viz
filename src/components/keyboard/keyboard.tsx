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
  const baseSize = 48;
  const gap = 4;

  // Main keyboard rows (0-5 are the main keys)
  const mainKeyboardRows = ansiQwerty.mainRows.slice(0, 6);
  // Navigation cluster
  const navCluster = ansiQwerty.mainRows.slice(6, 8);
  // Arrow keys
  const arrowRows = ansiQwerty.mainRows.slice(8);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-semibold text-foreground text-lg">
            {ansiQwerty.name}
          </h2>
          <span className="text-muted-foreground text-sm">
            {visitedKeys.size} keys pressed
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onClearVisited} size="sm" variant="outline">
            Reset Visited
          </Button>
          <Button onClick={onToggleNumpad} size="sm" variant="outline">
            {showNumpad ? "Hide Numpad" : "Show Numpad"}
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
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
        <div className="flex flex-col gap-4">
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
          <div className="flex flex-col gap-4">
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
