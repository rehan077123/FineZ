import { createClient } from "@supabase/supabase-js";
import { CONFIG } from "./constants";

// Client-side Supabase client
export const supabase = createClient(
  CONFIG.SUPABASE_URL!,
  CONFIG.SUPABASE_ANON_KEY!
);

// Server-side Supabase client (use with service role key)
export const getServerSupabase = () => {
  return createClient(
    CONFIG.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

// Alternative server supabase export
export const supabaseServer = getServerSupabase();
