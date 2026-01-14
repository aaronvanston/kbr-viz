"use client";

import { useState } from "react";
import { KeyLog } from "@/components/key-log";
import { Keyboard } from "@/components/keyboard/keyboard";
import { ThemeToggle } from "@/components/theme-toggle";
import { useKeyboardEvents } from "@/hooks/use-keyboard-events";

export default function Home() {
  const { pressedKeys, visitedKeys, eventLog, clearLog, clearVisited } =
    useKeyboardEvents();
  const [showNumpad, setShowNumpad] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="font-bold text-3xl text-foreground tracking-tight">
              Keyboard Visualizer
            </h1>
            <p className="mt-1 text-muted-foreground">
              Press keys on your keyboard to see them highlighted in real-time
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="space-y-8">
          <div className="overflow-x-auto pb-4">
            <Keyboard
              onClearVisited={clearVisited}
              onToggleNumpad={() => setShowNumpad(!showNumpad)}
              pressedKeys={pressedKeys}
              showNumpad={showNumpad}
              visitedKeys={visitedKeys}
            />
          </div>

          <KeyLog events={eventLog} onClear={clearLog} />
        </div>
      </main>
    </div>
  );
}
