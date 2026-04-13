import { createClient } from '@supabase/supabase-js';

// Lazy-initialized clients
let supabaseClient: any = null;
let supabaseServerClient: any = null;

export const supabase = (typeof window !== 'undefined') 
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co', 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    ) 
  : null;

// Server-side Supabase client (lazy function)
export const getServerSupabase = () => {
  if (!supabaseServerClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';
    
    supabaseServerClient = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  return supabaseServerClient;
};
