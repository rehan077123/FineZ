import { createClient } from "@supabase/supabase-js";
import { CONFIG } from "./constants";

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!CONFIG.SUPABASE_URL && !!CONFIG.SUPABASE_ANON_KEY;
};

// Client-side Supabase client (lazy-initialized)
let supabaseClient: any = null;
export const getSupabase = () => {
  if (!supabaseClient) {
    const url = CONFIG.SUPABASE_URL || "https://placeholder-url.supabase.co";
    const key = CONFIG.SUPABASE_ANON_KEY || "placeholder-key";
    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
};

// Server-side Supabase client (lazy-initialized)
let supabaseServerClient: any = null;
export const getSupabaseServer = () => {
  if (!supabaseServerClient) {
    const url = CONFIG.SUPABASE_URL || "https://placeholder-url.supabase.co";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key";
    supabaseServerClient = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabaseServerClient;
};

// Re-export constants for backward compatibility if needed
// But we should use the functions to avoid top-level side effects during build
export const supabase = (typeof window !== 'undefined') ? getSupabase() : null;
export const supabaseServer = (typeof window === 'undefined') ? getSupabaseServer() : null;
