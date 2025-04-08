import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FootballIcon } from "@/utils/sportIcons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { API_ROUTES, getApiUrl } from "@/services/utils";
import { useUser } from "../contexts/UserContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useUser();

  const handleLogout = () => {
    window.location.href = API_ROUTES.AUTH.LOGOUT;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/venue-filter?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const MenuIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

  const XIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  const UserIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FootballIcon className="h-8 w-8 text-sporty-600" />
            <span className="text-xl font-bold text-sporty-700">SportsHunt</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-sporty-600 transition-colors">Home</Link>
            {user?.is_host && (
              <Link to="/host/dashboard" className="text-gray-600 hover:text-sporty-600 transition-colors">Host Dashboard</Link>
            )}
            {user ? (
              <>
                <span className="text-gray-700 font-medium">{user.name}</span>
                <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">Logout</Button>
              </>
            ) : (
              <Link to={getApiUrl(API_ROUTES.AUTH.LOGIN)}>
                <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
                  <UserIcon className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-600 hover:text-sporty-600 transition-colors py-2">Home</Link>
              {user?.is_host && (
                <Link to="/host-dashboard" className="text-gray-600 hover:text-sporty-600 transition-colors py-2">Host Dashboard</Link>
              )}
              {user ? (
                <>
                  <span className="text-gray-700 font-medium">{user.name}</span>
                  <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white">Logout</Button>
                </>
              ) : (
                <Link to={getApiUrl(API_ROUTES.AUTH.LOGIN)}>
                  <Button className="w-full bg-sporty-600 hover:bg-sporty-700 text-white">
                    <UserIcon className="mr-2 h-4 w-4" /> Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
