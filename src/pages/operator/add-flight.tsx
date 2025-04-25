import { FC, useState } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Input } from "@/components/ui/input"; // ShadCN Input
import { Select, SelectItem } from "@/components/ui/select"; // ShadCN Select and SelectItem
import OperatorSidebar from "./operator-sidebar"; // Import the sidebar component

const AddFlight: FC = () => {
  const [flightName, setFlightName] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departureTime, setDepartureTime] = useState<string>("");
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFlight = {
      flightName,
      source,
      destination,
      departureTime,
      arrivalTime,
      status,
    };

    try {
      const response = await fetch("/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFlight),
      });

      if (response.ok) {
        // Redirecting after successful submission
        window.location.href = "/operator/flights";
      }
    } catch (error) {
      console.error("Error adding flight:", error);
    }
  };

  return (
    <div className="flex">
      <OperatorSidebar /> {/* Sidebar */}
      <div className="p-6 w-full">
        <h2 className="text-2xl font-semibold mb-6">Add a New Flight</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Flight Name"
            value={flightName}
            onChange={(e) => setFlightName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <Input
            type="datetime-local"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            required
          />
          <Input
            type="datetime-local"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            required
          />
          
          <Select value={status} onValueChange={(value) => setStatus(value)} required>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </Select>
          
          <Button type="submit" className="w-full">Add Flight</Button>
        </form>
      </div>
    </div>
  );
};

export default AddFlight;
