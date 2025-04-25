import { FC, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select"; // Import SelectItem as well
import OperatorSidebar from "./operator-sidebar"; // Import the sidebar component

const UpdateFlight: FC = () => {
  const [flightData, setFlightData] = useState<any>({
    flightName: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    status: "",
  });

  const [flightId, setFlightId] = useState<string | undefined>(undefined); // Added flightId state to hold flightId manually

  useEffect(() => {
    const fetchFlightData = async () => {
      const id = window.location.pathname.split("/").pop(); // Get flightId from URL path
      if (id) {
        setFlightId(id);
        const response = await fetch(`/api/flights/${id}`);
        const data = await response.json();
        setFlightData(data);
      }
    };

    fetchFlightData();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/flights/${flightId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flightData),
      });

      if (response.ok) {
        window.location.href = "/operator/flights"; // Redirect to the flights page
      }
    } catch (error) {
      console.error("Error updating flight:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFlightData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFlightData((prev: any) => ({ ...prev, status: value }));
  };

  return (
    <div className="flex">
      <OperatorSidebar /> {/* Sidebar */}
      <div className="p-6 w-full">
        <h2 className="text-2xl font-semibold mb-6">Update Flight</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input
            name="flightName"
            type="text"
            value={flightData.flightName}
            onChange={handleChange}
            placeholder="Flight Name"
            required
          />
          <Input
            name="source"
            type="text"
            value={flightData.source}
            onChange={handleChange}
            placeholder="Source"
            required
          />
          <Input
            name="destination"
            type="text"
            value={flightData.destination}
            onChange={handleChange}
            placeholder="Destination"
            required
          />
          <Input
            name="departureTime"
            type="datetime-local"
            value={flightData.departureTime}
            onChange={handleChange}
            required
          />
          <Input
            name="arrivalTime"
            type="datetime-local"
            value={flightData.arrivalTime}
            onChange={handleChange}
            required
          />
          <Select
            name="status"
            value={flightData.status}
            onValueChange={handleStatusChange} // Use onValueChange instead of onChange
            required
          >
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </Select>

          <Button type="submit" className="w-full">Update Flight</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFlight;
