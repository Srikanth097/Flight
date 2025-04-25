import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming you have Shadcn's button component
import jsPDF from "jspdf"; // Importing jsPDF
import CustomerSidebar from "./customer-sidebar"; // Assuming you have a sidebar component

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { source, destination, departureDate, returnDate, tripType } = location.state;

  const handleConfirmBooking = () => {
    // Simulate storing the booking in local storage or database
    const newBooking = { source, destination, departureDate, returnDate, tripType };
    const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
    existingBookings.push(newBooking);
    localStorage.setItem("userBookings", JSON.stringify(existingBookings));

    alert("Booking confirmed successfully!");
    navigate("/customer/my-bookings");
  };

  const generateTicketPDF = () => {
    const doc = new jsPDF();
    
    // Custom Ticket Template
    doc.setFillColor(255, 204, 0); // Set background color for the header (yellow)
    doc.rect(0, 0, 210, 40, "F"); // Draw a rectangle for header

    // Header Text
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Flight Ticket", 105, 25, { align: "center" });

    // Ticket Body
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    doc.text(`Source: ${source}`, 20, 60);
    doc.text(`Destination: ${destination}`, 20, 70);
    doc.text(`Departure Date: ${new Date(departureDate).toLocaleDateString()}`, 20, 80);
    if (tripType === "round-trip") {
      doc.text(`Return Date: ${new Date(returnDate).toLocaleDateString()}`, 20, 90);
    }
    doc.text(`Trip Type: ${tripType === "one-way" ? "One-Way" : "Round-Trip"}`, 20, 100);

    // Draw a horizontal line after ticket details
    doc.setLineWidth(0.5);
    doc.line(20, 110, 190, 110);

    // Footer section
    doc.setFontSize(10);
    doc.text("Thank you for choosing our airline!", 105, 120, { align: "center" });
    doc.text("Ticket Number: #1234567890", 105, 130, { align: "center" });

    // Save PDF to file
    doc.save("flight-ticket.pdf");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <CustomerSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Booking Confirmation</h1>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-blue-900">Your Flight Details</h2>
          <p><strong>Source:</strong> {source}</p>
          <p><strong>Destination:</strong> {destination}</p>
          <p><strong>Departure Date:</strong> {new Date(departureDate).toLocaleDateString()}</p>
          {tripType === "round-trip" && (
            <p><strong>Return Date:</strong> {new Date(returnDate).toLocaleDateString()}</p>
          )}
          <p><strong>Trip Type:</strong> {tripType === "one-way" ? "One-Way" : "Round-Trip"}</p>

          <div className="mt-6 flex justify-center gap-4">
            <Button
              onClick={handleConfirmBooking}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Confirm Booking
            </Button>

            <Button
              onClick={generateTicketPDF}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Download Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
