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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/types";
import { format, parseISO } from "date-fns";
import { getApiUrl, API_ROUTES } from "@/services/utils";
import { adaptBookings } from "@/types/adapter";
import { useUser } from "@/contexts/UserContext";

const UserProfile = () => {
  const { user, loading: userLoading } = useUser();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user bookings from API
    const fetchBookings = async () => {
      try {
        const response = await fetch(getApiUrl(API_ROUTES.MY_BOOKINGS), {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        console.log("Bookings data:", data);
        const adapted = adaptBookings(data);
        setUserBookings(adapted);
      } catch (error) {
        setUserBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Split bookings by startTime
  const now = new Date();
  const upcomingBookings = userBookings.filter(b => new Date(b.startTime) >= now);
  const pastBookings = userBookings.filter(b => new Date(b.startTime) < now);

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      case "online":
        return "text-blue-600 bg-blue-50";
      case "offline":
        return "text-gray-600 bg-gray-100";
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
      case "online":
        return <CheckCircle className="h-4 w-4" />;
      case "offline":
        return <Clock1 className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (userLoading) {
    return <div className="text-center py-12">Loading user...</div>;
  }

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
                  {/* You can add a profile picture field to user if available */}
                    <AvatarFallback className="text-3xl">{user?.username?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user?.username || "User"}</h2>
                {user?.role && (
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "player"
                        ? "bg-green-100 text-green-700"
                        : user.role === "host"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium">{user?.username || "User"}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{user?.email || "No email"}</div>
                  </div>
                </div>
                {/* You can add phone or other fields if available in user */}
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
              ) : upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map(booking => {
                    // Use booking.turf?.name and booking.venue_name directly
                    const turfName = booking.turf?.name || "Unknown Turf";
                    const venueName = booking.venue_name || "Unknown Venue";
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
                                <h3 className="text-xl font-bold">{turfName}</h3>
                                <div className="flex items-center text-gray-600 mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{venueName}</span>
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
              <h2 className="text-xl font-bold mb-4">Booking History</h2>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin h-10 w-10 border-4 border-sporty-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading your booking history...</p>
                </div>
              ) : pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.map(booking => {
                    // Use booking.turf?.name and booking.venue_name directly
                    const turfName = booking.turf?.name || "Unknown Turf";
                    const venueName = booking.venue_name || "Unknown Venue";
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
                                <h3 className="text-xl font-bold">{turfName}</h3>
                                <div className="flex items-center text-gray-600 mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{venueName}</span>
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
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">No Booking History</h3>
                  <p className="text-gray-600 mb-6">Your past bookings will appear here.</p>
                  <Link to="/">
                    <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
                      Browse Venues
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
