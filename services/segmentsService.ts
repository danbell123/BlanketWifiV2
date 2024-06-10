import { createClient } from '../utils/supabase/client';
import { Segment } from '@/types/index';

interface FetchResult<T> {
    data: T | null;
    error: Error | null;
}

export async function fetchSegments(): Promise<FetchResult<Segment[]>> {
    const supabase = createClient();
    const { data: segments, error } = await supabase
        .from('segments')
        .select('*');

    if (error) throw error;

    return { data: segments, error: null };
}

export async function fetchSegmentById(segmentId: string): Promise<FetchResult<Segment>> {
    const supabase = createClient();
    const { data: customer, error } = await supabase
        .from('segments')
        .select('*')
        .eq('segment_id', segmentId)
        .single();

    if (error) throw error;

    return { data: customer, error: null };
}

export async function fetchWifiUserIdsBySegmentId(segmentId: string): Promise<FetchResult<string[]>> {
    console.log('Fetching wifi user IDs for segment:', segmentId);
    const supabase = createClient();
    const { data, error } = await supabase
        .from('segmentMembers')
        .select('wifi_user_id')
        .eq('segment_id', segmentId);

    if (error) throw error;

    return { data: data?.map(member => member.wifi_user_id), error: null };
}
