
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronLeft, 
  CreditCard, 
  Check,
  Info,
  SoccerBall,
  Cricket,
  Basketball,
  Tennis
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { turfs, venues } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Turf, Venue, Booking } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format, addHours, isBefore, isAfter, parseISO } from "date-fns";
import { toast } from "@/components/ui/use-toast";

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

const TurfDetails = () => {
  const { venueId, turfId } = useParams<{ venueId: string; turfId: string }>();
  const [turf, setTurf] = useState<Turf | null>(null);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<{ start: Date; end: Date; available: boolean }[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fetch turf and venue data
  useEffect(() => {
    // Simulating API fetch with setTimeout
    const timer = setTimeout(() => {
      try {
        if (!venueId || !turfId) {
          throw new Error("Venue ID and Turf ID are required");
        }

        const foundVenue = venues.find((v) => v.id === venueId);
        if (!foundVenue) {
          throw new Error("Venue not found");
        }

        const foundTurf = turfs.find((t) => t.id === turfId);
        if (!foundTurf) {
          throw new Error("Turf not found");
        }

        if (foundTurf.venueId !== venueId) {
          throw new Error("Turf does not belong to the specified venue");
        }

        setVenue(foundVenue);
        setTurf(foundTurf);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [venueId, turfId]);

  // Generate available slots for selected date
  useEffect(() => {
    if (!turf) return;

    const slots = [];
    const now = new Date();
    const startHour = 6; // 6 AM
    const endHour = 22; // 10 PM

    // Check if selected date is today
    const isToday = selectedDate.toDateString() === now.toDateString();
    
    // Start from current hour if today, otherwise from opening hour
    const currentHour = now.getHours();
    const startFromHour = isToday ? Math.max(currentHour + 1, startHour) : startHour;

    for (let hour = startFromHour; hour < endHour; hour++) {
      const slotStartTime = new Date(selectedDate);
      slotStartTime.setHours(hour, 0, 0, 0);
      
      const slotEndTime = new Date(selectedDate);
      slotEndTime.setHours(hour + 1, 0, 0, 0);

      // Check if slot overlaps with any existing booking
      const isAvailable = !turf.bookings.some((booking: Booking) => {
        const bookingStart = new Date(booking.startTime);
        const bookingEnd = new Date(booking.endTime);
        
        return (
          (isAfter(slotStartTime, bookingStart) && isBefore(slotStartTime, bookingEnd)) ||
          (isAfter(slotEndTime, bookingStart) && isBefore(slotEndTime, bookingEnd)) ||
          (isBefore(slotStartTime, bookingStart) && isAfter(slotEndTime, bookingEnd)) ||
          slotStartTime.getTime() === bookingStart.getTime() ||
          slotEndTime.getTime() === bookingEnd.getTime()
        );
      });

      slots.push({
        start: slotStartTime,
        end: slotEndTime,
        available: isAvailable,
      });
    }

    setAvailableSlots(slots);
  }, [turf, selectedDate]);

  const handleSlotSelect = (slot: { start: Date; end: Date; available: boolean }) => {
    if (!slot.available) return;
    setSelectedSlot({ start: slot.start, end: slot.end });
  };

  const handleBookNow = () => {
    if (!selectedSlot) return;
    setBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!turf || !selectedSlot) return;
    
    // In a real app, this would make an API call to create a booking
    setTimeout(() => {
      setBookingConfirmed(true);
      toast({
        title: "Booking Confirmed!",
        description: `Your booking for ${format(selectedSlot.start, "h:mm a")} - ${format(selectedSlot.end, "h:mm a")} on ${format(selectedDate, "MMMM d, yyyy")} has been confirmed.`,
        variant: "default",
      });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-sporty-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading turf details...</p>
        </div>
      </div>
    );
  }

  if (error || !turf || !venue) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
          <div className="text-red-500 text-4xl mb-4">❌</div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Turf</h2>
          <p className="text-gray-700 mb-6">{error || "Unable to load turf details"}</p>
          <Link to={`/venue/${venueId}`}>
            <Button className="bg-sporty-600 hover:bg-sporty-700 text-white">
              Back to Venue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Link to={`/venue/${venueId}`} className="inline-flex items-center text-gray-600 hover:text-sporty-600 mb-6">
        <ChevronLeft className="h-5 w-5 mr-1" /> Back to venue
      </Link>

      {/* Turf Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{turf.name}</h1>
        <div className="flex items-center text-gray-600 mb-1">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{venue.name}, {venue.address}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <div className="flex items-center mr-4">
            {getSportIcon(turf.sportType)}
            <span className="ml-1 capitalize">{turf.sportType}</span>
          </div>
          <div className="text-sporty-600 font-bold">₹{turf.pricePerHour}/hour</div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="mb-10">
        <div className="relative h-96 overflow-hidden rounded-lg mb-4">
          <img
            src={turf.images[activeImageIndex]}
            alt={turf.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {turf.images.map((image, index) => (
            <div
              key={index}
              className={`h-20 w-32 cursor-pointer rounded-md overflow-hidden ${
                activeImageIndex === index ? "ring-2 ring-sporty-600" : ""
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={image}
                alt={`${turf.name} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Turf Details and Booking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Info className="h-5 w-5 mr-2 text-sporty-600" /> About this turf
              </h2>
              <p className="text-gray-700 mb-6">
                {turf.description ||
                  "This is a premium quality turf designed for an exceptional sporting experience. The surface is well-maintained and provides excellent playing conditions."}
              </p>

              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {turf.amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center">
                    <Check className="h-4 w-4 text-sporty-600 mr-2" />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-3">Rules and Policies</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li>Please arrive 15 minutes before your booking time</li>
                <li>Wear appropriate footwear for the surface type</li>
                <li>No food or drinks allowed on the playing area</li>
                <li>Cancellations must be made 24 hours in advance for a full refund</li>
                <li>The venue reserves the right to cancel bookings due to maintenance or weather conditions</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Booking Sidebar */}
        <div>
          <div className="bg-white rounded-lg shadow-sm sticky top-24">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold mb-2">Book Your Slot</h2>
              <p className="text-gray-600">Select date and time to book this turf</p>
            </div>
            
            <div className="p-6 border-b">
              <h3 className="font-semibold mb-3">Select Date</h3>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                disabled={(date) => isBefore(date, new Date()) && date.toDateString() !== new Date().toDateString()}
                className="rounded border"
              />
            </div>
            
            <div className="p-6 border-b">
              <h3 className="font-semibold mb-3">Available Time Slots</h3>
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {availableSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded text-center cursor-pointer border ${
                        selectedSlot &&
                        slot.start.getTime() === selectedSlot.start.getTime()
                          ? "bg-sporty-600 text-white"
                          : slot.available
                          ? "bg-white hover:bg-sporty-50 text-gray-800"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                      onClick={() => slot.available && handleSlotSelect(slot)}
                    >
                      {format(slot.start, "h:mm a")} - {format(slot.end, "h:mm a")}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No available slots for this date</p>
              )}
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price per hour</span>
                  <span className="font-medium">₹{turf.pricePerHour}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-sporty-600">
                    ₹{selectedSlot ? turf.pricePerHour : 0}
                  </span>
                </div>
                <Button
                  className="w-full bg-sporty-600 hover:bg-sporty-700 text-white"
                  disabled={!selectedSlot}
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{bookingConfirmed ? "Booking Confirmed!" : "Confirm Booking"}</DialogTitle>
            <DialogDescription>
              {bookingConfirmed
                ? "Your booking has been confirmed. You'll receive a confirmation email shortly."
                : "Please review your booking details before confirming."}
            </DialogDescription>
          </DialogHeader>

          {!bookingConfirmed ? (
            <>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-500 mb-1">Turf</div>
                  <div className="font-medium">{turf.name}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-sm text-gray-500 mb-1">Date</div>
                    <div className="font-medium">
                      {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-sm text-gray-500 mb-1">Time</div>
                    <div className="font-medium">
                      {selectedSlot &&
                        `${format(selectedSlot.start, "h:mm a")} - ${format(selectedSlot.end, "h:mm a")}`}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-500 mb-1">Amount</div>
                  <div className="font-bold text-sporty-600">₹{turf.pricePerHour}</div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Payment Method</h3>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card" className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" /> Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking">Net Banking</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <DialogFooter className="sm:justify-between">
                <Button
                  variant="outline"
                  onClick={() => setBookingDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmBooking}
                  className="bg-sporty-600 hover:bg-sporty-700 text-white"
                >
                  Pay & Confirm
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <div className="py-10 flex flex-col items-center justify-center">
                <div className="bg-sporty-100 text-sporty-600 h-16 w-16 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-1">Payment Successful</h3>
                <p className="text-gray-600 text-center">
                  Your booking for {format(selectedSlot?.start || new Date(), "h:mm a")} - {format(selectedSlot?.end || addHours(new Date(), 1), "h:mm a")} on {format(selectedDate, "MMMM d, yyyy")} has been confirmed.
                </p>
              </div>

              <DialogFooter>
                <Link to="/profile">
                  <Button className="w-full bg-sporty-600 hover:bg-sporty-700 text-white">
                    View My Bookings
                  </Button>
                </Link>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TurfDetails;
