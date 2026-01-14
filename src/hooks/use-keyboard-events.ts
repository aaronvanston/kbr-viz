"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyEventEntry } from "@/types/keyboard";

interface UseKeyboardEventsReturn {
  pressedKeys: Set<string>;
  visitedKeys: Set<string>;
  eventLog: KeyEventEntry[];
  clearLog: () => void;
  clearVisited: () => void;
}

export function useKeyboardEvents(): UseKeyboardEventsReturn {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [visitedKeys, setVisitedKeys] = useState<Set<string>>(new Set());
  const [eventLog, setEventLog] = useState<KeyEventEntry[]>([]);
  const pressedKeysRef = useRef<Set<string>>(new Set());
  const visitedKeysRef = useRef<Set<string>>(new Set());

  const createEventEntry = useCallback(
    (type: KeyEventEntry["type"], event: KeyboardEvent): KeyEventEntry => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type,
      code: event.code,
      key: event.key,
      timestamp: new Date(),
      modifiers: {
        shift: event.shiftKey,
        ctrl: event.ctrlKey,
        alt: event.altKey,
        meta: event.metaKey,
      },
    }),
    []
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Prevent default for certain keys to avoid browser shortcuts
      if (
        event.code === "Tab" ||
        event.code === "F1" ||
        event.code === "F5" ||
        event.code === "F11" ||
        event.code === "F12"
      ) {
        event.preventDefault();
      }

      // Only log if key wasn't already pressed (avoid repeat events)
      if (!pressedKeysRef.current.has(event.code)) {
        pressedKeysRef.current.add(event.code);
        setPressedKeys(new Set(pressedKeysRef.current));

        // Track visited keys
        visitedKeysRef.current.add(event.code);
        setVisitedKeys(new Set(visitedKeysRef.current));

        const entry = createEventEntry("keydown", event);
        setEventLog((prev) => [...prev, entry]);
      }
    },
    [createEventEntry]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (pressedKeysRef.current.has(event.code)) {
        pressedKeysRef.current.delete(event.code);
        setPressedKeys(new Set(pressedKeysRef.current));

        // Log keyup event
        const keyupEntry = createEventEntry("keyup", event);
        setEventLog((prev) => [...prev, keyupEntry]);

        // Log combined keypress event (down + up = press)
        const keypressEntry = createEventEntry("keypress", event);
        setEventLog((prev) => [...prev, keypressEntry]);
      }
    },
    [createEventEntry]
  );

  const clearLog = useCallback(() => {
    setEventLog([]);
  }, []);

  const clearVisited = useCallback(() => {
    visitedKeysRef.current.clear();
    setVisitedKeys(new Set());
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Handle window blur - clear all pressed keys
    const handleBlur = () => {
      pressedKeysRef.current.clear();
      setPressedKeys(new Set());
    };
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    pressedKeys,
    visitedKeys,
    eventLog,
    clearLog,
    clearVisited,
  };
}
