import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const ALLOWED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg']);
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
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
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'projects', projectId);
    await fs.mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(uploadDir, fileName), buffer);

    const url = `/uploads/projects/${projectId}/${fileName}`;
    return NextResponse.json({ success: true, url });
  } catch (err: any) {
    console.error('[API /admin/upload] Error:', err);
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}
