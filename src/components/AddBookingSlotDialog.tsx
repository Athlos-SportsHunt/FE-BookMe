import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Pen } from "lucide-react";

interface AddBookingSlotDialogProps {
  onAdd: (data: {
    date: string;
    startTime: string;
    duration: number; // duration in minutes
    userName: string;
  }) => void;
}

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    options.push(`${hour.toString().padStart(2, "0")}:00`);
    options.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return options;
};

const AddBookingSlotDialog: React.FC<AddBookingSlotDialogProps> = ({ onAdd }) => {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(60); // default 60 mins
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);

  // Helper to check if a date is today
  const isToday = (d: Date | null) => {
    if (!d) return false;
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  };

  // Helper to get current time in minutes since midnight
  const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  // Filter time options if date is today
  const timeOptions = generateTimeOptions().filter((t) => {
    if (!date || !isToday(date)) return true;
    // t is in format 'HH:mm'
    const [h, m] = t.split(":").map(Number);
    const optionMinutes = h * 60 + m;
    return optionMinutes > getCurrentMinutes();
  });

  const handleDurationChange = (delta: number) => {
    setDuration((prev) => {
      const next = prev + delta;
      if (next < 60) return 60;
      if (next > 300) return 300; // max 5 hours
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !userName) return;
    onAdd({
      date: format(date, "yyyy-MM-dd"),
      startTime,
      duration,
      userName,
    });
    setOpen(false);
    setDate(null);
    setStartTime("");
    setDuration(60);
    setUserName("");
  };

  // Disable past dates in calendar
  const disablePastDates = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Pen className="mr-2 h-4 w-4" />Add Booking Slot
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Offline Booking Slot</DialogTitle>
          <DialogDescription>
            Fill in the details to add an offline booking slot for this turf.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mt-2"
              disabled={disablePastDates}
            />
          </div>
          <div>
            <Label>Start Time</Label>
            <select
              className="w-full border rounded px-2 py-2 mt-1"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              required
            >
              <option value="" disabled>Select time</option>
              {timeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Duration (minutes)</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Button type="button" variant="outline" onClick={() => handleDurationChange(-30)} disabled={duration === 60}>-30</Button>
              <span className="font-semibold w-12 text-center">{duration}</span>
              <Button type="button" variant="outline" onClick={() => handleDurationChange(30)} disabled={duration === 300}>+30</Button>
            </div>
            <div className="text-xs text-gray-500 mt-1">Min 60, Max 300 (5 hours), step 30 mins</div>
          </div>
          <div>
            <Label>User Name</Label>
            <Input
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-sporty-600 text-white">Add Slot</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookingSlotDialog;
