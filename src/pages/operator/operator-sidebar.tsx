import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Airplay, List, FileText, Box } from "lucide-react"; // FileText instead of Report

const OperatorSidebar: FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="flex flex-col items-start">
        <h2 className="text-2xl font-bold mb-8">Operator Dashboard</h2>
        
        {/* Dashboard Navigation */}
        <Link to="/operator/dashboard" className="w-full">
          <Button
            variant="default" // Changed from 'solid' to 'default'
            className="w-full text-lg text-white hover:bg-gray-700"
          >
            <ChevronRight className="mr-2" /> Dashboard
          </Button>
        </Link>

        {/* Flights Navigation */}
        <Link to="/operator/dashboard" className="w-full">
          <Button
            variant="default" // Changed from 'solid' to 'default'
            className="w-full text-lg text-white hover:bg-gray-700 mt-4"
          >
            <Airplay className="mr-2" /> Flights
          </Button>
        </Link>

        {/* Bookings Navigation */}
        <Link to="/operator/bookings" className="w-full">
          <Button
            variant="default" // Changed from 'solid' to 'default'
            className="w-full text-lg text-white hover:bg-gray-700 mt-4"
          >
            <List className="mr-2" /> Bookings
          </Button>
        </Link>

        {/* Reports Navigation */}
        <Link to="/operator/reports" className="w-full">
          <Button
            variant="default" // Changed from 'solid' to 'default'
            className="w-full text-lg text-white hover:bg-gray-700 mt-4"
          >
            <FileText className="mr-2" /> Reports
          </Button>
        </Link>

        {/* Add Flight */}
        <Link to="/operator/add-flight" className="w-full">
          <Button
            variant="default" // Changed from 'solid' to 'default'
            className="mt-8 w-full bg-blue-500 hover:bg-blue-600"
          >
            <Box className="mr-2" /> Add Flight
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OperatorSidebar;
