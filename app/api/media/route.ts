import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import path from 'path';

export interface MediaFile {
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];
const VIDEO_EXTS = ['.mp4', '.webm', '.ogg', '.mov'];

function getMediaType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  if (IMAGE_EXTS.includes(ext)) return 'image';
  if (VIDEO_EXTS.includes(ext)) return 'video';
  return 'file';
}

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    const files = await readdir(uploadsDir);

    const media: MediaFile[] = await Promise.all(
      files.map(async (name) => {
        const filepath = path.join(uploadsDir, name);
        const stats = await stat(filepath);
        return {
          name,
          url: `/uploads/${name}`,
          size: stats.size,
          type: getMediaType(name),
          uploadedAt: stats.birthtime.toISOString(),
        };
      })
    );

    // newest first
    media.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json({ media });
  } catch {
    return NextResponse.json({ media: [] });
  }
}