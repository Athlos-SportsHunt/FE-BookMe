import { Turf, Venue, Booking, Amenity, SportType, User } from "./index";

// Define a basic interface for Amenity from API response
interface ApiAmenityResponse {
  id: number | string;
  name: string;
  icon?: string;
}

// Define interfaces for the API response based on the provided JSON structure
interface ApiTurfResponse {
  id: number | string;
  name: string;
  turf_image_url?: string; // From the user provided JSON log
  image?: string; // For single turf responses (e.g., after creation)
  images?: string[]; // Keep for potential fallback or alternative API structure
  sport_type?: SportType;
  sportType?: SportType;
  price_per_hr?: string;
  pricePerHour?: string;
  description?: string;
  amenities?: ApiAmenityResponse[]; // Changed from any[]
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

interface ApiVenueResponse {
  id: number | string;
  name: string;
  venue_image_url?: string; // From the user provided JSON log
  image?: string; // From create venue response or single venue fetch
  images?: string[]; // Keep for potential fallback
  turfs: ApiTurfResponse[];
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_zip_code?: string;
  address_country?: string;
  address?: string;
  description?: string; // Already present, will be prioritized
  gmaps_link?: string; // Ensured this is the one used
  host_id?: string | number;
  host_name?: string;
  host_email?: string;
  host_profile_picture?: string;
  host_phone?: string;
  host?: Partial<User>;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

// Dummy values for fields not provided by the backend
const DUMMY_ADDRESS = "Address not available";
const DUMMY_DESCRIPTION = "No description provided.";
const DUMMY_IMAGE =
  "https://images.unsplash.com/photo-1607627000458-210e8d2bdb1d?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const DUMMY_GMAPS_LINK = "https://maps.google.com"; // Renamed from DUMMY_GOOGLE_MAPS_LINK
const DUMMY_EMAIL = "dummy@example.com";
const DUMMY_PHONE = "0000000000";
const DUMMY_PAYMENT_ID = "dummy_payment_id"; // Added missing constant

// Generate dummy timestamps (you could use a fixed date or generate one on the fly)
const dummyTimestamp = new Date().toISOString();

// Adapt a Turf from the backend format to the full Turf type
export function adaptTurf(
  turf: ApiTurfResponse,
  venueId: number | string
): Turf {
  console.log("[adaptTurf] Input turf data:", JSON.parse(JSON.stringify(turf)));
  console.log("[adaptTurf] Input venueId:", venueId);

  let turfImages: string[] = [DUMMY_IMAGE];
  let imageUrlToProcess: string | undefined = undefined;

  if (
    turf.turf_image_url &&
    typeof turf.turf_image_url === "string" &&
    turf.turf_image_url.trim() !== ""
  ) {
    imageUrlToProcess = turf.turf_image_url;
  } else if (
    turf.image &&
    typeof turf.image === "string" &&
    turf.image.trim() !== ""
  ) {
    imageUrlToProcess = turf.image;
  } else if (
    turf.images &&
    Array.isArray(turf.images) &&
    turf.images.length > 0
  ) {
    const firstValidImage = turf.images.find(
      (img) => typeof img === "string" && img.trim() !== ""
    );
    if (firstValidImage) {
      imageUrlToProcess = firstValidImage;
    }
  }

  if (imageUrlToProcess) {
    // const correctedUrl = imageUrlToProcess.replace("/venue/venue/", "/venue/");
    // if (imageUrlToProcess !== correctedUrl) {
    //   console.log(
    //     `[adaptTurf] Original image URL: ${imageUrlToProcess}, Corrected URL: ${correctedUrl}`
    //   );
    // }
    // turfImages = [correctedUrl];
    turfImages = [imageUrlToProcess]; // Use the original URL directly
  } else {
    console.log("[adaptTurf] No valid image URL found, using DUMMY_IMAGE.");
  }

  const adaptedTurf = {
    id: String(turf.id),
    name: turf.name || "Unnamed Turf",
    venueId: String(venueId),
    sportType: turf.sport_type || turf.sportType || "football",
    pricePerHour: parseFloat(turf.price_per_hr || turf.pricePerHour || "0"),
    description: turf.description || DUMMY_DESCRIPTION,
    images: turfImages,
    amenities:
      turf.amenities && Array.isArray(turf.amenities)
        ? (turf.amenities.map((amenity: ApiAmenityResponse) => ({
            id: String(amenity.id || Math.random().toString(36).substr(2, 9)),
            name: amenity.name || "Unnamed Amenity",
            icon: amenity.icon || "default_icon.svg",
          })) as Amenity[])
        : [],
    bookings: [],
    createdAt: turf.created_at || turf.createdAt || dummyTimestamp,
    updatedAt: turf.updated_at || turf.updatedAt || dummyTimestamp,
  };
  console.log(
    "[adaptTurf] Adapted turf data:",
    JSON.parse(JSON.stringify(adaptedTurf))
  );
  return adaptedTurf;
}

// Adapt a Venue from the backend format to the full Venue type
export function adaptVenue(venue: ApiVenueResponse): Venue {
  console.log(
    "[adaptVenue] Input venue data:",
    JSON.parse(JSON.stringify(venue))
  );
  console.log("[adaptVenue] Raw gmaps_link from backend:", venue.gmaps_link);
  // console.log(
  //   "[adaptVenue] Raw google_maps_link from backend:",
  //   venue.google_maps_link // This field is removed from ApiVenueResponse
  // );

  let venueImages: string[] = [DUMMY_IMAGE];
  let imageUrlToProcess: string | undefined = undefined;

  if (
    venue.venue_image_url &&
    typeof venue.venue_image_url === "string" &&
    venue.venue_image_url.trim() !== ""
  ) {
    imageUrlToProcess = venue.venue_image_url;
  } else if (
    venue.image &&
    typeof venue.image === "string" &&
    venue.image.trim() !== ""
  ) {
    imageUrlToProcess = venue.image;
  } else if (
    venue.images &&
    Array.isArray(venue.images) &&
    venue.images.length > 0
  ) {
    const firstValidImage = venue.images.find(
      (img) => typeof img === "string" && img.trim() !== ""
    );
    if (firstValidImage) {
      imageUrlToProcess = firstValidImage;
    }
  }

  if (imageUrlToProcess) {
    venueImages = [imageUrlToProcess]; // Use the original URL directly
  } else {
    console.log("[adaptVenue] No valid image URL found, using DUMMY_IMAGE.");
  }

  // Construct address string
  let finalAddress: string;
  if (
    venue.address &&
    typeof venue.address === "string" &&
    venue.address.trim() !== ""
  ) {
    finalAddress = venue.address;
  } else {
    const addressParts = [
      venue.address_street,
      venue.address_city,
      venue.address_state,
      venue.address_zip_code,
      venue.address_country,
    ].filter(Boolean); // Filter out null, undefined, or empty string parts

    if (addressParts.length > 0) {
      finalAddress = addressParts.join(", ");
    } else {
      finalAddress = ""; // Changed from DUMMY_ADDRESS to an empty string
    }
  }

  const adaptedVenue = {
    id: String(venue.id),
    name: venue.name || "Unnamed Venue",
    address: finalAddress,
    description: venue.description || DUMMY_DESCRIPTION, // Prioritize backend description
    images: venueImages,
    gmapsLink: venue.gmaps_link || DUMMY_GMAPS_LINK, // Renamed and updated logic
    host: {
      id: String(venue.host_id || venue.host?.id || venue.id),
      name: venue.host_name || venue.host?.name || "Unnamed Host",
      email: venue.host_email || venue.host?.email || DUMMY_EMAIL,
      isHost: venue.host?.isHost !== undefined ? venue.host.isHost : true,
      profilePicture:
        venue.host_profile_picture || venue.host?.profilePicture || DUMMY_IMAGE,
      phone: venue.host_phone || venue.host?.phone || DUMMY_PHONE,
      createdAt: venue.host?.createdAt || dummyTimestamp,
      updatedAt: venue.host?.updatedAt || dummyTimestamp,
    } as User,
    turfs: (venue.turfs || []).map((t: ApiTurfResponse) =>
      adaptTurf(t, venue.id)
    ),
    createdAt: venue.created_at || venue.createdAt || dummyTimestamp,
    updatedAt: venue.updated_at || venue.updatedAt || dummyTimestamp,
  };
  console.log(
    "[adaptVenue] Adapted venue data:",
    JSON.parse(JSON.stringify(adaptedVenue))
  );
  console.log(
    "[adaptVenue] Final adaptedVenue.gmapsLink:",
    adaptedVenue.gmapsLink
  ); // Updated log
  return adaptedVenue;
}

// Adapter function to process an array of backend venue objects
export function adaptVenues(venues: ApiVenueResponse[]): Venue[] {
  return venues.map(adaptVenue);
}

interface ApiBookingResponse {
  id?: number | string;
  turf_id?: string | number;
  turf?: ApiTurfResponse;
  user_id?: string | number;
  user_details?: { username?: string };
  start_time?: string;
  start_datetime?: string;
  end_time?: string;
  end_datetime?: string;
  total_price?: string | number;
  status?: string;
  is_offline?: boolean;
  payment_id?: string;
  paymentId?: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
  venue_name?: string;
}

// Adapter function to adapt a single booking
export function adaptBooking(bookingData: ApiBookingResponse): Booking {
  console.log(
    "[adaptBooking] Input booking data:",
    JSON.parse(JSON.stringify(bookingData))
  );
  const adaptedBooking = {
    id: bookingData.id ? String(bookingData.id) : "dummy_id",
    turfId: bookingData.turf_id
      ? String(bookingData.turf_id)
      : bookingData.turf?.id
      ? String(bookingData.turf.id)
      : "0", // Ensured String conversion
    userId: bookingData.user_id
      ? String(bookingData.user_id)
      : bookingData.user_details?.username
      ? String(bookingData.user_details.username)
      : "0", // Ensured String conversion
    startTime:
      bookingData.start_time || bookingData.start_datetime || dummyTimestamp, // Corrected to dummyTimestamp
    endTime: bookingData.end_time || bookingData.end_datetime || dummyTimestamp, // Corrected to dummyTimestamp
    totalPrice: parseFloat(String(bookingData.total_price || "0")),
    status: bookingData.status
      ? (bookingData.status as Booking["status"])
      : !bookingData.is_offline
      ? "online"
      : "offline",
    paymentId:
      bookingData.payment_id || bookingData.paymentId || DUMMY_PAYMENT_ID,
    createdAt:
      bookingData.created_at || bookingData.createdAt || dummyTimestamp, // Corrected to dummyTimestamp
    updatedAt:
      bookingData.updated_at || bookingData.updatedAt || dummyTimestamp, // Corrected to dummyTimestamp
    turf: bookingData.turf
      ? typeof bookingData.turf === "object"
        ? adaptTurf(bookingData.turf, bookingData.turf.id || "0") // Use adaptTurf for consistency
        : { id: String(bookingData.turf) } // Should ideally not happen if turf is ApiTurfResponse
      : undefined,
    venue_name: bookingData.venue_name || null,
  };
  console.log(
    "[adaptBooking] Adapted booking data:",
    JSON.parse(JSON.stringify(adaptedBooking))
  );
  return adaptedBooking;
}

// Adapter function for an array of bookings
export function adaptBookings(rawBookings: ApiBookingResponse[]): Booking[] {
  return rawBookings.map(adaptBooking);
}
