import type { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials'

const maxAge = process.env.SESSION_MAX_AGE ? parseInt(process.env.SESSION_MAX_AGE, 10) : undefined;
const sessionUpdateAge = process.env.SESSION_UPDATE_AGE ? parseInt(process.env.SESSION_UPDATE_AGE, 10) : undefined;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // 擬似的な認証処理
        if (credentials?.username === 'test' && credentials?.password === 'password') {
          return { id: 'user_123', userId: 'user_123', name: 'Test User', email: 'test@example.com', role: 'user' };
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
        token.env = user.env;
        token.jti = user.jti || token.jti;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        ...session.user,
        userId: token.userId,
        cic: token.cic,
        role: token.role,
        env: token.env,
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
