// src/context/FlightContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

// Flight model
export interface Flight {
  fid: string;
  fnumber: string;
  fname: string;
  oid: string;
  source: string;
  destination: string;
  departure_datetime: string;
  arrival_datetime: string;
  total_seats: number;
  available_seats: number;
  stops: number;
  status: "Scheduled" | "Delayed" | "Cancelled" | "Completed";
  duration: string;
  price: number;
}

// Filters model
interface FlightFilters {
  source: string;
  destination: string;
  date: string;
}

// Context value type
interface FlightContextType {
  filters: FlightFilters;
  setFilters: (filters: FlightFilters) => void;
  flights: Flight[];
  setFlights: (flights: Flight[]) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
}

// Default context
const FlightContext = createContext<FlightContextType | undefined>(undefined);

// Provider
export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FlightFilters>({
    source: "",
    destination: "",
    date: "",
  });

  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  return (
    <FlightContext.Provider
      value={{ filters, setFilters, flights, setFlights, selectedFlight, setSelectedFlight }}
    >
      {children}
    </FlightContext.Provider>
  );
};

// Hook to use flight context
export const useFlight = (): FlightContextType => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error("useFlight must be used within a FlightProvider");
  }
  return context;
};
