// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import crypto from 'crypto';

const secret = 'your-secret-key'; // 環境変数などで管理することを推奨
const algorithm = 'aes-256-cbc';
const key = crypto.createHash('sha256').update(secret).digest('base64').slice(0, 32);

function decrypt(text: string) {
    const [iv, encryptedText] = text.split(':');
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get('user');
  
if (token) {
    try {
        const userId = decrypt(token as unknown as string);
        // 必要に応じてuserIdのバリデーションを行う
        if (req.nextUrl.pathname === '/ledger/download') {
            return NextResponse.next();
        }
    } catch (err) {
        console.error('Failed to decrypt cookie:', err);
        return NextResponse.redirect(new URL('/login', req.url));
    }
} else if (req.nextUrl.pathname === '/ledger/download') {
    return NextResponse.redirect(new URL('/login', req.url));
}
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/ledger/download'],
};
