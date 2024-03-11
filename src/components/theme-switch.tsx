"use client";

import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
  variant?: "icon" | "text";
}

export function ThemeSwitch({ className, variant }: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  const changeTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <>
      {variant === "text" ? (
        <span className={cn("cursor-pointer", className)} onClick={changeTheme}>
          <span className="dark:hidden">Switch to dark theme</span>
          <span className="hidden dark:block">Switch to light theme</span>
        </span>
      ) : (
        <Button
          onClick={changeTheme}
          className={cn("border-none hover:bg-transparent", className)}
          variant="outline"
          size="icon"
        >
          <Moon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Sun className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Switch theme</span>
        </Button>
      )}
    </>
  );
}
