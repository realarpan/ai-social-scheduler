import { NextRequest, NextResponse } from 'next/server';
import { generateSocialPost } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const { topic, platform } = await req.json();

    if (!topic || !platform) {
      return NextResponse.json(
        { error: 'Topic and platform are required' },
        { status: 400 }
      );
    }

    const generatedPost = await generateSocialPost(topic, platform);

    return NextResponse.json({
      success: true,
      post: generatedPost,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
