import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const posts = await prisma.post.findMany({
      where: { userId: user!.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ posts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const { content, platforms, scheduledAt, mediaUrls, aiGenerated } = await req.json();

    const post = await prisma.post.create({
      data: {
        userId: user!.id,
        content,
        platforms,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        mediaUrls: mediaUrls || [],
        status: scheduledAt ? 'scheduled' : 'draft',
        aiGenerated: aiGenerated || false,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
