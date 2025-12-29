import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSocialPost(topic: string, platform: string) {
  const platformGuidelines = {
    twitter: 'Keep it under 280 characters, use hashtags',
    linkedin: 'Professional tone, 1-2 paragraphs',
    instagram: 'Engaging caption with emojis',
    facebook: 'Conversational and friendly'
  };

  const prompt = `Generate a ${platform} post about: ${topic}

Guidelines: ${platformGuidelines[platform as keyof typeof platformGuidelines]}

Format the response as JSON with these fields:
- content: the post text
- hashtags: array of relevant hashtags
- callToAction: suggested CTA`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a social media content expert.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function optimizePostTiming(content: string, platform: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert in social media analytics and optimal posting times.'
      },
      {
        role: 'user',
        content: `Suggest the best time to post this content on ${platform}: "${content}". Return as JSON with hour (0-23) and dayOfWeek (0-6).`
      }
    ],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}
