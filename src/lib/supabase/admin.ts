import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import WebSocket from 'ws';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://eevtuamdgthbcgtkepbh.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVldnR1YW1kZ3RoYmNndGtlcGJoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NDE4NzI2OSwiZXhwIjoyMTA5NzYzMjY5fQ.FoVzAlTNi9tTI8yEUY0qy-Hz3tfqG0i3_KGyBD7wJqI';

export const supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    transport: WebSocket as any,
  },
});
