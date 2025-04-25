import React, { useState, useEffect } from "react";
import { Flight, Stops, FlightStatus } from "../types"; // Importing the types
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Card } from "@/components/ui/card"; // ShadCN Card
import { Badge } from "@/components/ui/badge"; // ShadCN Badge for flight status
import { useNavigate } from "react-router-dom";

const FlightsPage = () => {
  const navigate = useNavigate();
  
  // State to hold the list of flights
  const [flights, setFlights] = useState<Flight[]>([]);

  // Fetch flights data from API or other data source
  useEffect(() => {
    // Simulate an API call
    const fetchFlights = async () => {
      const response = await fetch("/api/flights");
      const data = await response.json();
      setFlights(data); // Set the fetched data to the state
    };

    fetchFlights();
  }, []);

  // Function to handle booking
  const handleBooking = (flightId: number) => {
    navigate(`/book-flight/${flightId}`);
  };

  // Function to render flight status indicators
  const renderFlightStatus = (status: FlightStatus) => {
    switch (status) {
      case "Scheduled":
        return <Badge variant="outline" className="bg-green-200 text-green-800">Scheduled</Badge>;
      case "Delayed":
        return <Badge variant="outline" className="bg-yellow-200 text-yellow-800">Delayed</Badge>;
      case "Cancelled":
        return <Badge variant="outline" className="bg-red-200 text-red-800">Cancelled</Badge>;
      case "Completed":
        return <Badge variant="outline" className="bg-blue-200 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-200 text-gray-800">Unknown</Badge>;
    }
  };

  // Function to render flight stops (Non-stop or One-stop)
  const renderStops = (stops: Stops) => {
    return stops === 0 ? "Non-stop" : "One-stop";
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Available Flights</h1>

      {/* Flight list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {flights.map((flight) => (
          <Card key={flight.fid} className="max-w-xs mx-auto p-4">
            <h2 className="text-xl font-semibold mb-2">{flight.fname}</h2>
            <p className="text-gray-500 mb-2">Flight No: {flight.fnumber}</p>
            <p>
              <strong>From:</strong> {flight.source} <br />
              <strong>To:</strong> {flight.destination}
            </p>
            <p>
              <strong>Departure:</strong> {new Date(flight.departure_datetime).toLocaleString()} <br />
              <strong>Arrival:</strong> {new Date(flight.arrival_datetime).toLocaleString()}
            </p>
            <p>
              <strong>Duration:</strong> {flight.duration} <br />
              <strong>Price:</strong> ₹{flight.price}
            </p>
            <p>
              <strong>Stops:</strong> {renderStops(flight.stops)}
            </p>
            <div className="mt-2 mb-4">{renderFlightStatus(flight.status)}</div>
            <Button
              onClick={() => handleBooking(flight.fid)}
              disabled={flight.available_seats === 0}
              className="w-full mt-2"
            >
              {flight.available_seats === 0 ? "Sold Out" : "Book Now"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightsPage;
