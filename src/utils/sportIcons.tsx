
import React from "react";

interface SportIconProps {
  className?: string;
  size?: number;
}

// Custom Football icon component
export const FootballIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-10H2" />
      <path d="m5 8 4 4" />
      <path d="m15 8-4 4" />
    </svg>
  );
};

// Custom Basketball icon component
export const BasketballIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <circle cx="12" cy="12" r="10" />
      <path d="M4.93 4.93A10 10 0 0 1 19.07 19.07" />
      <path d="M4.93 19.07A10 10 0 0 1 19.07 4.93" />
      <path d="M12 2a10 10 0 0 0 0 20" />
      <path d="M12 22a10 10 0 0 0 0-20" />
    </svg>
  );
};

// Custom Cricket icon component
export const CricketIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <path d="M12 22v-5" />
      <path d="M9 8h6" />
      <path d="M6 11v5" />
      <path d="M18 11v5" />
      <path d="M3 2h18v8H3z" />
      <path d="M8 14h8" />
    </svg>
  );
};

// Custom Tennis icon component
export const TennisIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <circle cx="12" cy="12" r="10" />
      <path d="M18.09 13.5A8 8 0 1 0 14.5 18.1" />
      <path d="M5.95 10.5A8 8 0 0 1 9.5 5.9" />
    </svg>
  );
};

// Custom Badminton icon component
export const BadmintonIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <path d="M12 6v14" />
      <path d="M6 10h12" />
      <path d="m15 3 3 3-9 9-3-3z" />
    </svg>
  );
};

// Custom Volleyball icon component
export const VolleyballIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 12a5 5 0 0 0 5 5" />
      <path d="M12 12a5 5 0 0 1 5-5" />
      <path d="M12 12a5 5 0 0 1-5 5" />
      <path d="M12 12a5 5 0 0 0-5-5" />
    </svg>
  );
};

// Custom Swimming icon component
export const SwimmingIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <path d="M2 12h20" />
      <path d="M5 8c.9-1 2.5-1 3.5 0s2.6 1 3.5 0 2.5-1 3.5 0 2.6 1 3.5 0" />
      <path d="M5 16c.9-1 2.5-1 3.5 0s2.6 1 3.5 0 2.5-1 3.5 0 2.6 1 3.5 0" />
    </svg>
  );
};

// General Activity icon for fallback
export const ActivityIcon: React.FC<SportIconProps> = ({ className = "h-6 w-6", size }) => {
  const sizeClass = size ? `h-${size} w-${size}` : className;
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={sizeClass}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
};

// Sport icon mapping
export const sportIconMap: Record<string, React.FC<SportIconProps>> = {
  "football": FootballIcon,
  "cricket": CricketIcon,
  "basketball": BasketballIcon,
  "tennis": TennisIcon,
  "badminton": BadmintonIcon,
  "volleyball": VolleyballIcon,
  "swimming": SwimmingIcon,
  "default": FootballIcon
};

// Function to get the icon component for a sport
export const getSportIcon = (sport: string): React.FC<SportIconProps> => {
  return sportIconMap[sport] || sportIconMap.default;
};
