import { GalleryVerticalEnd } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "",
    flightname: "",
    wallet_balance: "",
    dob: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "role") {
      setRole(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (role === "Flight Operator" && !formData.flightname) {
      setError("Flight name is required for Flight Operators.");
      return;
    }

    // Replace this with actual API call
    console.log("Submitted Data:", formData);

    navigate("/login", { state: { signupSuccess: true } });
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center text-xl gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-transparent">
              <GalleryVerticalEnd className="size-6" />
            </div>
            SkySecure Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-xs gap-4"
          >
            {error && (
              <Alert className="bg-red-50 text-red-800 border-red-200">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {["name", "email", "phone", "address", "password", "wallet_balance", "dob"].map((field) => (
              <div key={field}>
                <Label>{field.replace("_", " ").toUpperCase()}</Label>
                <Input
                  type={field === "password" ? "password" : field === "dob" ? "date" : "text"}
                  value={(formData as any)[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  required
                />
              </div>
            ))}
            <div>
              <Label>Role</Label>
              <Select onValueChange={(value: string) => handleChange("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Customer">Customer</SelectItem>
                  <SelectItem value="Flight Operator">Flight Operator</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === "Flight Operator" && (
              <div>
                <Label>Flight Name</Label>
                <Select onValueChange={(value: string) => handleChange("flightname", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select flight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Indigo">Indigo</SelectItem>
                    <SelectItem value="AirIndia">Air India</SelectItem>
                    <SelectItem value="SpiceJet">SpiceJet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="./flight.jpg"
          alt="Image"
          className="absolute top-24 h-4/5 w-4/5 object-center"
        />
      </div>
    </div>
  );
}
