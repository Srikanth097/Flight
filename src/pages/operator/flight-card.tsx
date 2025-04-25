// src/pages/operator/components/flight-card.tsx

import { FC } from "react";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flight } from "../types/index"; // Import the Flight type

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: FC<FlightCardProps> = ({ flight }) => {
  return (
    <Card className="w-full p-4 shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-semibold">{flight.fname}</h3>
        <div className="text-sm text-gray-500">{flight.fnumber}</div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">From: {flight.source}</p>
        <p className="text-gray-700">To: {flight.destination}</p>
        <p className="text-gray-700">Departure: {new Date(flight.departure_datetime).toLocaleString()}</p>
        <p className="text-gray-700">Arrival: {new Date(flight.arrival_datetime).toLocaleString()}</p>
        <div className="flex justify-between mt-2">
          <Badge variant="outline">{flight.stops === 0 ? "Non-stop" : "One-stop"}</Badge>
          <span className="text-gray-700">{flight.available_seats} Seats Available</span>
        </div>
      </CardContent>
      <CardFooter>
        <Badge variant={flight.status === "Scheduled" ? "outline" : "destructive"}>
          {flight.status}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default FlightCard;
