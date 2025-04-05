
import { Football, ActivitySquare, Dumbbell, Waves, Badminton as BadmintonIcon } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Sport icon mapping
export const sportIconMap: Record<string, LucideIcon> = {
  "Football": Football,
  "Cricket": ActivitySquare,  // Using ActivitySquare as a substitute for Cricket
  "Basketball": Football,     // Using Football as a substitute for Basketball
  "Tennis": ActivitySquare,   // Using ActivitySquare as a substitute for Tennis
  "Badminton": BadmintonIcon, // Using Badminton icon
  "Volleyball": Football,     // Using Football as a substitute for Volleyball
  "Swimming": Waves,
  "default": Football
};

// Function to get the icon component for a sport
export const getSportIcon = (sport: string): LucideIcon => {
  return sportIconMap[sport] || sportIconMap.default;
};
