export type Segment = {
    tenant_id: string;
    segment_id: string;
    name: string;
    description: string | null;
    type: 'manual' | 'auto';
    rule: JSON;
    created_at: Date;
    updated_at: Date;
};
  