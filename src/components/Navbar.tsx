
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FootballIcon } from "@/utils/sportIcons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/venue-filter?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Menu icon component
  const MenuIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

  // X icon component
  const XIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  // Search icon component
  const SearchIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  // User icon component
  const UserIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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
            <span className="text-xl font-bold text-sporty-700">Sporty Turf Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative w-64">
              <Input
                type="text"
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            <Link to="/" className="text-gray-600 hover:text-sporty-600 transition-colors">
              Home
            </Link>
            <Link to="/venue-filter" className="text-gray-600 hover:text-sporty-600 transition-colors">
              Venues
            </Link>
            <Link to="/profile" className="text-gray-600 hover:text-sporty-600 transition-colors">
              My Bookings
            </Link>
            <Link to="/host/dashboard">
              <Button variant="outline" className="border-sporty-600 text-sporty-600 hover:bg-sporty-50">
                Host Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
                <UserIcon className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-600 hover:text-sporty-600 transition-colors py-2">
                Home
              </Link>
              <Link to="/venue-filter" className="text-gray-600 hover:text-sporty-600 transition-colors py-2">
                Venues
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-sporty-600 transition-colors py-2">
                My Bookings
              </Link>
              <Link to="/host/dashboard" className="text-gray-600 hover:text-sporty-600 transition-colors py-2">
                Host Dashboard
              </Link>
              <Link to="/login">
                <Button className="w-full bg-sporty-600 hover:bg-sporty-700 text-white">
                  <UserIcon className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
