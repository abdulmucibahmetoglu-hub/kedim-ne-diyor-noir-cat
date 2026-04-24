import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Analysis } from "@/types";

export async function saveAnalysis(input: Omit<Analysis, "id" | "created_at">) {
  if (!isSupabaseConfigured) {
    return {
      data: {
        id: Math.random().toString(36).slice(2),
        ...input,
        created_at: new Date().toISOString()
      } as Analysis,
      error: null,
      demo: true
    };
  }

  const { data, error } = await supabase
    .from("meow_analyses")
    .insert(input)
    .select()
    .single();

  return { data: data as Analysis | null, error, demo: false };
}

export async function getAnalyses(catId?: string) {
  if (!isSupabaseConfigured) {
    return {
      data: [] as Analysis[],
      error: null,
      demo: true
    };
  }

  let query = supabase
    .from("meow_analyses")
    .select("*")
    .order("created_at", { ascending: false });

  if (catId) {
    query = query.eq("cat_id", catId);
  }

  const { data, error } = await query;
  return { data: (data || []) as Analysis[], error, demo: false };
}

export async function updateAnalysisFeedback(id: string, feedback: "correct" | "wrong") {
  if (!isSupabaseConfigured) {
    return { error: null, demo: true };
  }

  const { error } = await supabase
    .from("meow_analyses")
    .update({ user_feedback: feedback })
    .eq("id", id);

  return { error, demo: false };
}
