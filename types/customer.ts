import { Segment } from "./segment";

export type Customer = {
  wifi_user_id: string; // Changed to match the database column name
  firstname: string;
  lastname: string;
  email: string;
  tel: string;
  dob: Date; // Assuming Date parsing is handled appropriately
  gender: string;
  profilePictureURL: string; // Changed to match the database column name
};

export type CustomerSegments = {
  wifi_user_id: string;
  segments: Segment[];
};

export type CustomerVisits = {
  wifi_user_id: string;
  total_visits: number;
  last_30_days_visits: number;
  last_7_days_visits: number;
  last_visit: Date;
  first_visit: Date;
};

export type CustomerFullData = {
  customer: Customer;
  segments: Segment[];
  visits: CustomerVisits | null;
};
