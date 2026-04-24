import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { CatProfile } from "@/types";

export async function createCatProfile(input: Omit<CatProfile, "id" | "created_at">) {
  if (!isSupabaseConfigured) {
    return {
      data: {
        id: "demo-cat",
        ...input,
        created_at: new Date().toISOString()
      } as CatProfile,
      error: null,
      demo: true
    };
  }

  const { data, error } = await supabase
    .from("cats")
    .insert(input)
    .select()
    .single();

  return { data: data as CatProfile | null, error, demo: false };
}

export async function getCats() {
  if (!isSupabaseConfigured) {
    return {
      data: [
        {
          id: "demo-cat",
          name: "Mia",
          breed: "British Shorthair",
          age: 2,
          weight: 4.8,
          food_type: "Kuru mama",
          notes: "Demo kedi profili"
        }
      ] as CatProfile[],
      error: null,
      demo: true
    };
  }

  const { data, error } = await supabase
    .from("cats")
    .select("*")
    .order("created_at", { ascending: false });

  return { data: (data || []) as CatProfile[], error, demo: false };
}
