import { createClient } from '@supabase/supabase-js';

// Ensure these environment variables are correctly populated in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Warning: Supabase URL or Anon Key is missing. Check your environment variables.');
}

/**
 * Singleton instance of the Supabase Client.
 * Use this across your repository layer to interact with the Supabase database.
 */
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
