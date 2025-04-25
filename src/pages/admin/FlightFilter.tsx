import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/admin-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Flight } from "@/pages/types/index";
import { format } from "date-fns";

const FlightFilter: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/filter", {
        params: {
          source,
          destination,
          startDate,
          endDate,
          price,
          status,
        },
      });
      setFlights(res.data);
    } catch {
      toast.error("Failed to fetch filtered flights");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Filter Flights</h1>

        <Card className="mb-4">
          <CardContent className="p-4 flex flex-wrap gap-4 items-end">
            <Input placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} />
            <Input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <Input placeholder="Max Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input placeholder="Status (ACTIVE/CANCELLED)" value={status} onChange={(e) => setStatus(e.target.value)} />
            <Button onClick={handleSearch}>Search</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="overflow-x-auto p-4">
            {loading ? (
              <p>Loading...</p>
            ) : flights.length === 0 ? (
              <p>No flights found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Departs</TableHead>
                    <TableHead>Arrives</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flights.map((flight) => (
                    <TableRow key={flight.fid}>
                      <TableCell>{flight.fid}</TableCell>
                      <TableCell>{flight.fname}</TableCell>
                      <TableCell>{flight.source}</TableCell>
                      <TableCell>{flight.destination}</TableCell>
                      <TableCell>{format(new Date(flight.departure_datetime), "PPpp")}</TableCell>
                      <TableCell>{format(new Date(flight.arrival_datetime), "PPpp")}</TableCell>
                      <TableCell>{flight.price}</TableCell>
                      <TableCell>{flight.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FlightFilter;
