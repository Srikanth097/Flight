import { FC } from "react";
import { Table } from "@/components/ui/table"; // Table component
import { Button } from "@/components/ui/button"; // Button component
import { Pencil, Trash } from "lucide-react"; // Icons for actions
import OperatorSidebar from "./operator-sidebar"; // Import the sidebar component

const OperatorBookings: FC = () => {
  const bookings = [
    { id: 1, flightName: "Air India", customerName: "John Doe", status: "Confirmed", date: "2025-04-20" },
    { id: 2, flightName: "SpiceJet", customerName: "Jane Smith", status: "Pending", date: "2025-05-01" },
    { id: 3, flightName: "Indigo", customerName: "Michael Brown", status: "Confirmed", date: "2025-04-15" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <OperatorSidebar />

      {/* Main Content (Bookings Table) */}
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-semibold mb-6">Manage Bookings</h2>

        <Table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Flight</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.flightName}</td>
                <td>{booking.customerName}</td>
                <td>{booking.status}</td>
                <td>{booking.date}</td>
                <td>
                  <Button variant="outline" className="mr-2">
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <Button variant="destructive">
                    <Trash className="h-5 w-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OperatorBookings;
