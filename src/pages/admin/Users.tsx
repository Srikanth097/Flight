import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Role } from "@/pages/types/index";
import AdminSidebar from "@/components/admin-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/admin/users/customer"); // change role if needed
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (uid: number) => {
    try {
      await axios.delete(`/api/admin/delete-user/${uid}`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <Card>
          <CardContent className="overflow-x-auto p-4">
            {loading ? (
              <p>Loading...</p>
            ) : users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.uid}>
                      <TableCell>{user.uid}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(user.uid)}
                        >
                          Delete
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

export default Users;
