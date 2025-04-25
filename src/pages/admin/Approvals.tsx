import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/admin-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Flight } from "@/pages/types/index";
import { format } from "date-fns";

const Approvals: React.FC = () => {
  const [pendingFlights, setPendingFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/flight/pending-approvals?status=PENDING");
      setPendingFlights(res.data);
    } catch (err) {
      toast.error("Failed to load pending approvals.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (flightId: number) => {
    try {
      await axios.post(`/api/admin/flight/${flightId}/approve`);
      toast.success("Flight approved successfully!");
      fetchPending(); // Refresh list
    } catch (err) {
      toast.error("Failed to approve flight.");
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Pending Flight Approvals</h1>
        <Card>
          <CardContent className="overflow-x-auto p-4">
            {loading ? (
              <p>Loading...</p>
            ) : pendingFlights.length === 0 ? (
              <p>No pending approvals.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Flight Name</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingFlights.map((flight) => (
                    <TableRow key={flight.fid}>
                      <TableCell>{flight.fid}</TableCell>
                      <TableCell>{flight.fname}</TableCell>
                      <TableCell>{flight.source}</TableCell>
                      <TableCell>{flight.destination}</TableCell>
                      <TableCell>{format(new Date(flight.departure_datetime), "PPpp")}</TableCell>
                      <TableCell>{format(new Date(flight.arrival_datetime), "PPpp")}</TableCell>
                      <TableCell>{flight.status}</TableCell>
                      <TableCell className="text-right">
                        <Button onClick={() => handleApprove(flight.fid)}>Approve</Button>
                      </TableCell>
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

export default Approvals;
