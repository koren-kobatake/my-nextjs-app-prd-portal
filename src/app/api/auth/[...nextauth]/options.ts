import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const maxAge = process.env.SESSION_MAX_AGE ? parseInt(process.env.SESSION_MAX_AGE, 10) : undefined;
const sessionUpdateAge = process.env.SESSION_UPDATE_AGE ? parseInt(process.env.SESSION_UPDATE_AGE, 10) : undefined;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        console.log('Authorize method called');
        console.log('Credentials:', credentials);

        // 擬似的な認証処理
        if (credentials?.username === 'user_123' && credentials?.password === 'password') {
          return { id: 'user_123', userId: 'user_123', username: 'user_123', role: 'user', cic: 'cic', env: 'env' };
        }
        // 認証失敗
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.cic = user.cic;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        userId: token.userId,
        cic: token.cic,
        role: token.role,
      };
      session.sessionId = token.jti;
      // 有効期限を追加
      if (maxAge) {
        const expiresIn = maxAge * 1000; // ミリ秒に変換
        session.expires = new Date(Date.now() + expiresIn).toISOString();
      }
      return session;
    },
  },
  session: {
    maxAge: maxAge, // セッションの有効期限
    updateAge: sessionUpdateAge, // セッションの更新間隔
  },
  secret: process.env.NEXTAUTH_SECRET,
};
