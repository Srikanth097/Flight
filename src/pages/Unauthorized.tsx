import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  const role = authContext?.auth?.role;

  const redirectToRolePage = () => {
    if (role === 'Admin') {
      navigate('/admin');
    } else if (role === 'Customer') {
      navigate('/');
    } else if (role === 'Flight Operator') {
      navigate('/operator/dashboard');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      redirectToRolePage();
    }, 5000);
    return () => clearTimeout(timer);
  }, [role]);

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <Card className="w-[380px] text-center shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4">
            <AlertCircle className="text-red-500 w-12 h-12" />
            <h2 className="text-xl font-semibold text-blue-900">Access Denied</h2>
            <p className="text-sm text-gray-600">
              You don’t have permission to access this flight route.
            </p>
            <Button variant="outline" onClick={redirectToRolePage}>
              Return to Your Dashboard
            </Button>
            <p className="text-xs text-muted-foreground">
              Redirecting automatically in 5 seconds...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
