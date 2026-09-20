import { Button } from "@omnidotdev/thornberry/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect } from "react";

import { useTheme } from "@/providers/ThemeProvider";

/**
 * Theme toggle. Click the button or press `T` (the Omni template staple).
 */
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // `T` toggles the theme, unless the user is typing into a field
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "t") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "")
      ) {
        return;
      }

      event.preventDefault();
      toggleTheme();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode (T)`}
      title="Toggle theme (T)"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default ThemeToggle;
