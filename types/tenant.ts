import { Plan, TenantMonthlyUsage } from './plan';

export type Tenant = {
    tenantID: string;
    firstname: string;
    secondname: string;
    email: string;
    profilePicture: string;
    dob: Date;
    gender: 'male' | 'female' | 'other' | 'prefer not to say';
    plan: Plan;
    usage: TenantMonthlyUsage;
  };