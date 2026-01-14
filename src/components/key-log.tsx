"use client";

import { Button } from "@/components/ui/button";
import type { KeyEventEntry } from "@/types/keyboard";

interface KeyLogProps {
  events: KeyEventEntry[];
  onClear: () => void;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  } as Intl.DateTimeFormatOptions);
}

function EventTypeIndicator({ type }: { type: KeyEventEntry["type"] }) {
  const config = {
    keydown: {
      label: "DOWN",
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      dot: "bg-emerald-500",
    },
    keyup: {
      label: "UP",
      bg: "bg-rose-500/10",
      text: "text-rose-500",
      dot: "bg-rose-500",
    },
    keypress: {
      label: "PRESS",
      bg: "bg-sky-500/10",
      text: "text-sky-500",
      dot: "bg-sky-500",
    },
  };

  const { label, bg, text, dot } = config[type];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-medium font-mono text-[10px] uppercase tracking-wider ${bg} ${text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function ModifierIndicator({
  modifiers,
}: {
  modifiers: KeyEventEntry["modifiers"];
}) {
  const active: string[] = [];
  if (modifiers.shift) {
    active.push("Shift");
  }
  if (modifiers.ctrl) {
    active.push("Ctrl");
  }
  if (modifiers.alt) {
    active.push("Alt");
  }
  if (modifiers.meta) {
    active.push("Cmd");
  }

  if (active.length === 0) {
    return null;
  }

  return (
    <span className="rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-[10px] text-amber-600 dark:text-amber-400">
      +{active.join("+")}
    </span>
  );
}

export function KeyLog({ events, onClear }: KeyLogProps) {
  // Reverse events so newest appear at top
  const reversedEvents = [...events].reverse();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-foreground text-sm tracking-tight">
            Event Log
          </h2>
          <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            {events.length} events
          </span>
        </div>
        <Button
          className="h-7 px-2 text-xs"
          disabled={events.length === 0}
          onClick={onClear}
          variant="ghost"
        >
          Clear
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
        {/* Table Header */}
        <div className="grid grid-cols-[100px_70px_1fr_80px_auto] gap-4 border-border/50 border-b bg-muted/30 px-4 py-2 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
          <span>Time</span>
          <span>Type</span>
          <span>Key Code</span>
          <span>Value</span>
          <span>Modifiers</span>
        </div>

        {/* Table Body */}
        <div className="max-h-[240px] overflow-y-auto">
          {events.length === 0 ? (
            <div className="flex h-[120px] items-center justify-center">
              <p className="text-muted-foreground/60 text-sm">
                Press any key to see events
              </p>
            </div>
          ) : (
            reversedEvents.map((event, index) => (
              <div
                className={`grid grid-cols-[100px_70px_1fr_80px_auto] items-center gap-4 px-4 py-2.5 font-mono text-xs transition-colors ${
                  index === 0 ? "bg-primary/5" : "hover:bg-muted/30"
                } ${index !== reversedEvents.length - 1 ? "border-border/30 border-b" : ""}`}
                key={event.id}
              >
                <span className="text-muted-foreground tabular-nums">
                  {formatTime(event.timestamp)}
                </span>
                <EventTypeIndicator type={event.type} />
                <span className="font-medium text-foreground">
                  {event.code}
                </span>
                <span className="text-muted-foreground">
                  &quot;{event.key}&quot;
                </span>
                <ModifierIndicator modifiers={event.modifiers} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
