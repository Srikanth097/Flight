import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/admin-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Flight } from "@/pages/types/index";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const FlightList: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);
  const [newDeparture, setNewDeparture] = useState("");
  const [newArrival, setNewArrival] = useState("");

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/flights");
      setFlights(res.data);
    } catch (error) {
      toast.error("Failed to fetch flights");
    } finally {
      setLoading(false);
    }
  };

  const cancelFlight = async (fid: number) => {
    try {
      await axios.delete(`/api/admin/flights/delete/${fid}`);
      toast.success("Flight cancelled");
      fetchFlights();
    } catch {
      toast.error("Failed to cancel flight");
    }
  };

  const updateSchedule = async () => {
    if (!editingFlight) return;
    try {
      await axios.put(`/api/admin/flights/update/${editingFlight.fid}`, null, {
        params: {
          newDeparture,
          newArrival,
        },
      });
      toast.success("Flight schedule updated");
      setEditingFlight(null);
      fetchFlights();
    } catch {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">All Flights</h1>
        <Card>
          <CardContent className="overflow-x-auto p-4">
            {loading ? (
              <p>Loading...</p>
            ) : flights.length === 0 ? (
              <p>No flights available.</p>
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
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell>{flight.status}</TableCell>
                      <TableCell className="flex gap-2 justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => {
                              setEditingFlight(flight);
                              setNewDeparture(flight.departure_datetime);
                              setNewArrival(flight.arrival_datetime);
                            }}>
                              Update
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="flex flex-col gap-4">
                            <h2 className="text-lg font-semibold">Update Schedule</h2>
                            <Input
                              type="datetime-local"
                              value={newDeparture}
                              onChange={(e) => setNewDeparture(e.target.value)}
                            />
                            <Input
                              type="datetime-local"
                              value={newArrival}
                              onChange={(e) => setNewArrival(e.target.value)}
                            />
                            <Button onClick={updateSchedule}>Save Changes</Button>
                          </DialogContent>
                        </Dialog>

                        <Button size="sm" variant="destructive" onClick={() => cancelFlight(flight.fid)}>
                          Cancel
                        </Button>
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

export default FlightList;
