// Type definitions for the tenant object
export type Tenant = {
  tenantID: string;
  is_setup: boolean;
  firstname: string | null;
  secondname: string | null;
  email: string | null;
  gender: "male" | "female" | "other" | "prefer not to say" | null;
  dob: Date | null;
  profilePicture: string | null;
  planLevel: string | null;
  howDidYouHearAboutUs: string | null;
  businessName: string | null;
  avgCustomers: number | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string  | null;
  postcode: string  | null;
  county: string | null;
  industry: string | null;
};
