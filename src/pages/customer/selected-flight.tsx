import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Airplay } from "lucide-react"; // Using Airplane icon from lucide-react
import { Button } from "@/components/ui/button"; // Assuming you have Shadcn's button component
import { Input } from "@/components/ui/input"; // Assuming you have Shadcn's input component
import CustomerSidebar from "./customer-sidebar"; // Import the CustomerSidebar

const SelectedFlight = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [bookingData, setBookingData] = useState({
    source: location.state.source,
    destination: location.state.destination,
    departureDate: location.state.departureDate,
    returnDate: location.state.returnDate,
    tripType: location.state.tripType,
  });

  const [userBookings, setUserBookings] = useState<any[]>([]); // Replace with your state management solution if needed

  useEffect(() => {
    // Load current user bookings from local storage, API, or global state on component mount
    const savedBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    setUserBookings(savedBookings);
  }, []);

  const handleBookFlight = () => {
    // Validation (you can add more checks as needed)
    if (!bookingData.source || !bookingData.destination || !bookingData.departureDate) {
      alert("Please make sure all fields are filled before booking.");
      return;
    }

    const newBooking = {
      ...bookingData,
      bookingDate: new Date().toLocaleDateString(),
    };

    // Add the new booking to the user's bookings
    const updatedBookings = [...userBookings, newBooking];

    // Save to local storage (or API if you're using a backend)
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

    // Update the state
    setUserBookings(updatedBookings);

    alert("Your flight has been booked successfully!");

    // Optionally, navigate to the "My Bookings" page or wherever you want to show the bookings
    navigate("/customer/my-bookings");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Selected Flight</h1>

        <div className="flex justify-between gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-gray-700">Source</label>
            <Input
              value={bookingData.source}
              disabled
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">Destination</label>
            <Input
              value={bookingData.destination}
              disabled
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-gray-700">Departure Date</label>
            <Input
              value={bookingData.departureDate?.toLocaleDateString() || ""}
              disabled
              className="w-full p-2 border rounded-md"
            />
          </div>

          {bookingData.tripType === "round-trip" && (
            <div className="flex-1">
              <label className="block text-gray-700">Return Date</label>
              <Input
                value={bookingData.returnDate?.toLocaleDateString() || ""}
                disabled
                className="w-full p-2 border rounded-md"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={handleBookFlight}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Airplay size={18} />
            Book Flight
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedFlight;
