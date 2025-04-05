
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Info, 
  ExternalLink, 
  ChevronLeft,
  SoccerBall,
  Cricket,
  Basketball,
  Tennis
} from "lucide-react";
import { venues } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Venue, Turf } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getSportIcon = (sportType: string) => {
  switch (sportType) {
    case "football":
      return <SoccerBall className="h-5 w-5" />;
    case "cricket":
      return <Cricket className="h-5 w-5" />;
    case "basketball":
      return <Basketball className="h-5 w-5" />;
    case "tennis":
      return <Tennis className="h-5 w-5" />;
    default:
      return <SoccerBall className="h-5 w-5" />;
  }
};

const VenueDetails = () => {
  const { venueId } = useParams<{ venueId: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Simulating API fetch with setTimeout
    const timer = setTimeout(() => {
      try {
        if (!venueId) {
          throw new Error("Venue ID is required");
        }

        const foundVenue = venues.find((v) => v.id === venueId);
        if (!foundVenue) {
          throw new Error("Venue not found");
        }

        setVenue(foundVenue);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [venueId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-sporty-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading venue details...</p>
        </div>
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
          <div className="text-red-500 text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Venue</h2>
          <p className="text-gray-700 mb-6">{error || "Unable to load venue details"}</p>
          <Link to="/">
            <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-sporty-600 mb-6">
        <ChevronLeft className="h-5 w-5 mr-1" /> Back to venues
      </Link>

      {/* Venue Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{venue.name}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{venue.address}</span>
          {venue.googleMapsLink && (
            <a
              href={venue.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sporty-600 hover:text-sporty-700 inline-flex items-center"
            >
              View on map <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-10">
        <div className="relative h-96 overflow-hidden rounded-lg mb-4">
          <img
            src={venue.images[activeImageIndex]}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {venue.images.map((image, index) => (
            <div
              key={index}
              className={`h-20 w-32 cursor-pointer rounded-md overflow-hidden ${
                activeImageIndex === index ? "ring-2 ring-sporty-600" : ""
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={image}
                alt={`${venue.name} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Venue Info and Turfs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="about">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
              <TabsTrigger value="turfs" className="flex-1">Available Turfs</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-sporty-600" /> About this venue
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {venue.description ||
                    "This is a premier sports venue offering state-of-the-art facilities for various sports activities. The venue is well-maintained and provides a great experience for players of all levels."}
                </p>

                <h3 className="text-lg font-semibold mb-3">Host Information</h3>
                <div className="flex items-center mb-6">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={venue.host.profilePicture} />
                    <AvatarFallback>{venue.host.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{venue.host.name}</div>
                    <div className="text-gray-500 text-sm">Host since {new Date(venue.host.createdAt).getFullYear()}</div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-3">Opening Hours</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                  <div>
                    <p className="font-medium">Weekdays</p>
                    <p>6:00 AM - 9:00 PM</p>
                  </div>
                  <div>
                    <p className="font-medium">Weekends</p>
                    <p>6:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="turfs">
              <div className="space-y-6">
                {venue.turfs.length > 0 ? (
                  venue.turfs.map((turf: Turf) => (
                    <Card key={turf.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img
                            src={turf.images[0]}
                            alt={turf.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <CardContent className="p-6 md:w-2/3">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold">{turf.name}</h3>
                              <div className="flex items-center text-gray-500 mt-1">
                                <span className="flex items-center">
                                  {getSportIcon(turf.sportType)}
                                  <span className="ml-1 capitalize">{turf.sportType}</span>
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-sporty-600">₹{turf.pricePerHour}/hour</div>
                            </div>
                          </div>
                          <p className="text-gray-600 line-clamp-2 mb-4">{turf.description}</p>
                          <div>
                            <h4 className="font-medium mb-2">Amenities:</h4>
                            <div className="flex flex-wrap gap-2">
                              {turf.amenities.slice(0, 5).map((amenity) => (
                                <span
                                  key={amenity.id}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                >
                                  {amenity.name}
                                </span>
                              ))}
                              {turf.amenities.length > 5 && (
                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                  +{turf.amenities.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Link to={`/venue/${venue.id}/turf/${turf.id}`}>
                              <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
                                <Calendar className="mr-2 h-4 w-4" /> Book Now
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <p className="text-gray-600">No turfs available at this venue currently.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-4">Book Your Slot</h2>
            <p className="text-gray-600 mb-4">
              Select a turf to book your slot. Each turf has different pricing and availability.
            </p>
            <div className="space-y-4">
              {venue.turfs.map((turf) => (
                <Link key={turf.id} to={`/venue/${venue.id}/turf/${turf.id}`}>
                  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{turf.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          {getSportIcon(turf.sportType)}
                          <span className="ml-1 capitalize">{turf.sportType}</span>
                        </div>
                      </div>
                      <div className="text-sporty-600 font-bold">₹{turf.pricePerHour}/hr</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-sporty-600" />
                <span>Available for hourly booking</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-sporty-600" />
                <span>Book up to 30 days in advance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
