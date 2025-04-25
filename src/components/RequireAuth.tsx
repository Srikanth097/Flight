import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface RequireAuthProps {
    allowedRoles?: string[];
}

const RequireAuth = ({ allowedRoles} : RequireAuthProps) => {
    const authcontext = useAuth();
    const location = useLocation();

    return(
        (authcontext?.auth)
            ? allowedRoles?.includes(authcontext.auth.role)
                ? <Outlet />
                : <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;