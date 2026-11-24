import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { verifyAdminRequest } from '@/lib/supabase/server-auth';

const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const BUCKET_NAME = 'portfolio-uploads';

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminRequest(req);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const rawFolder = String(formData.get('folder') || 'projects').toLowerCase();
    const folder = rawFolder === 'certifications' ? 'certifications' : 'projects';
    const projectId = String(formData.get('projectId') || 'general')
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .slice(0, 60);

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No image file provided.' }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'Image exceeds 10MB limit.' }, { status: 400 });
    }

    const origExt = path.extname(file.name).toLowerCase();
    const ext = ALLOWED_EXTENSIONS.has(origExt) ? origExt : '.png';
    const baseName = path
      .basename(file.name, origExt)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .slice(0, 40) || 'image';

    const fileName = `${Date.now()}-${baseName}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const contentType = file.type || MIME_TYPES[ext] || 'image/png';

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceKey) {
      const supabase = createClient(supabaseUrl, serviceKey);

      // Ensure the public bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets?.some((b) => b.name === BUCKET_NAME)) {
        await supabase.storage.createBucket(BUCKET_NAME, { public: true });
      }

      const storagePath = `${folder}/${projectId}/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(storagePath, buffer, {
          contentType,
          upsert: true,
        });

      if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
      }

      const { data: publicData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(storagePath);

      return NextResponse.json({ success: true, url: publicData.publicUrl });
    }

    // Fallback for local dev without Supabase service key
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder, projectId);
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    const url = `/uploads/${folder}/${projectId}/${fileName}`;
    return NextResponse.json({ success: true, url });
  } catch (err: any) {
    console.error('[API /admin/upload] Error:', err);
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}
