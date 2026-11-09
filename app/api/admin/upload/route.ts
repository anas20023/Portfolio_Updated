import { NextResponse } from 'next/server';
import { uploadToImageKit } from '@/lib/imagekit';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const uploaded = await uploadToImageKit(file, file.name || 'upload.jpg', '/portfolio/projects');

    return NextResponse.json({ success: true, url: uploaded.url });
  } catch (error: any) {
    console.error('ImageKit upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Image upload failed. Ensure ImageKit credentials are set.' },
      { status: 500 }
    );
  }
}
