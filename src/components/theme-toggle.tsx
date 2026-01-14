"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button className="w-24" size="sm" variant="outline">
        <span className="text-muted-foreground">Theme</span>
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "light") {
      return "Sun";
    }
    if (theme === "dark") {
      return "Moon";
    }
    return "System";
  };

  return (
    <Button className="w-24" onClick={cycleTheme} size="sm" variant="outline">
      {getIcon()}
    </Button>
  );
}
