import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

const tablesWithoutUpdatedAt = new Set([
  'reviews',
  'certifications',
  'experiences',
  'crm_activities',
  'contact_inquiries',
  'admin_users',
]);

function sanitizeDataForTable(table: string, payload: any): any {
  if (!payload) return payload;
  if (tablesWithoutUpdatedAt.has(table)) {
    if (Array.isArray(payload)) {
      return payload.map(item => {
        if (item && typeof item === 'object') {
          const { updated_at, ...rest } = item;
          return rest;
        }
        return item;
      });
    } else if (typeof payload === 'object') {
      const { updated_at, ...rest } = payload;
      return rest;
    }
  }
  return payload;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const table = searchParams.get('table');

    const allowedTables = [
      'projects',
      'packages',
      'consultation_rates',
      'articles',
      'reviews',
      'reservations',
      'certifications',
      'experiences',
      'crm_leads',
      'crm_activities',
      'contact_inquiries',
    ];

    if (!table || !allowedTables.includes(table)) {
      return NextResponse.json({ error: `Invalid table: ${table}` }, { status: 400 });
    }

    if (table === 'crm_leads') {
      const { data, error } = await (supabaseAdmin.from('crm_leads') as any)
        .select('*, crm_activities(*)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[API /admin/mutate GET crm_leads] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, data });
    }

    const { data, error } = await (supabaseAdmin.from(table) as any)
      .select('*');

    if (error) {
      console.error(`[API /admin/mutate GET ${table}] Error:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('[API /admin/mutate GET] Internal error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { table, action, data, id } = body;

    const allowedTables = [
      'projects',
      'packages',
      'consultation_rates',
      'articles',
      'reviews',
      'reservations',
      'certifications',
      'experiences',
      'crm_leads',
      'crm_activities',
      'contact_inquiries',
    ];

    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: `Invalid table: ${table}` }, { status: 400 });
    }

    const sanitizedData = sanitizeDataForTable(table, data);

    if (action === 'upsert') {
      const { data: result, error } = await (supabaseAdmin.from(table) as any)
        .upsert(sanitizedData)
        .select();

      if (error) {
        console.error(`[API /admin/mutate] Upsert error on ${table}:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, data: result });
    }

    if (action === 'delete') {
      if (!id) {
        return NextResponse.json({ error: 'Missing ID for delete' }, { status: 400 });
      }
      const { error } = await (supabaseAdmin.from(table) as any).delete().eq('id', id);
      if (error) {
        console.error(`[API /admin/mutate] Delete error on ${table}:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    if (action === 'update') {
      if (!id) {
        return NextResponse.json({ error: 'Missing ID for update' }, { status: 400 });
      }
      const { data: result, error } = await (supabaseAdmin.from(table) as any)
        .update(sanitizedData)
        .eq('id', id)
        .select();

      if (error) {
        console.error(`[API /admin/mutate] Update error on ${table}:`, error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({ error: `Invalid action: ${action}` }, { status: 400 });
  } catch (err: any) {
    console.error('[API /admin/mutate] Internal error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
