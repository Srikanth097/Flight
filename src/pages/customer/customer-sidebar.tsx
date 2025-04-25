// src/pages/customer/components/customer-sidebar.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Search, Ticket, LayoutDashboard } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: <LayoutDashboard />, path: "/customer/dashboard" },
  { name: "Search Flights", icon: <Search />, path: "/customer/search-flight" },
  { name: "My Bookings", icon: <Ticket />, path: "/customer/my-bookings" },
];

const CustomerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-blue-100 shadow-md flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold text-center py-6 text-blue-900">
          SkeSecure
        </div>
        <ul className="px-4">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center gap-3 p-3 my-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "text-blue-800 hover:bg-blue-200"
              }`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-4 py-4">
        <button
          onClick={() => {
            // ✅ Clear JWT and user data
            localStorage.removeItem("token");
            localStorage.removeItem("user"); // optional, if you're storing user info

            // ✅ Optionally clear cookies or auth headers if you're using axios
            // axios.defaults.headers.common['Authorization'] = '';

            // ✅ Redirect to login
            navigate("/login", { replace: true });
          }}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default CustomerSidebar;
