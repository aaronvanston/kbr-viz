"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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

function EventTypeBadge({ type }: { type: KeyEventEntry["type"] }) {
  const config = {
    keydown: {
      label: "DOWN",
      className: "bg-green-500/20 text-green-600 border-green-500/30",
    },
    keyup: {
      label: "UP",
      className: "bg-red-500/20 text-red-600 border-red-500/30",
    },
    keypress: {
      label: "PRESS",
      className: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    },
  };

  const { label, className } = config[type];

  return (
    <Badge className={`font-mono text-xs ${className}`} variant="outline">
      {label}
    </Badge>
  );
}

function ModifierBadges({
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
    <span className="text-muted-foreground text-xs">+{active.join("+")}</span>
  );
}

export function KeyLog({ events, onClear }: KeyLogProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new events are added
  const eventsLength = events.length;
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [eventsLength]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium text-base">Key Event Log</CardTitle>
        <Button onClick={onClear} size="sm" variant="outline">
          Clear
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full rounded-md border">
          <div className="space-y-1 p-4" ref={scrollRef}>
            {events.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground text-sm">
                Press any key to see events here
              </p>
            ) : (
              events.map((event) => (
                <div
                  className="flex items-center gap-3 py-1 font-mono text-sm"
                  key={event.id}
                >
                  <span className="w-24 text-muted-foreground text-xs">
                    {formatTime(event.timestamp)}
                  </span>
                  <EventTypeBadge type={event.type} />
                  <span className="w-28 font-medium">{event.code}</span>
                  <span className="text-muted-foreground">
                    &quot;{event.key}&quot;
                  </span>
                  <ModifierBadges modifiers={event.modifiers} />
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
