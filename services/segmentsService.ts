import { createClient } from "../utils/supabase/client";
import { Segment } from "@/types/index";
import { Customer } from "@/types/index";
import { PostgrestError } from "@supabase/supabase-js";

interface UpdateSegmentParams {
  segmentId: string;
  updatedData: Partial<Segment>;
}

interface FetchResult<T> {
  data: T | null;
  error: Error | null | PostgrestError;
}

export async function fetchSegments(): Promise<FetchResult<Segment[]>> {
  const supabase = createClient();
  const { data: segments, error } = await supabase.from("segments").select("*");

  if (error) throw error;

  return { data: segments, error: null };
}

export async function fetchSegmentById(
  segmentId: string,
): Promise<FetchResult<Segment>> {
  const supabase = createClient();
  const { data: customer, error } = await supabase
    .from("segments")
    .select("*")
    .eq("segment_id", segmentId)
    .single();

  if (error) throw error;

  return { data: customer, error: null };
}

export async function fetchWifiUserIdsBySegmentId(
  segmentId: string,
): Promise<FetchResult<string[]>> {
  console.log("Fetching wifi user IDs for segment:", segmentId);
  const supabase = createClient();
  const { data, error } = await supabase
    .from("segmentMembers")
    .select("wifi_user_id")
    .eq("segment_id", segmentId);

  if (error) throw error;

  return { data: data?.map((member) => member.wifi_user_id), error: null };
}

export async function fetchWifiUsersBySegmentId(
  segmentId: string,
): Promise<FetchResult<Customer[]>> {
  console.log("Fetching wifi users for segment:", segmentId);
  const supabase = createClient();
  const { data: idsData, error: idsError } = await supabase
    .from("segmentMembers")
    .select("wifi_user_id")
    .eq("segment_id", segmentId);

  if (idsError) throw idsError;

  // Early return if no user IDs were found
  if (!idsData || idsData.length === 0) {
    return { data: null, error: null };
  }

  const users: Customer[] = [];
  for (const member of idsData) {
    const { data: userData, error: userError } = await supabase
      .from("wifiUsers")
      .select("*")
      .eq("wifi_user_id", member.wifi_user_id)
      .single(); // Assuming each wifi_user_id is unique

    if (userError) {
      console.error("Error fetching customer data:", userError);
      throw userError;
    }

    if (userData) users.push(userData);
  }

  return { data: users, error: null };
}

export async function fetchSegmentsByWifiUserID(
  wifiUserId: string,
): Promise<FetchResult<Segment[]>> {
  console.log("Fetching segments for wifi user ID:", wifiUserId);
  const supabase = createClient();
  const { data: segments, error } = await supabase
    .from("segmentMembers")
    .select("segment_id")
    .eq("wifi_user_id", wifiUserId);

  if (error) throw error;

  // Early return if no segments were found
  if (!segments || segments.length === 0) {
    return { data: null, error: null };
  }

  const segmentIds = segments.map((segment) => segment.segment_id);

  const segmentData: Segment[] = [];
  for (const segmentId of segmentIds) {
    const { data: segment, error: segmentError } = await supabase
      .from("segments")
      .select("*")
      .eq("segment_id", segmentId)
      .single();

    if (segmentError) {
      console.error("Error fetching segment data:", segmentError);
      throw segmentError;
    }

    if (segment) segmentData.push(segment);
  }

  return { data: segmentData, error: null };
}

export async function updateSegment({
  segmentId,
  updatedData,
}: UpdateSegmentParams): Promise<FetchResult<Segment>> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("segments")
    .update(updatedData)
    .eq("segment_id", segmentId)
    .single();

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}
