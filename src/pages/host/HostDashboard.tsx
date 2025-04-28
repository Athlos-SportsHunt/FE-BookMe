import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Calendar, 
  Building, 
  ChevronRight,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from "date-fns";
import { API_ROUTES, getApiUrl } from "@/services/utils";
import { handle_apicall } from "@/services/apis/api_call";
import { adaptVenues, adaptBookings } from "@/types/adapter";


const HostDashboard = () => {
  const [hostVenues, setHostVenues] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [stats, setStats] = useState({
    venuesCount: 0,
    turfsCount: 0,
    bookingsCount: 0,
    totalRevenue: 0,
  });
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch venues and recent bookings from API
    const fetchDashboardData = async () => {
      setLoading(true);
      // Fetch venues
      const venuesRes = await handle_apicall(getApiUrl(API_ROUTES.HOST.VENUES));
      if (venuesRes.success) {
        const Venues = adaptVenues(venuesRes.data);
        setHostVenues(Venues);
        // Calculate stats
        const hostTurfIds = Venues.flatMap((venue) => venue.turfs).map((turf) => turf.id);
        setStats((prev) => ({
          ...prev,
          venuesCount: Venues.length,
          turfsCount: hostTurfIds.length,
        }));
      }
      // Fetch recent bookings
      const recentBookingsRes = await handle_apicall(getApiUrl(API_ROUTES.HOST.RECENT_BOOKINGS));
      if (recentBookingsRes.success) {
        const adaptedBookings = adaptBookings(recentBookingsRes.data);
        setRecentBookings(adaptedBookings);
        setStats((prev) => ({
          ...prev,
          bookingsCount: adaptedBookings.length,
          totalRevenue: adaptedBookings.reduce((total, booking) => total + booking.totalPrice, 0),
        }));
      }
      // Generate sample revenue data (in a real app, this would come from API)
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const revenueByMonth = months.map(month => ({
        name: month,
        revenue: Math.floor(Math.random() * 50000) + 10000,
      }));
      setRevenueData(revenueByMonth);
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  // Function to get turf details for a booking from API data
  const getTurfDetails = (turfId) => {
    for (const venue of hostVenues) {
      const turf = venue.turfs.find((t) => t.id === turfId);
      if (turf) return { ...turf, venueId: venue.id };
    }
    return null;
  };

  // Function to get venue details for a turf from API data
  const getVenueDetails = (venueId) => {
    return hostVenues.find((venue) => venue.id === venueId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-sporty-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Host Dashboard</h1>
        <Link to="/host/create-venue">
          <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add New Venue
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Venues</p>
                <h3 className="text-2xl font-bold">{stats.venuesCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Turfs</p>
                <h3 className="text-2xl font-bold">{stats.turfsCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <h3 className="text-2xl font-bold">{stats.bookingsCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly revenue for the current year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
                />
                <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Venues and Bookings */}
      <Tabs defaultValue="venues">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="venues" className="flex-1">My Venues</TabsTrigger>
          <TabsTrigger value="bookings" className="flex-1">Recent Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="venues">
          <Card>
            <CardHeader>
              <CardTitle>Your Venues</CardTitle>
              <CardDescription>List of all venues you manage</CardDescription>
            </CardHeader>
            <CardContent>
              {hostVenues.length > 0 ? (
                <div className="space-y-6">
                  {hostVenues.map((venue) => (
                    <Card key={venue.id} className="bg-gray-50 hover:bg-gray-100 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                              <img
                                src={venue.images[0]}
                                alt={venue.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{venue.name}</h3>
                              <p className="text-gray-600 text-sm">{venue.address}</p>
                              <div className="flex items-center mt-2 text-sm">
                                <span className="mr-4 text-gray-500">{venue.turfs.length} Turfs</span>
                                <span className="text-gray-500">
                                  {recentBookings.filter(booking => 
                                    venue.turfs.map(turf => turf.id).includes(booking.turfId)
                                  ).length} Bookings
                                </span>
                              </div>
                            </div>
                          </div>
                          <Link to={`/host/venue/${venue.id}`} className="mt-4 md:mt-0">
                            <Button variant="outline" className="flex items-center">
                              Manage <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">You haven't added any venues yet.</p>
                  <Link to="/host/create-venue">
                    <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
                      <Plus className="mr-2 h-4 w-4" /> Add Your First Venue
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest bookings across all your venues</CardDescription>
            </CardHeader>
            <CardContent>
              {recentBookings.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Venue / Turf</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBookings.slice(0, 5).map((booking) => {
                      const turf = getTurfDetails(booking.turfId);
                      const venue = turf ? getVenueDetails(turf.venueId) : null;
                      
                      if (!turf || !venue) return null;
                      
                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">#{booking.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{venue.name}</div>
                              <div className="text-sm text-gray-500">{turf.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div>{format(parseISO(booking.startTime), "MMM d, yyyy")}</div>
                              <div className="text-sm text-gray-500">
                                {format(parseISO(booking.startTime), "h:mm a")} - 
                                {format(parseISO(booking.endTime), "h:mm a")}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{booking.userId}</TableCell>
                          <TableCell>₹{booking.totalPrice}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                              ${booking.status === 'online' ? 'bg-green-100 text-green-800' : 
                                booking.status === 'offline' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'}`}
                            >
                              {booking.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No bookings yet.</p>
                </div>
              )}
              {recentBookings.length > 5 && (
                <div className="mt-4 text-center">
                  <Button variant="outline">View All Bookings</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostDashboard;
