import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/admin-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [userCount, setUserCount] = useState({ customer: 0, operator: 0 });
  const [flightCount, setFlightCount] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const usersRes = await axios.get("/api/admin/users/count");
      const flightsRes = await axios.get("/api/admin/flights/count");
      const pendingRes = await axios.get("/api/admin/flight/pending-approvals/count");

      setUserCount(usersRes.data);       // Example: { customer: 50, operator: 5 }
      setFlightCount(flightsRes.data.total);   // Example: { total: 40 }
      setPendingApprovals(pendingRes.data.pending); // Example: { pending: 3 }
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const InfoCard = ({
    title,
    value,
    onClick,
  }: {
    title: string;
    value: number;
    onClick: () => void;
  }) => (
    <Card
      className="w-full md:w-1/3 p-4 cursor-pointer transition hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-4">
          <InfoCard title="Customers" value={userCount.customer} onClick={() => navigate("/admin/Users")} />
          <InfoCard title="Flight Operators" value={userCount.operator} onClick={() => navigate("/admin/Users")} />
          <InfoCard title="Total Flights" value={flightCount} onClick={() => navigate("/admin/FlightList")} />
          <InfoCard title="Pending Approvals" value={pendingApprovals} onClick={() => navigate("/admin/Approvals")} />
        </div>

        <div className="mt-10">
          <Button onClick={() => navigate("/admin/CreateOperator")}>Create New Operator</Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
