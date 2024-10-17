"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, useEffect, useMemo } from "react";

// Import custom UI components from the UI directory
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Default export of the DigitalClockComponent function
export default function DigitalClock() {
  // State hooks for managing current time, time format (24-hour or 12-hour), and component mount status
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  // Effect hook to run on component mount
  useEffect(() => {
    setMounted(true); // Set mounted status to true
    const interval = setInterval(() => {
      setTime(new Date()); // Update the time every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  // Memoized computation of formatted time to avoid unnecessary recalculations
  const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""; // Don't render time on the server
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") // Format hours in 24-hour format
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); // Format hours in 12-hour format
    const minutes = time.getMinutes().toString().padStart(2, "0"); // Format minutes
    const seconds = time.getSeconds().toString().padStart(2, "0"); // Format seconds
    return `${hours}:${minutes}:${seconds}`; // Return formatted time string
  }, [time, is24Hour, mounted]); // Dependencies to re-run the memoized function

  // JSX return statement rendering the digital clock UI
  return (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      {/* Center the digital clock within the screen */}
      <Card className="p-20 shadow-lg rounded-full h-96 bg-[url('/img/p2.jpg')] bg-cover bg-center">
        <div className="flex flex-col items-center justify-center">
          {/* Header with title */}
          <div className="text-6xl font-bold tracking-tight text-indigo-800">Digital Clock</div>
          {/* Description */}
          <div className="text-base text-indigo-700 mb-4 font-extrabold">
            Display Current Time in Hours, Minutes and Seconds.
          </div>
          {/* Display the formatted time */}
          <div className="text-8xl font-bold tracking-tight text-indigo-700">
            {formattedTime}
          </div>
          {/* Buttons to switch between 24-hour and 12-hour formats */}
          <div className="mt-4 flex items-center">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className="mr-2 font-bold font-mono hover:bg-pink-400 hover:text-black"
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className="mr-2 font-bold font-mono hover:bg-pink-400 hover:text-black"
            >
              12-Hour Format
            </Button>
          </div>
          <div>
            <p className="p-5 font-mono text-white">Made by <b className="text-red-700 bg-white text-base">MARYAM ANSARI</b></p>
          </div>
        </div>
      </Card>
    </div>
  );
}