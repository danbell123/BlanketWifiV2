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
