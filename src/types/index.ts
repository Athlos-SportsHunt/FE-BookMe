
export type SportType = 
  | "football" 
  | "cricket" 
  | "basketball" 
  | "tennis" 
  | "badminton" 
  | "volleyball" 
  | "rugby" 
  | "hockey";

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  description?: string;
  images: string[];
  googleMapsLink?: string;
  host: User;
  turfs: Turf[];
  createdAt: string;
  updatedAt: string;
}

export interface Turf {
  id: string;
  name: string;
  venueId: string;
  sportType: SportType;
  pricePerHour: number;
  description?: string;
  images: string[];
  amenities: Amenity[];
  bookings: Booking[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  turfId: string;
  userId: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isHost: boolean;
  profilePicture?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  status: "pending" | "completed" | "failed" | "refunded";
  gateway: "razorpay" | "other";
  gatewayPaymentId: string;
  gatewayOrderId: string;
  gatewaySignature?: string;
  createdAt: string;
  updatedAt: string;
}
