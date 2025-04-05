
import { Venue, Turf, User, Booking, Amenity, SportType } from "@/types";

// Mock Amenities
export const amenities: Amenity[] = [
  { id: "1", name: "Changing Rooms", icon: "door" },
  { id: "2", name: "Showers", icon: "shower" },
  { id: "3", name: "Drinking Water", icon: "droplet" },
  { id: "4", name: "Parking", icon: "car" },
  { id: "5", name: "Floodlights", icon: "lamp" },
  { id: "6", name: "Equipment Rental", icon: "package" },
  { id: "7", name: "Spectator Seating", icon: "users" },
  { id: "8", name: "Cafe/Refreshments", icon: "coffee" },
  { id: "9", name: "Wifi", icon: "wifi" },
  { id: "10", name: "First Aid", icon: "heart" },
];

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    isHost: true,
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    phone: "+1234567890",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    isHost: false,
    profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
    phone: "+0987654321",
    createdAt: "2023-01-02T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    isHost: true,
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
    createdAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-03T00:00:00Z",
  },
];

// Sport-specific amenities
export const sportAmenities: Record<SportType, string[]> = {
  football: ["1", "2", "3", "4", "5", "7"],
  cricket: ["1", "2", "3", "4", "5", "7", "8"],
  basketball: ["1", "2", "3", "4", "5", "7"],
  tennis: ["1", "2", "3", "4", "6"],
  badminton: ["1", "2", "3", "9"],
  volleyball: ["1", "2", "3", "4", "5"],
  rugby: ["1", "2", "3", "4", "5", "7", "10"],
  hockey: ["1", "2", "3", "4", "5", "7", "10"],
};

// Helper to get amenities for a sport
const getAmenitiesForSport = (sport: SportType): Amenity[] => {
  return amenities.filter((amenity) => sportAmenities[sport].includes(amenity.id));
};

