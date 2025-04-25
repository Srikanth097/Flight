import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import OperatorSidebar from "./operator-sidebar"; // Import the sidebar component

const Reports: FC = () => {
  const [reportsData, setReportsData] = useState<any>({
    occupancyRate: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const response = await fetch("/api/reports");
        const data = await response.json();
        setReportsData(data);
      } catch (error) {
        console.error("Error fetching reports data:", error);
      }
    };

    fetchReportsData();
  }, []);

  return (
    <div className="flex">
      <OperatorSidebar /> {/* Sidebar */}
      <div className="p-6 w-full">
        <h2 className="text-2xl font-semibold mb-6">Reports</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <div>
              <h3 className="font-semibold">Occupancy Rate</h3>
              <p>{reportsData.occupancyRate}%</p>
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <div>
              <h3 className="font-semibold">Total Revenue</h3>
              <p>${reportsData.totalRevenue}</p>
            </div>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
