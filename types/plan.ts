export type Plan = {
    planID: number;
    name: string;
    price: number;
    limits: Usage;
}; 

export type Usage = {
    sms: number;
    email: number;
    autoPulse: number;
};

export type TenantMonthlyUsage = {
    tenantID: string;
    usage: Usage;
    resetDate: Date; // When tenant signs up new tenant_usage is created and resetDate is set to one month from then.
};