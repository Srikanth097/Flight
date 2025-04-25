import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router";

import { useState } from "react"
import useAuth from "@/hooks/useAuth";
import { AxiosInstance } from "@/api/axios";
import { AxiosError } from "axios";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState("");


  const auth = useAuth();
  const axios = AxiosInstance;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const response = await axios.post('/api/auth/login',
        {
          username: uname,
          password: password
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const user = {
        id: response.data.id,
        roleId: response.data.roleId,
        role: response.data.role,
        accessToken: response.data.token
      }

      auth?.setAuth(user);
      setUname("");
      setPassword("");

      if(response.data.role === "admin"){
        navigate("/admin");
      } else if (response.data.role === "vendor"){
        navigate("/vendor");
      } else if (response.data.role === "customer"){
        navigate("/");
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response && err.response.data) {
          setError(typeof err.response.data === "string" ? err.response.data : JSON.stringify(err.response.data));
      } else {
          setError("An unexpected error occurred");
      }
      setShowAlert(true);
      console.error("Login failed:", error);
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleLogin}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      {showAlert && (
        <Alert className="bg-red-50 text-red-800 border-red-200">
            <AlertTitle>Login Error</AlertTitle>
            <AlertDescription>Invalid credentials</AlertDescription>
        </Alert>
        )}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="uname">Username</Label>
          <Input id="uname" type="text" required onChange={(e) => {
            setUname(e.target.value)
            if(showAlert){
              setShowAlert(false);
            }
          }}/>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgotpassword"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
            Forgot your password?
            </Link>
          </div>
          <Input id="password" type="password" required onChange={(e) => {
            setPassword(e.target.value)
            if(showAlert){
              setShowAlert(false);
            }
          }}/>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline underline-offset-4" to="/signup">Sign up</Link>
      </div>
    </form>
  )
}