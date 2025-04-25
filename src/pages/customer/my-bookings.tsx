import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have Shadcn's button component
import CustomerSidebar from "./customer-sidebar"; // Assuming you have a sidebar component

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    setBookings(savedBookings);
  }, []);

  const handleCancelBooking = (index: number) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
    alert("Booking canceled successfully.");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">My Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-700">No bookings found.</p>
        ) : (
          <div>
            {bookings.map((booking, index) => (
              <div key={index} className="flex justify-between items-center border-b py-4">
                <div>
                  <p><strong>Source:</strong> {booking.source}</p>
                  <p><strong>Destination:</strong> {booking.destination}</p>
                  <p><strong>Departure Date:</strong> {new Date(booking.departureDate).toLocaleDateString()}</p>
                  {booking.tripType === "round-trip" && (
                    <p><strong>Return Date:</strong> {new Date(booking.returnDate).toLocaleDateString()}</p>
                  )}
                </div>
                <Button
                  onClick={() => handleCancelBooking(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Cancel Booking
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
