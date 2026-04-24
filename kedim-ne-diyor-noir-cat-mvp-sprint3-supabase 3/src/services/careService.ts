import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { CareTask } from "@/types";

export async function createCareTask(input: Omit<CareTask, "id" | "created_at">) {
  if (!isSupabaseConfigured) {
    return {
      data: {
        id: Math.random().toString(36).slice(2),
        ...input,
        created_at: new Date().toISOString()
      } as CareTask,
      error: null,
      demo: true
    };
  }

  const { data, error } = await supabase
    .from("care_tasks")
    .insert(input)
    .select()
    .single();

  return { data: data as CareTask | null, error, demo: false };
}

export async function getCareTasks(catId?: string) {
  if (!isSupabaseConfigured) {
    return {
      data: [] as CareTask[],
      error: null,
      demo: true
    };
  }

  let query = supabase
    .from("care_tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (catId) query = query.eq("cat_id", catId);

  const { data, error } = await query;
  return { data: (data || []) as CareTask[], error, demo: false };
}
