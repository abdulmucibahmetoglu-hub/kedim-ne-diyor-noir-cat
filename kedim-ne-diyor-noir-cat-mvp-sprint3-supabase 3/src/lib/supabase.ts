import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

function isValidHttpsUrl(value?: string) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function looksLikeSecretKey(value?: string) {
  return Boolean(value?.toLowerCase().includes("service_role") || value?.toLowerCase().includes("secret"));
}

const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);
const hasValidSupabaseUrl = isValidHttpsUrl(supabaseUrl);
const hasPublicKey = Boolean(supabaseAnonKey && !looksLikeSecretKey(supabaseAnonKey));

export const isSupabaseConfigured = hasSupabaseEnv && hasValidSupabaseUrl && hasPublicKey;
const clientUrl = isSupabaseConfigured && supabaseUrl ? supabaseUrl : "https://placeholder.supabase.co";
const clientAnonKey = isSupabaseConfigured && supabaseAnonKey ? supabaseAnonKey : "placeholder";

export const supabase = createClient(
  clientUrl,
  clientAnonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false
    }
  }
);

export async function testSupabaseConnection() {
  if (!hasSupabaseEnv) {
    return {
      ok: false,
      message: ".env dosyası eksik veya Supabase bilgileri boş. Demo mod aktif."
    };
  }

  if (!hasValidSupabaseUrl) {
    return {
      ok: false,
      message: "EXPO_PUBLIC_SUPABASE_URL https:// ile başlayan geçerli bir Supabase URL olmalı."
    };
  }

  if (!hasPublicKey) {
    return {
      ok: false,
      message: "Sadece EXPO_PUBLIC_SUPABASE_ANON_KEY kullanılmalı. Secret veya service_role key mobil uygulamaya koyulmaz."
    };
  }

  const { error } = await supabase.from("cats").select("id").limit(1);

  if (error) {
    return {
      ok: false,
      message: error.message
    };
  }

  return {
    ok: true,
    message: "Supabase bağlantısı başarılı."
  };
}
