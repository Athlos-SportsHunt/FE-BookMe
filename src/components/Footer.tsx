
import { SoccerBall, Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <SoccerBall className="h-8 w-8 text-sporty-500" />
              <span className="text-xl font-bold">Sporty Turf Hub</span>
            </div>
            <p className="text-gray-400 mb-4">
              Find and book the best sports venues for your games and training sessions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/venue-filter" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Find Venues
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/host/dashboard" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Become a Host
                </Link>
              </li>
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sports</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Football
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Cricket
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Basketball
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Tennis
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Badminton
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-sporty-500 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sporty Turf Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
