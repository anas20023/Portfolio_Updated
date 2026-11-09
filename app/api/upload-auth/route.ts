import { NextResponse } from 'next/server';
import { getUploadAuthParams } from '@/lib/imagekit';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authParams = getUploadAuthParams();
    return NextResponse.json(authParams);
  } catch (error: any) {
    console.error('ImageKit auth error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate ImageKit upload signature.' },
      { status: 500 }
    );
  }
}

