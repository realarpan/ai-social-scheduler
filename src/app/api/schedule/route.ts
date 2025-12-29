import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { publishToTwitter, publishToLinkedIn } from '@/lib/platforms';

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: { include: { accounts: true } } },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const results = [];

    for (const platform of post.platforms) {
      const account = post.user.accounts.find(
        (acc) => acc.platform === platform && acc.isActive
      );

      if (!account) {
        results.push({ platform, success: false, error: 'Account not connected' });
        continue;
      }

      let result;
      if (platform === 'twitter') {
        result = await publishToTwitter(post.content, account.accessToken);
      } else if (platform === 'linkedin') {
        result = await publishToLinkedIn(
          post.content,
          account.accessToken,
          account.username
        );
      }

      results.push({ platform, ...result });
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        status: results.every((r) => r.success) ? 'published' : 'failed',
        publishedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
