import { NextRequest } from 'next/server';
import { supabaseAdmin } from './admin';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'islamsamydev@gmail.com';

export interface AdminVerificationResult {
  authorized: boolean;
  userId?: string;
  email?: string;
  error?: string;
}

/**
 * Verifies a Supabase Auth Bearer JWT on incoming admin API requests
 * and confirms the user is a registered administrator.
 */
export async function verifyAdminRequest(req: NextRequest): Promise<AdminVerificationResult> {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authorized: false, error: 'Missing admin authorization token.' };
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return { authorized: false, error: 'Empty authorization token.' };
  }

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !data?.user) {
      return { authorized: false, error: 'Invalid or expired admin session.' };
    }

    const user = data.user;
    if (user.email === ADMIN_EMAIL) {
      return { authorized: true, userId: user.id, email: user.email };
    }

    const { data: adminRecord } = await (supabaseAdmin.from('admin_users') as any)
      .select('id, role')
      .eq('id', user.id)
      .maybeSingle();

    if (adminRecord) {
      return { authorized: true, userId: user.id, email: user.email || undefined };
    }

    return { authorized: false, error: 'Account lacks administrator privileges.' };
  } catch (err: any) {
    return { authorized: false, error: err?.message || 'Admin verification failed.' };
  }
}
