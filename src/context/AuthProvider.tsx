import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useEffect
  } from "react";
  
  export interface Auth {
    id: string;
    roleId: string;
    role: string;
    accessToken: string;
  }
  
  interface AuthContextType {
    auth: Auth | null;
    setAuth: Dispatch<SetStateAction<Auth | null>>;
  }
  
  const AuthContext = createContext<AuthContextType | null>(null);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuthState] = useState<Auth | null>(() => {
      const stored = localStorage.getItem("auth");
      return stored ? JSON.parse(stored) : null;
    });
  
    useEffect(() => {
      if (auth) {
        localStorage.setItem("auth", JSON.stringify(auth));
      } else {
        localStorage.removeItem("auth");
      }
    }, [auth]);
  
    const setAuth: Dispatch<SetStateAction<Auth | null>> = (value) => {
      setAuthState((prev) => {
        const newValue = typeof value === "function" ? value(prev) : value;
        if (newValue) {
          localStorage.setItem("auth", JSON.stringify(newValue));
        } else {
          localStorage.removeItem("auth");
        }
        return newValue;
      });
    };
  
    return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthContext;