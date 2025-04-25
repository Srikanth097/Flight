import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input"; // Assuming Input component is available
import { Label } from "@/components/ui/label"; // Assuming Label component is available

// Sample flight data
const initialFlights = [
  { id: 1, flightName: "Air India", source: "Delhi", destination: "New York", status: "Active" },
  { id: 2, flightName: "SpiceJet", source: "Mumbai", destination: "Dubai", status: "Active" },
  { id: 3, flightName: "Indigo", source: "Bangalore", destination: "Singapore", status: "Inactive" },
];

const FlightManagement: FC = () => {
  const [flights, setFlights] = useState(initialFlights);
  const [newFlight, setNewFlight] = useState({
    flightName: "",
    source: "",
    destination: "",
    status: "Active",
  });
  const [isAdding, setIsAdding] = useState(false);

  // Handle flight deletion
  const handleDelete = (id: number) => {
    setFlights(flights.filter((flight) => flight.id !== id));
  };

  // Handle flight form change (adjusted to handle both input and select)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewFlight({ ...newFlight, [e.target.name]: e.target.value });
  };

  // Handle adding a new flight
  const handleAddFlight = () => {
    const newId = flights.length + 1;
    setFlights([...flights, { ...newFlight, id: newId }]);
    setNewFlight({ flightName: "", source: "", destination: "", status: "Active" });
    setIsAdding(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Flights</h2>

      {/* Flight list */}
      <Table>
        <thead>
          <tr>
            <th>Flight Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.flightName}</td>
              <td>{flight.source}</td>
              <td>{flight.destination}</td>
              <td>{flight.status}</td>
              <td>
                <Button variant="outline" className="mr-2">
                  <Pencil className="h-5 w-5" />
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(flight.id)}>
                  <Trash className="h-5 w-5" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add flight button */}
      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} className="mt-6">
          Add New Flight
        </Button>
      )}

      {/* Add flight form */}
      {isAdding && (
        <div className="mt-6 p-4 border rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Add New Flight</h3>

          <div className="mb-4">
            <Label htmlFor="flightName">Flight Name</Label>
            <Input
              id="flightName"
              name="flightName"
              value={newFlight.flightName}
              onChange={handleChange}
              className="mt-2"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              name="source"
              value={newFlight.source}
              onChange={handleChange}
              className="mt-2"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              name="destination"
              value={newFlight.destination}
              onChange={handleChange}
              className="mt-2"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={newFlight.status}
              onChange={handleChange}
              className="mt-2 p-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <Button onClick={handleAddFlight} className="w-full mt-4">
            Add Flight
          </Button>
          <Button
            onClick={() => setIsAdding(false)}
            variant="outline"
            className="w-full mt-2"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlightManagement;
