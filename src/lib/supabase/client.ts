import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eevtuamdgthbcgtkepbh.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldnR1YW1kZ3RoYmNndGtlcGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxODcyNjksImV4cCI6MjEwOTc2MzI2OX0.b4TMPePOWVHUOt7JZ3eb5yshxLB1r9ykMS6ud8chPRg';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
