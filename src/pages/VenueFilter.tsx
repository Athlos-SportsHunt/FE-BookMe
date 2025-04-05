
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { 
  Search, 
  MapPin, 
  Filter,
  SoccerBall,
  Cricket,
  Basketball,
  Tennis,
  Badminton,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { venues } from "@/data/mockData";
import { Venue, SportType } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetFooter, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

const sportOptions = [
  { value: "football", label: "Football", icon: SoccerBall },
  { value: "cricket", label: "Cricket", icon: Cricket },
  { value: "basketball", label: "Basketball", icon: Basketball },
  { value: "tennis", label: "Tennis", icon: Tennis },
  { value: "badminton", label: "Badminton", icon: Badminton },
];

const VenueFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [selectedSports, setSelectedSports] = useState<SportType[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [filterCount, setFilterCount] = useState(0);

  // Effect to filter venues based on search and filters
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = [...venues];
      
      // Filter by search query
      if (searchQuery) {
        results = results.filter(venue => 
          venue.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          venue.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Filter by sports
      if (selectedSports.length > 0) {
        results = results.filter(venue => 
          venue.turfs.some(turf => 
            selectedSports.includes(turf.sportType as SportType)
          )
        );
      }
      
      // Filter by price range
      if (priceRange[0] > 0 || priceRange[1] < 3000) {
        results = results.filter(venue => 
          venue.turfs.some(turf => 
            turf.pricePerHour >= priceRange[0] && turf.pricePerHour <= priceRange[1]
          )
        );
      }
      
      setFilteredVenues(results);
      setLoading(false);
    }, 500);
  }, [searchQuery, selectedSports, priceRange]);

  // Update filter count
  useEffect(() => {
    let count = 0;
    if (selectedSports.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < 3000) count++;
    setFilterCount(count);
  }, [selectedSports, priceRange]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ query: searchQuery });
  };

  const handleSportToggle = (sport: SportType) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter(s => s !== sport));
    } else {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const clearFilters = () => {
    setSelectedSports([]);
    setPriceRange([0, 3000]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Find Sports Venues</h1>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search by venue name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full h-8 w-8 p-0 bg-sporty-600 hover:bg-sporty-700"
          >
            <Search className="h-4 w-4 text-white" />
          </Button>
        </form>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              <span>Filters</span>
              {filterCount > 0 && (
                <span className="ml-2 h-5 w-5 rounded-full bg-sporty-600 text-white text-xs flex items-center justify-center">
                  {filterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Venues</SheetTitle>
            </SheetHeader>
            
            <div className="py-4 space-y-6">
              {/* Sports Filter */}
              <div>
                <h3 className="text-lg font-medium mb-4">Sport Type</h3>
                <div className="space-y-3">
                  {sportOptions.map((sport) => (
                    <div className="flex items-center" key={sport.value}>
                      <Checkbox
                        id={`sport-${sport.value}`}
                        checked={selectedSports.includes(sport.value as SportType)}
                        onCheckedChange={() => handleSportToggle(sport.value as SportType)}
                        className="mr-2"
                      />
                      <Label htmlFor={`sport-${sport.value}`} className="flex items-center">
                        <sport.icon className="h-4 w-4 mr-2" />
                        {sport.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-medium mb-4">Price Range (per hour)</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={3000}
                    step={100}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <SheetFooter className="mt-4">
              <Button variant="outline" onClick={clearFilters} className="w-full">
                Clear All Filters
              </Button>
              <SheetClose asChild>
                <Button className="w-full bg-sporty-600 hover:bg-sporty-700 text-white">
                  Apply Filters
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Applied Filters */}
      {filterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedSports.map(sport => (
            <div key={sport} className="bg-sporty-50 text-sporty-700 px-3 py-1 rounded-full text-sm flex items-center">
              <span className="capitalize">{sport}</span>
              <button onClick={() => handleSportToggle(sport)} className="ml-1">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {(priceRange[0] > 0 || priceRange[1] < 3000) && (
            <div className="bg-sporty-50 text-sporty-700 px-3 py-1 rounded-full text-sm flex items-center">
              <span>₹{priceRange[0]} - ₹{priceRange[1]}</span>
              <button onClick={() => setPriceRange([0, 3000])} className="ml-1">
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          <button 
            onClick={clearFilters} 
            className="text-gray-600 hover:text-sporty-600 text-sm underline"
          >
            Clear all
          </button>
        </div>
      )}
      
      {/* Results Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {loading ? 'Searching venues...' : `${filteredVenues.length} venues found`}
        </h2>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-10 w-10 border-4 border-sporty-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for venues...</p>
        </div>
      ) : filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map(venue => (
            <Link to={`/venue/${venue.id}`} key={venue.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <div className="h-48 w-full">
                  <img
                    src={venue.images[0]}
                    alt={venue.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2">{venue.name}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="text-sm truncate">{venue.address}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {Array.from(new Set(venue.turfs.map(turf => turf.sportType))).map((sport, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs capitalize"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {venue.turfs.length} {venue.turfs.length === 1 ? 'turf' : 'turfs'} available
                    </div>
                    <div className="text-sporty-600 font-bold">
                      From ₹{Math.min(...venue.turfs.map(turf => turf.pricePerHour))}/hr
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">No Venues Found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any venues matching your search criteria.
          </p>
          <Button onClick={clearFilters} className="bg-sporty-600 hover:bg-sporty-700 text-white">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default VenueFilter;
