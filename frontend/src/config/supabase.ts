import { createClient } from "@supabase/supabase-js";
import { CONFIG } from "./constants";

const supabaseUrl = CONFIG.SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = CONFIG.SUPABASE_ANON_KEY || "placeholder-key";

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (use with service role key)
export const getServerSupabase = () => {
  const url = CONFIG.SUPABASE_URL || "https://placeholder-url.supabase.co";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key";
  
  return createClient(
    url,
    key,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

// Alternative server supabase export
// Only initialize if we're not in a build environment or if keys are present
export const supabaseServer = (typeof window === 'undefined' && !CONFIG.SUPABASE_URL) 
  ? null as any 
  : getServerSupabase();
