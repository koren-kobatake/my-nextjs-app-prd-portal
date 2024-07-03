import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';
import crypto from 'crypto';

const secret = process.env.SECRET_KEY || 'your-secret-key';
const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(secret).digest('base64').slice(0, 32);

function encrypt(text: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;

  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ message: 'Invalid userId' }, { status: 400 });
  }

  if (userId === 'validUser') {
    const encryptedUserId = encrypt(userId);
    const cookie = serialize('user', encryptedUserId, { path: '/', httpOnly: true, secure: true });

    const baseUrl = `http://localhost:3000`;
    const redirectUrl = `${baseUrl}/ledger`;

    const response = NextResponse.redirect(redirectUrl);
    response.headers.set('Set-Cookie', cookie);

    return response;
  } else {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

export const config = {
  runtime: 'edge',
};
