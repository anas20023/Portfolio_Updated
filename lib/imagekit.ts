import crypto from 'crypto';

export function getUploadAuthParams() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || '';
  const publicKey =
    process.env.IMAGEKIT_PUBLIC_KEY ||
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ||
    '';

  if (!privateKey || !publicKey) {
    throw new Error('IMAGEKIT_PRIVATE_KEY and IMAGEKIT_PUBLIC_KEY must be configured.');
  }

  const token = crypto.randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 60 * 30; // 30 minutes
  const signature = crypto
    .createHmac('sha1', privateKey)
    .update(token + String(expire))
    .digest('hex');

  return { token, expire, signature, publicKey };
}

export async function uploadToImageKit(
  file: File | Blob | string,
  fileName: string,
  folder = '/portfolio'
) {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('IMAGEKIT_PRIVATE_KEY is missing in environment variables.');
  }

  const formData = new FormData();
  if (typeof file === 'string') {
    formData.append('file', file);
  } else {
    formData.append('file', file, fileName);
  }
  formData.append('fileName', fileName);
  formData.append('folder', folder);

  const authHeader = `Basic ${Buffer.from(`${privateKey}:`).toString('base64')}`;

  const response = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
    method: 'POST',
    headers: {
      Authorization: authHeader,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'ImageKit upload failed');
  }

  return {
    url: data.url as string,
    fileId: data.fileId as string,
    name: data.name as string,
  };
}