// Mock Turfs
export const turfs: Turf[] = [
  {
    id: "1",
    name: "Premier Football Field",
    venueId: "1",
    sportType: "football",
    pricePerHour: 1200,
    description: "Professional grade football field with natural grass.",
    images: [
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1599232288126-22ccd02f1156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
    amenities: getAmenitiesForSport("football"),
    bookings: [],
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2023-01-10T00:00:00Z",
  },
  {
    id: "2",
    name: "Indoor Futsal Court",
    venueId: "1",
    sportType: "football",
    pricePerHour: 800,
    description: "Air-conditioned indoor futsal court with artificial turf.",
    images: [
      "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
    ],
    amenities: getAmenitiesForSport("football"),
    bookings: [],
    createdAt: "2023-01-10T00:00:00Z",
    updatedAt: "2023-01-10T00:00:00Z",
  },
  {
    id: "3",
    name: "Cricket Stadium",
    venueId: "2",
    sportType: "cricket",
    pricePerHour: 2000,
    description: "Full-sized cricket ground with pavilion and practice nets.",
    images: [
      "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    ],
    amenities: getAmenitiesForSport("cricket"),
    bookings: [],
    createdAt: "2023-01-11T00:00:00Z",
    updatedAt: "2023-01-11T00:00:00Z",
  },
  {
    id: "4",
    name: "Basketball Court",
    venueId: "3",
    sportType: "basketball",
    pricePerHour: 600,
    description: "Regulation-sized basketball court with high-quality flooring.",
    images: [
      "https://images.unsplash.com/photo-1574988539158-485480129462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1223&q=80",
    ],
    amenities: getAmenitiesForSport("basketball"),
    bookings: [],
    createdAt: "2023-01-12T00:00:00Z",
    updatedAt: "2023-01-12T00:00:00Z",
  },
  {
    id: "5",
    name: "Tennis Court",
    venueId: "3",
    sportType: "tennis",
    pricePerHour: 500,
    description: "Clay tennis court with proper markings and net.",
    images: [
      "https://images.unsplash.com/photo-1533123045841-9de367ce3641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    ],
    amenities: getAmenitiesForSport("tennis"),
    bookings: [],
    createdAt: "2023-01-12T00:00:00Z",
    updatedAt: "2023-01-12T00:00:00Z",
  },
  {
    id: "6",
    name: "Badminton Court",
    venueId: "4",
    sportType: "badminton",
    pricePerHour: 400,
    description: "Indoor badminton court with proper lighting and ventilation.",
    images: [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
    amenities: getAmenitiesForSport("badminton"),
    bookings: [],
    createdAt: "2023-01-13T00:00:00Z",
    updatedAt: "2023-01-13T00:00:00Z",
  },
];

// Mock Venues
export const venues: Venue[] = [
  {
    id: "1",
    name: "City Sports Complex",
    address: "123 Main Street, Cityville",
    description: "A multi-sport facility with indoor and outdoor options.",
    images: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1293&q=80",
    ],
    googleMapsLink: "https://maps.google.com/?q=123+Main+Street+Cityville",
    host: users[0],
    turfs: [turfs[0], turfs[1]],
    createdAt: "2023-01-05T00:00:00Z",
    updatedAt: "2023-01-05T00:00:00Z",
  },
  {
    id: "2",
    name: "Green Valley Cricket Ground",
    address: "456 Park Avenue, Sportstown",
    description: "Dedicated cricket facility with multiple practice areas.",
    images: [
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80",
    ],
    host: users[2],
    turfs: [turfs[2]],
    createdAt: "2023-01-06T00:00:00Z",
    updatedAt: "2023-01-06T00:00:00Z",
  },
  {
    id: "3",
    name: "Urban Sports Center",
    address: "789 Downtown Road, Metropolis",
    description: "Modern sports facility in the heart of the city with multiple courts.",
    images: [
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    ],
    googleMapsLink: "https://maps.google.com/?q=789+Downtown+Road+Metropolis",
    host: users[0],
    turfs: [turfs[3], turfs[4]],
    createdAt: "2023-01-07T00:00:00Z",
    updatedAt: "2023-01-07T00:00:00Z",
  },
  {
    id: "4",
    name: "Indoor Sports Club",
    address: "101 Weather-proof Lane, Sheltertown",
    description: "Fully air-conditioned facility for year-round sports.",
    images: [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
    host: users[2],
    turfs: [turfs[5]],
    createdAt: "2023-01-08T00:00:00Z",
    updatedAt: "2023-01-08T00:00:00Z",
  },
];

// Update turfs to include bookings
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export const bookings: Booking[] = [
  {
    id: "1",
    turfId: "1",
    userId: "2",
    startTime: new Date(today.setHours(9, 0, 0, 0)).toISOString(),
    endTime: new Date(today.setHours(11, 0, 0, 0)).toISOString(),
    totalPrice: 2400,
    status: "confirmed",
    paymentId: "pay_1",
    createdAt: "2023-01-20T00:00:00Z",
    updatedAt: "2023-01-20T00:00:00Z",
  },
  {
    id: "2",
    turfId: "1",
    userId: "2",
    startTime: new Date(tomorrow.setHours(14, 0, 0, 0)).toISOString(),
    endTime: new Date(tomorrow.setHours(16, 0, 0, 0)).toISOString(),
    totalPrice: 2400,
    status: "pending",
    createdAt: "2023-01-21T00:00:00Z",
    updatedAt: "2023-01-21T00:00:00Z",
  },
  {
    id: "3",
    turfId: "3",
    userId: "2",
    startTime: new Date(tomorrow.setHours(10, 0, 0, 0)).toISOString(),
    endTime: new Date(tomorrow.setHours(13, 0, 0, 0)).toISOString(),
    totalPrice: 6000,
    status: "confirmed",
    paymentId: "pay_2",
    createdAt: "2023-01-22T00:00:00Z",
    updatedAt: "2023-01-22T00:00:00Z",
  },
];

// Add bookings to respective turfs
turfs.forEach(turf => {
  turf.bookings = bookings.filter(booking => booking.turfId === turf.id);
});
