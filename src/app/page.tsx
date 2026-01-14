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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="font-semibold text-foreground text-xl tracking-tight">
              Keyboard Visualizer
            </h1>
            <p className="text-muted-foreground text-sm">
              Press keys to see them highlighted in real-time
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Main content */}
        <div className="space-y-10">
          <section className="overflow-x-auto">
            <Keyboard
              onClearVisited={clearVisited}
              onToggleNumpad={() => setShowNumpad(!showNumpad)}
              pressedKeys={pressedKeys}
              showNumpad={showNumpad}
              visitedKeys={visitedKeys}
            />
          </section>

          <section>
            <KeyLog events={eventLog} onClear={clearLog} />
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-border/40 border-t pt-6">
          <p className="text-center text-muted-foreground/60 text-xs">
            Built with Next.js, Tailwind CSS, and Shadcn/UI
          </p>
        </footer>
      </main>
    </div>
  );
}
