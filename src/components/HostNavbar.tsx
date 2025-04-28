import { useState } from "react";
import { Bell, User, ChevronDown, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { API_ROUTES } from "@/services/utils";

const HostNavbar = () => {
  const [notifications] = useState(3);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    window.location.href = API_ROUTES.AUTH.LOGOUT;
  };

  if (!user) {
    return null; // Or redirect to login
  }

  return (
    <div className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-end space-x-4">
      {/* <Button variant="ghost" size="icon" className="relative">
        <Bell size={20} />
        {notifications > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
            {notifications}
          </span>
        )}
      </Button> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <span className="text-sm font-medium">{user.username}</span>
              <ChevronDown size={16} className="ml-1" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center w-full">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild>
            <Link to="/host/settings" className="flex items-center w-full">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem asChild>
            <Link to="/" className="flex items-center w-full">
              <User className="mr-2 h-4 w-4" />
              <span>Switch to Player</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HostNavbar;
