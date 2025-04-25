// types/index.ts

import { Key } from "readline";

export type Role = "Admin" | "Customer" | "Flight Operator";

export type Stops = 0 | 1; // 0 = Non-stop, 1 = One-stop

export type FlightStatus = "Scheduled" | "Delayed" | "Cancelled" | "Completed";

export type BookingStatus = "Confirmed" | "Cancelled" | "Refunded";

export type RefundStatus = "Pending" | "Approved" | "Rejected";

export interface User {
  id: Key | null | undefined;
  uid: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  wallet_balance: number;
  dob: string; // Use string or Date based on how it's used in UI/API
}

export interface Passenger {
  pid: number;
  uid: number;
  name: string;
  phone: string;
  email: string;
  booking_count: number;
}

export interface Flight {
  fid: number;
  fnumber: string;
  oid: number; // Flight Operator ID
  fname: string;
  source: string;
  destination: string;
  departure_datetime: string; // or Date
  arrival_datetime: string; // or Date
  total_seats: number;
  available_seats: number;
  stops: Stops;
  status: FlightStatus;
  duration: string;
  price: number;
}

export interface Booking {
  bid: number;
  pid: number;
  fid: number;
  booking_datetime: string; // or Date
  booking_status: BookingStatus;
  amount: number;
}

export interface RefundRequest {
  rid: number;
  bid: number;
  request_datetime: string; // or Date
  refund_status: RefundStatus;
}
