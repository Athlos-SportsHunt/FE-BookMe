import { useState } from "react";
import { Link } from "react-router-dom";
import { Ball, MapPin, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { venues } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/venue-filter?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Featured venues (just show 3 for the homepage)
  const featuredVenues = venues.slice(0, 3);

  const sportCategories = [
    { name: "Football", icon: "⚽", color: "bg-blue-500" },
    { name: "Cricket", icon: "🏏", color: "bg-green-500" },
    { name: "Basketball", icon: "🏀", color: "bg-orange-500" },
    { name: "Tennis", icon: "🎾", color: "bg-yellow-500" },
    { name: "Badminton", icon: "🏸", color: "bg-purple-500" },
    { name: "Volleyball", icon: "🏐", color: "bg-red-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Ball className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Find and Book Your Perfect Sports Venue
          </h1>
          <p className="text-xl text-sporty-100 mb-8 max-w-3xl mx-auto">
            Discover football fields, cricket grounds, basketball courts, and more. Book online in seconds.
          </p>

          <form onSubmit={handleSearch} className="max-w-lg mx-auto relative">
            <Input
              type="text"
              placeholder="Search for venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-full shadow-lg"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <Button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-sporty-600 hover:bg-sporty-700 text-white px-6 py-2"
            >
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Sport Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Sport</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sportCategories.map((sport, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`${sport.color} h-16 w-16 rounded-full flex items-center justify-center text-2xl mb-4`}>
                  {sport.icon}
                </div>
                <span className="font-medium">{sport.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Featured Venues</h2>
            <Link to="/venue-filter" className="text-sporty-600 hover:text-sporty-700 flex items-center">
              View all venues <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVenues.map((venue) => (
              <Link to={`/venue/${venue.id}`} key={venue.id}>
                <Card className="overflow-hidden card-hover">
                  <div className="relative h-48 w-full">
                    <img
                      src={venue.images[0]}
                      alt={venue.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold">{venue.name}</h3>
                        <div className="flex items-center text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{venue.address}</span>
                        </div>
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={venue.host.profilePicture} />
                        <AvatarFallback>{venue.host.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <p className="text-gray-600 line-clamp-2 mb-4">{venue.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{venue.turfs.length} Turfs Available</span>
                      <Button size="sm" className="bg-sporty-600 hover:bg-sporty-700 text-white">
                        View Venue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-sporty-100 h-20 w-20 rounded-full flex items-center justify-center text-sporty-600 text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Find a Venue</h3>
              <p className="text-gray-600">
                Search for sports venues near you based on your preferred sport or location.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-sporty-100 h-20 w-20 rounded-full flex items-center justify-center text-sporty-600 text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Book a Slot</h3>
              <p className="text-gray-600">
                Choose your preferred date and time, and book instantly online.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-sporty-100 h-20 w-20 rounded-full flex items-center justify-center text-sporty-600 text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Play & Enjoy</h3>
              <p className="text-gray-600">
                Show up at the venue at your booked time and enjoy your game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Host CTA */}
      <section className="py-16 bg-sporty-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Own a Sports Venue?</h2>
              <p className="text-xl opacity-90 mb-6">
                List your venue on Sporty Turf Hub and start earning. It's free to list and takes just a few minutes.
              </p>
              <Link to="/host/create-venue">
                <Button size="lg" className="bg-white text-sporty-700 hover:bg-gray-100">
                  Become a Host
                </Button>
              </Link>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                alt="Host a venue" 
                className="rounded-lg shadow-xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
