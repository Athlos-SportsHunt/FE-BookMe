import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  getSportIcon
} from "@/utils/sportIcons";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { turfs, venues } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Turf, Venue, Booking } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format, addHours, addMinutes, isBefore, isAfter, parseISO, set } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const MapPinIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const CalendarIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ChevronLeftIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const PlusIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CreditCardIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const CheckIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const InfoIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const TurfDetails = () => {
  const { venueId, turfId } = useParams<{ venueId: string; turfId: string }>();
  const navigate = useNavigate();
  const [turf, setTurf] = useState<Turf | null>(null);
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<{ time: Date; available: boolean }[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [durationMinutes, setDurationMinutes] = useState(60); // Default 60 minutes
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [timeSliderValue, setTimeSliderValue] = useState([0]); // Start at minimum time
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(32); // (16 hours * 2 slots per hour)

  useEffect(() => {
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

  useEffect(() => {
    if (!turf) return;

    const slots = [];
    const now = new Date();
    const startHour = 6; // 6 AM
    const endHour = 22; // 10 PM

    const isToday = selectedDate.toDateString() === now.toDateString();
    
    const currentHour = now.getHours();
    const startFromHour = isToday ? Math.max(currentHour, startHour) : startHour;
    
    let sliderStartIndex = 0;
    let sliderEndIndex = (endHour - startHour) * 2; // 2 slots per hour (30 min intervals)
    let slotIndex = 0;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slotTime = new Date(selectedDate);
        slotTime.setHours(hour, minute, 0, 0);
        
        let isAvailable = true;
        
        if (isToday) {
          const minBookingTime = new Date(now);
          minBookingTime.setMinutes(now.getMinutes() + 30);
          
          if (slotTime < minBookingTime) {
            isAvailable = false;
            
            if (hour * 2 + (minute === 30 ? 1 : 0) === slotIndex) {
              sliderStartIndex++;
            }
          }
        }
        
        const potentialEndTime = addMinutes(slotTime, durationMinutes);
        const slotOverlapsBooking = turf.bookings.some((booking: Booking) => {
          const bookingStart = new Date(booking.startTime);
          const bookingEnd = new Date(booking.endTime);
          
          return (
            (isAfter(slotTime, bookingStart) && isBefore(slotTime, bookingEnd)) ||
            (isAfter(potentialEndTime, bookingStart) && isBefore(potentialEndTime, bookingEnd)) ||
            (isBefore(slotTime, bookingStart) && isAfter(potentialEndTime, bookingEnd)) ||
            slotTime.getTime() === bookingStart.getTime()
          );
        });
        
        if (slotOverlapsBooking) {
          isAvailable = false;
        }
        
        slots.push({
          time: slotTime,
          available: isAvailable,
        });
        
        slotIndex++;
      }
    }
    
    setTimeSlots(slots);
    setSliderMin(sliderStartIndex);
    setSliderMax(sliderEndIndex);
    setTimeSliderValue([sliderStartIndex]);
    
    setSelectedStartTime(null);
  }, [turf, selectedDate, durationMinutes]);
  
  useEffect(() => {
    if (timeSlots.length === 0 || timeSliderValue[0] < sliderMin) return;
    
    const selectedSlotIndex = timeSliderValue[0];
    const adjustedIndex = selectedSlotIndex - sliderMin;
    
    if (adjustedIndex >= 0 && adjustedIndex < timeSlots.length) {
      const selectedSlot = timeSlots[adjustedIndex];
      
      if (selectedSlot && selectedSlot.available) {
        setSelectedStartTime(selectedSlot.time);
      } else {
        const nextAvailableIndex = timeSlots.findIndex(
          (slot, index) => index >= adjustedIndex && slot.available
        );
        
        if (nextAvailableIndex !== -1) {
          setSelectedStartTime(timeSlots[nextAvailableIndex].time);
          setTimeSliderValue([nextAvailableIndex + sliderMin]);
        } else {
          setSelectedStartTime(null);
        }
      }
    }
  }, [timeSliderValue, timeSlots, sliderMin]);
  
  const formatSliderTime = (value: number) => {
    if (timeSlots.length === 0) return "";
    
    const adjustedIndex = value - sliderMin;
    if (adjustedIndex < 0 || adjustedIndex >= timeSlots.length) return "";
    
    return format(timeSlots[adjustedIndex].time, "h:mm a");
  };

  const increaseDuration = () => {
    if (durationMinutes < 180) { // Max 3 hours
      setDurationMinutes(durationMinutes + 30);
    }
  };

  const decreaseDuration = () => {
    if (durationMinutes > 30) { // Min 30 minutes
      setDurationMinutes(durationMinutes - 30);
    }
  };

  const calculateEndTime = () => {
    if (!selectedStartTime) return null;
    return addMinutes(selectedStartTime, durationMinutes);
  };

  const calculateTotalPrice = () => {
    if (!turf || !selectedStartTime) return 0;
    return (turf.pricePerHour / 60) * durationMinutes;
  };

  const handleBookNow = () => {
    if (!selectedStartTime) return;
    setBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!turf || !selectedStartTime) return;
    
    setTimeout(() => {
      setBookingConfirmed(true);
      toast({
        title: "Booking Confirmed!",
        description: `Your booking for ${format(selectedStartTime, "h:mm a")} - ${format(calculateEndTime() || new Date(), "h:mm a")} on ${format(selectedDate, "MMMM d, yyyy")} has been confirmed.`,
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

  const endTime = calculateEndTime();
  const totalPrice = calculateTotalPrice();
  const SportIcon = getSportIcon(turf.sportType);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to={`/venue/${venueId}`} className="inline-flex items-center text-gray-600 hover:text-sporty-600 mb-6">
        <ChevronLeftIcon className="h-5 w-5 mr-1" /> Back to venue
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{turf.name}</h1>
        <div className="flex items-center text-gray-600 mb-1">
          <MapPinIcon className="h-5 w-5 mr-2" />
          <span>{venue.name}, {venue.address}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <div className="flex items-center mr-4">
            <SportIcon className="h-5 w-5 mr-1" />
            <span className="ml-1 capitalize">{turf.sportType}</span>
          </div>
          <div className="text-sporty-600 font-bold">₹{turf.pricePerHour}/hour</div>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <InfoIcon className="h-5 w-5 mr-2 text-sporty-600" /> About this turf
              </h2>
              <p className="text-gray-700 mb-6">
                {turf.description ||
                  "This is a premium quality turf designed for an exceptional sporting experience. The surface is well-maintained and provides excellent playing conditions."}
              </p>

              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {turf.amenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center">
                    <CheckIcon className="h-4 w-4 text-sporty-600 mr-2" />
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
              <h3 className="font-semibold mb-4">Select Starting Time</h3>
              <div className="mb-6">
                <Slider
                  value={timeSliderValue}
                  min={sliderMin}
                  max={sliderMax}
                  step={1}
                  onValueChange={setTimeSliderValue}
                  disabled={timeSlots.length === 0}
                />
                
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-gray-500">
                    {timeSlots.length > 0 && sliderMin < timeSlots.length
                      ? format(timeSlots[0].time, "h:mm a")
                      : "6:00 AM"}
                  </div>
                  <div className="font-medium text-center px-3 py-1 bg-sporty-50 rounded text-sporty-700">
                    {selectedStartTime ? format(selectedStartTime, "h:mm a") : "Select time"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {timeSlots.length > 0 && sliderMax > sliderMin
                      ? format(timeSlots[timeSlots.length - 1].time, "h:mm a")
                      : "10:00 PM"}
                  </div>
                </div>
              </div>
              
              {timeSlots.length === 0 && (
                <p className="text-gray-500 text-center py-2">No available slots for this date</p>
              )}
            </div>
            
            <div className="p-6 border-b">
              <h3 className="font-semibold mb-3">Duration</h3>
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={decreaseDuration}
                  disabled={durationMinutes <= 30}
                  className="h-8 w-8"
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <div className="text-center font-medium">
                  {durationMinutes} minutes
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={increaseDuration}
                  disabled={durationMinutes >= 180}
                  className="h-8 w-8"
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              
              {selectedStartTime && endTime && (
                <div className="mt-3 text-center text-sm bg-sporty-50 p-2 rounded">
                  {format(selectedStartTime, "h:mm a")} - {format(endTime, "h:mm a")}
                </div>
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
                    ₹{totalPrice.toFixed(0)}
                  </span>
                </div>
                <Button
                  className="w-full bg-sporty-600 hover:bg-sporty-700 text-white"
                  disabled={!selectedStartTime}
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

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

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="text-sm text-gray-500 mb-1">Date & Time</div>
                    <div className="font-medium">
                      {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                    </div>
                    <div className="font-medium">
                      {selectedStartTime && endTime &&
                        `${format(selectedStartTime, "h:mm a")} - ${format(endTime, "h:mm a")}`}
                      <div className="text-sm text-gray-500">({durationMinutes} minutes)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-sm text-gray-500 mb-1">Amount</div>
                  <div className="font-bold text-sporty-600">₹{totalPrice.toFixed(0)}</div>
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
                        <CreditCardIcon className="h-4 w-4 mr-2" /> Credit / Debit Card
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
                  <CheckIcon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold mb-1">Payment Successful</h3>
                <p className="text-gray-600 text-center">
                  Your booking for {format(selectedStartTime, "h:mm a")} - {format(endTime || addHours(new Date(), 1), "h:mm a")} on {format(selectedDate, "MMMM d, yyyy")} has been confirmed.
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
