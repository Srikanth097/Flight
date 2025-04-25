import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Plane,
  CheckCircle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Flights", icon: Plane, path: "/admin/flights" },
  { name: "Approvals", icon: CheckCircle, path: "/admin/approvals" },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Add logout logic here (clear tokens, etc.)
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-muted p-4 border-r flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-6 px-2">Admin Panel</h2>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.name} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    isActive(item.path) && "bg-primary text-white hover:bg-primary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Button>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <Button variant="destructive" className="w-full mt-6" onClick={handleLogout}>
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default AdminSidebar;
