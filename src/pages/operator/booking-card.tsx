// src/pages/operator/components/booking-card.tsx

import { FC } from "react";
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Booking } from "../types/index"; // Import the Booking type

interface BookingCardProps {
  booking: Booking;
  flightName: string;
}

const BookingCard: FC<BookingCardProps> = ({ booking, flightName }) => {
  return (
    <Card className="w-full p-4 shadow-lg">
      <CardHeader>
        <h3 className="text-xl font-semibold">{flightName}</h3>
        <div className="text-sm text-gray-500">Booking ID: {booking.bid}</div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">Passenger ID: {booking.pid}</p>
        <p className="text-gray-700">Booking Status: {booking.booking_status}</p>
        <p className="text-gray-700">Amount: ${booking.amount}</p>
        <p className="text-gray-700">Booking Date: {new Date(booking.booking_datetime).toLocaleString()}</p>
      </CardContent>
      <CardFooter>
        <Badge variant={booking.booking_status === "Confirmed" ? "outline" : "destructive"}>
          {booking.booking_status}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
