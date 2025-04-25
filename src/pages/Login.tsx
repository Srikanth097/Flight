import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (location.state?.signupSuccess) {
      setShowAlert(true);

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
          <div className="flex flex-col w-full max-w-xs gap-6">
            {showAlert && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <AlertTitle>Signup Successful</AlertTitle>
                <AlertDescription>Please log in to continue.</AlertDescription>
              </Alert>
            )}
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="./flight.jpg"
          alt="Image"
          className="absolute top-18 h-4/5 w-4/5 object-center border-r-2"
        />
      </div>
    </div>
  )
}