import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Airplay } from "lucide-react"; // Using Airplane icon from lucide-react
import { DayPicker } from "react-day-picker"; // Import react-day-picker
import { Button } from "@/components/ui/button"; // Assuming you have Shadcn's button component
import { Input } from "@/components/ui/input"; // Assuming you have Shadcn's input component
import CustomerSidebar from "./customer-sidebar"; // Import the CustomerSidebar

const SearchFlight = () => {
  const navigate = useNavigate();

  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined); // Changed null to undefined
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined); // Changed null to undefined
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");

  const handleSearch = () => {
    // Basic validation to check if source, destination and date are provided
    if (!source || !destination || !departureDate) {
      alert("Please fill in all required fields");
      return;
    }

    console.log({ source, destination, departureDate, returnDate, tripType });
    navigate("/customer/selected-flight", {
      state: { source, destination, departureDate, returnDate, tripType }, // Passing state to the next page
    }); // Navigate to selected flight page after search
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Search Flights</h1>

        <div className="flex justify-between gap-4">
          <div className="flex-1">
            <label className="block text-gray-700">Source</label>
            <Input
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter source city"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">Destination</label>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter destination city"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-6">
          <div className="flex-1">
            <label className="block text-gray-700">Departure Date</label>
            <DayPicker
              selected={departureDate} // Now accepts Date or undefined
              onDayClick={setDepartureDate} // Setting the selected date
              className="w-full p-2 border rounded-md"
              mode="single"
              disabled={{ before: new Date() }} // Disabling past dates
            />
          </div>

          {tripType === "round-trip" && (
            <div className="flex-1">
              <label className="block text-gray-700">Return Date</label>
              <DayPicker
                selected={returnDate} // Now accepts Date or undefined
                onDayClick={setReturnDate} // Setting the selected return date
                className="w-full p-2 border rounded-md"
                mode="single"
                disabled={{ before: departureDate || new Date() }} // Disabling past dates or before departure date
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="one-way"
                name="trip-type"
                value="one-way"
                checked={tripType === "one-way"}
                onChange={() => setTripType("one-way")}
                className="form-radio"
              />
              <label htmlFor="one-way">One-Way</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="round-trip"
                name="trip-type"
                value="round-trip"
                checked={tripType === "round-trip"}
                onChange={() => setTripType("round-trip")}
                className="form-radio"
              />
              <label htmlFor="round-trip">Round-Trip</label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Airplay size={18} />
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;
