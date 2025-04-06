import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  User, 
  Mail, 
  Phone, 
  Edit, 
  X,
  CheckCircle,
  AlertCircle,
  Clock1 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bookings, turfs, venues } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/types";
import { format, parseISO } from "date-fns";

// Mock user data
const currentUser = {
  id: "2",
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "+1234567890",
  profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
};

const UserProfile = () => {
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get user bookings
    setTimeout(() => {
      const fetchedBookings = bookings.filter(booking => booking.userId === currentUser.id);
      setUserBookings(fetchedBookings);
      setLoading(false);
    }, 500);
  }, []);

  // Helper function to get turf details for a booking
  const getTurfDetails = (turfId: string) => {
    return turfs.find(turf => turf.id === turfId);
  };

  // Helper function to get venue details for a turf
  const getVenueDetails = (turfId: string) => {
    const turf = getTurfDetails(turfId);
    if (!turf) return null;
    return venues.find(venue => venue.id === turf.venueId);
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock1 className="h-4 w-4" />;
      case "cancelled":
        return <X className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* User Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={currentUser.profilePicture} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{currentUser.name}</h2>
                <p className="text-gray-500">Member since January 2023</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium">{currentUser.name}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{currentUser.email}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium">{currentUser.phone}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <Edit className="h-4 w-4 mr-2" /> Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="bookings">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="bookings" className="flex-1">My Bookings</TabsTrigger>
              <TabsTrigger value="history" className="flex-1">Booking History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings">
              <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-10 w-10 border-4 border-sporty-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading your bookings...</p>
                </div>
              ) : userBookings.length > 0 ? (
                <div className="space-y-4">
                  {userBookings.map(booking => {
                    const turf = getTurfDetails(booking.turfId);
                    const venue = getVenueDetails(booking.turfId);
                    if (!turf || !venue) return null;

                    return (
                      <Card key={booking.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 bg-gray-100 p-6 flex flex-col justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {format(parseISO(booking.startTime), "d")}
                              </div>
                              <div className="text-gray-600">
                                {format(parseISO(booking.startTime), "MMM yyyy")}
                              </div>
                              <div className="mt-2 text-sm">
                                {format(parseISO(booking.startTime), "h:mm a")} - {format(parseISO(booking.endTime), "h:mm a")}
                              </div>
                            </div>
                          </div>
                          <CardContent className="p-6 md:w-3/4">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold">{turf.name}</h3>
                                <div className="flex items-center text-gray-600 mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{venue.name}, {venue.address}</span>
                                </div>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(booking.status)}`}>
                                {getStatusIcon(booking.status)}
                                <span className="ml-1 capitalize">{booking.status}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm mb-4">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                <span>{format(parseISO(booking.startTime), "MMMM d, yyyy")}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-500 mr-1" />
                                <span>{format(parseISO(booking.startTime), "h:mm a")} - {format(parseISO(booking.endTime), "h:mm a")}</span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                              <div className="font-bold text-sporty-600">₹{booking.totalPrice}</div>
                              <Link to={`/venue/${venue.id}/turf/${turf.id}`}>
                                <Button variant="outline" size="sm" className="flex items-center">
                                  View Details <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">No Upcoming Bookings</h3>
                  <p className="text-gray-600 mb-6">You don't have any upcoming bookings at the moment.</p>
                  <Link to="/">
                    <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
                      Browse Venues
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No Booking History</h3>
                <p className="text-gray-600 mb-6">Your past bookings will appear here.</p>
                <Link to="/">
                  <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
                    Browse Venues
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
