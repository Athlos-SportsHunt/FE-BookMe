
import { Ball, Cricket as CricketGame, Dumbbell, Waves } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Sport icon mapping
export const sportIconMap: Record<string, LucideIcon> = {
  "Football": Ball,
  "Cricket": CricketGame,
  "Basketball": Ball, // Using Ball as a substitute for Basketball
  "Tennis": Ball, // Using Ball as a substitute for Tennis
  "Badminton": Dumbbell, // Using Dumbbell as a substitute for Badminton
  "Volleyball": Ball, // Using Ball as a substitute for Volleyball
  "Swimming": Waves,
  "default": Ball
};

// Function to get the icon component for a sport
export const getSportIcon = (sport: string): LucideIcon => {
  return sportIconMap[sport] || sportIconMap.default;
};
