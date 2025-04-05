
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FootballIcon } from "@/utils/sportIcons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const HostSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  // Custom icon components
  const HomeIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );

  const PlusIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const SettingsIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );

  const CalendarIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const DollarSignIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );

  const LogOutIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  const MenuIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

  const XIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  const DashboardIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );

  return (
    <div
      className={cn(
        "flex flex-col bg-white border-r border-gray-200 transition-all duration-300 h-screen sticky top-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <FootballIcon className="h-6 w-6 text-sporty-600" />
            <span className="font-bold text-lg text-gray-900">Host Portal</span>
          </div>
        )}
        {collapsed && <FootballIcon className="h-6 w-6 text-sporty-600 mx-auto" />}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-sporty-600"
        >
          {collapsed ? <MenuIcon size={20} /> : <XIcon size={20} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        <Link to="/host/dashboard">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start py-3 px-4",
              isActive("/host/dashboard")
                ? "bg-sporty-50 text-sporty-700"
                : "text-gray-600 hover:bg-sporty-50 hover:text-sporty-600"
            )}
          >
            <DashboardIcon className={cn(collapsed ? "mx-auto" : "mr-3")} size={20} />
            {!collapsed && <span>Dashboard</span>}
          </Button>
        </Link>

        <Link to="/host/create-venue">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start py-3 px-4",
              isActive("/host/create-venue")
                ? "bg-sporty-50 text-sporty-700"
                : "text-gray-600 hover:bg-sporty-50 hover:text-sporty-600"
            )}
          >
            <PlusIcon className={cn(collapsed ? "mx-auto" : "mr-3")} size={20} />
            {!collapsed && <span>Create Venue</span>}
          </Button>
        </Link>

        {!collapsed && (
          <div className="pt-4 pb-2">
            <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Management
            </div>
          </div>
        )}
        {collapsed && <div className="border-t my-4 border-gray-200"></div>}

        <Link to="/host/bookings">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start py-3 px-4",
              isActive("/host/bookings")
                ? "bg-sporty-50 text-sporty-700"
                : "text-gray-600 hover:bg-sporty-50 hover:text-sporty-600"
            )}
          >
            <CalendarIcon className={cn(collapsed ? "mx-auto" : "mr-3")} size={20} />
            {!collapsed && <span>Bookings</span>}
          </Button>
        </Link>

        <Link to="/host/earnings">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start py-3 px-4",
              isActive("/host/earnings")
                ? "bg-sporty-50 text-sporty-700"
                : "text-gray-600 hover:bg-sporty-50 hover:text-sporty-600"
            )}
          >
            <DollarSignIcon className={cn(collapsed ? "mx-auto" : "mr-3")} size={20} />
            {!collapsed && <span>Earnings</span>}
          </Button>
        </Link>

        <Link to="/host/settings">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start py-3 px-4",
              isActive("/host/settings")
                ? "bg-sporty-50 text-sporty-700"
                : "text-gray-600 hover:bg-sporty-50 hover:text-sporty-600"
            )}
          >
            <SettingsIcon className={cn(collapsed ? "mx-auto" : "mr-3")} size={20} />
            {!collapsed && <span>Settings</span>}
          </Button>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Link to="/">
          <Button
            variant="ghost"
            className="w-full justify-start py-3 px-4 text-gray-600 hover:bg-sporty-50 hover:text-sporty-600"
          >
            <HomeIcon className={cn(collapsed ? "mx-auto" : "mr-3")} size={20} />
            {!collapsed && <span>Back to Main Site</span>}
          </Button>
        </Link>
        <Link to="/logout">
          <Button
            variant="ghost"
            className="w-full justify-start py-3 px-4 text-gray-600 hover:bg-sporty-50 hover:text-sporty-600"
          >
            <LogOutIcon className={cn(collapsed ? "mx-auto" : "mr-3")} size={20} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HostSidebar;
