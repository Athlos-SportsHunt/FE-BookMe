
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Plus, 
  Settings, 
  Calendar, 
  DollarSign, 
  LogOut, 
  Menu, 
  X, 
  Football,
  LayoutDashboard 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const HostSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

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
            <Football className="h-6 w-6 text-sporty-600" />
            <span className="font-bold text-lg text-gray-900">Host Portal</span>
          </div>
        )}
        {collapsed && <Football className="h-6 w-6 text-sporty-600 mx-auto" />}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-sporty-600"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
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
            <LayoutDashboard size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
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
            <Plus size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
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
            <Calendar size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
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
            <DollarSign size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
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
            <Settings size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
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
            <Home size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
            {!collapsed && <span>Back to Main Site</span>}
          </Button>
        </Link>
        <Link to="/logout">
          <Button
            variant="ghost"
            className="w-full justify-start py-3 px-4 text-gray-600 hover:bg-sporty-50 hover:text-sporty-600"
          >
            <LogOut size={20} className={cn(collapsed ? "mx-auto" : "mr-3")} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HostSidebar;
