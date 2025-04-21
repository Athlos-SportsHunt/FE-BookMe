import { Turf, Venue, Booking } from "./index";

// Dummy values for fields not provided by the backend
const DUMMY_ADDRESS = "Address not available";
const DUMMY_DESCRIPTION = "No description provided.";
const DUMMY_IMAGE = "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const DUMMY_GOOGLE_MAPS_LINK = "https://maps.google.com";
const DUMMY_EMAIL = "dummy@example.com";
const DUMMY_PHONE = "0000000000";

// Generate dummy timestamps (you could use a fixed date or generate one on the fly)
const dummyTimestamp = new Date().toISOString();

// Adapt a Turf from the backend format to the full Turf type
export function adaptTurf(turf: any, venueId: number | string): Turf {
  return {
    id: String(turf.id),
    name: turf.name,
    venueId: String(venueId),
    // Use a default sport type, you can modify this based on your logic
    sportType: "football",
    // Convert the price from string to a number
    pricePerHour: parseFloat(turf.price_per_hr),
    description: DUMMY_DESCRIPTION,
    images: [DUMMY_IMAGE],
    // For simplicity, we start with no amenities and bookings
    amenities: [],
    bookings: [],
    createdAt: dummyTimestamp,
    updatedAt: dummyTimestamp,
  };
}

// Adapt a Venue from the backend format to the full Venue type
export function adaptVenue(venue: any): Venue {
  return {
    id: String(venue.id),
    name: venue.name,
    address: DUMMY_ADDRESS,
    description: DUMMY_DESCRIPTION,
    images: [DUMMY_IMAGE],
    googleMapsLink: DUMMY_GOOGLE_MAPS_LINK,
    host: {
      id: String(venue.id), // Or you can generate a unique host id if needed
      name: venue.host_name,
      email: DUMMY_EMAIL,
      isHost: true,
      profilePicture: DUMMY_IMAGE,
      phone: DUMMY_PHONE,
      createdAt: dummyTimestamp,
      updatedAt: dummyTimestamp,
    },
    // Map each turf in the backend venue to a fully adapted Turf object
    turfs: (venue.turfs || []).map((turf: any) => adaptTurf(turf, venue.id)),
    createdAt: dummyTimestamp,
    updatedAt: dummyTimestamp,
  };
}

// Adapter function to process an array of backend venue objects
export function adaptVenues(venues: any[]): Venue[] {
  return venues.map(adaptVenue);
}

/*
  Example usage:

  const backendVenues = [
    {
      "id": 13,
      "name": "testttt",
      "host_name": "sup",
      "turfs": []
    },
    {
      "id": 12,
      "name": "Venue-uhh-api-2",
      "host_name": "sup",
      "turfs": [
        {
          "id": 16,
          "name": "Main Ground",
          "price_per_hr": "1000.00"
        }
      ]
    },
    {
      "id": 11,
      "name": "Venue-uhh-api-1",
      "host_name": "sup",
      "turfs": [
        {
          "id": 15,
          "name": "Main Ground",
          "price_per_hr": "1000.00"
        }
      ]
    }
  ];

  const adaptedVenues = adaptVenues(backendVenues);
  console.log(JSON.stringify(adaptedVenues, null, 2));
*/

const DUMMY_STATUS = "confirmed";
const DUMMY_PAYMENT_ID = "payment_dummy";
const dummyBookingTimestamp = new Date().toISOString();

// Adapter function to adapt a single booking
export function adaptBooking(bookingData: any): Booking {
  return {
    id: bookingData.id ? String(bookingData.id) : "dummy_id",
    turfId: bookingData.turf?.id ? String(bookingData.turf.id) : "0",
    userId: bookingData.user_details?.username ? String(bookingData.user_details.username) : "0",
    startTime: bookingData.start_datetime || dummyBookingTimestamp,
    endTime: bookingData.end_datetime || dummyBookingTimestamp,
    totalPrice: parseFloat(bookingData.total_price || "0"),
    status: DUMMY_STATUS,
    paymentId: DUMMY_PAYMENT_ID,
    createdAt: dummyBookingTimestamp,
    updatedAt: dummyBookingTimestamp,
  };
}

// Adapter function for an array of bookings
export function adaptBookings(rawBookings: any[]): Booking[] {
  return rawBookings.map(adaptBooking);
}