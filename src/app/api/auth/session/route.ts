import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/options';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(222)
  console.log(session)

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Not authenticated' }), {
      status: 401,
    });
  }

  return new NextResponse(JSON.stringify(session), {
    status: 200,
  });
}
