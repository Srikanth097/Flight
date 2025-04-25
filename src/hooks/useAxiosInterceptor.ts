import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosInstance } from "@/api/axios";
import useAuth from "./useAuth";

export const useAxiosInterceptor = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext) return;

    const { auth } = authContext;

    const requestInterceptor = AxiosInstance.interceptors.request.use(
      (config) => {
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = AxiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.warn("Unauthorized - redirecting to sign-in.");

          localStorage.removeItem("accessToken");
          sessionStorage.removeItem("accessToken");

          if (authContext.setAuth) {
            authContext.setAuth(null);
          }

          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      AxiosInstance.interceptors.request.eject(requestInterceptor);
      AxiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [authContext?.auth?.accessToken, authContext?.setAuth, navigate]);

  return AxiosInstance;
};
