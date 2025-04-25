import { FC } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Airplay, DollarSign } from "lucide-react"; // Icons for visual appeal
import OperatorSidebar from "./operator-sidebar"; // Import your sidebar component

const OperatorDashboard: FC = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <OperatorSidebar />

      {/* Main Content (Dashboard) */}
      <div className="p-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Flights Overview */}
          <Card className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <Airplay className="h-8 w-8 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Flights</h3>
                <p className="text-xl">25 Active Flights</p>
              </div>
            </div>
            <ArrowUpRight className="h-6 w-6 mt-4" />
          </Card>

          {/* Card 2: Booking Stats */}
          <Card className="bg-green-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <ArrowUpRight className="h-8 w-8 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Bookings</h3>
                <p className="text-xl">150 Booked</p>
              </div>
            </div>
            <ArrowUpRight className="h-6 w-6 mt-4" />
          </Card>

          {/* Card 3: Wallet Overview */}
          <Card className="bg-yellow-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Wallet Balance</h3>
                <p className="text-xl">$3,500</p>
              </div>
            </div>
            <ArrowUpRight className="h-6 w-6 mt-4" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
