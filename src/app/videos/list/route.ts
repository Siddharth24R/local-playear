import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const VIDEO_DIRECTORY = process.env.VIDEO_DIRECTORY || '/tmp/videos';

export async function GET() {
  try {
    const files = await fs.readdir(VIDEO_DIRECTORY);
    const videoFiles = files.filter(file => /\.(mp4|avi|mov)$/i.test(file));
    const videos = videoFiles.map(file => `/videos/${file}`);
    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Error reading video directory:", error);
    return NextResponse.json({ error: 'Failed to read video directory' }, { status: 500 });
  }
}
