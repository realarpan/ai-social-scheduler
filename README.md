# AI Social Media Scheduler 🚀

AI-powered platform for scheduling and managing social media posts across multiple platforms.

## Features
- 🤖 AI-powered post generation
- 📅 Advanced scheduling with optimal timing
- 📊 Real-time analytics dashboard
- 🔗 Multi-platform support (Twitter, LinkedIn, Facebook, Instagram)
- 👥 Team collaboration
- 📈 Performance insights

## Tech Stack
- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **AI**: OpenAI GPT-4
- **Queue**: BullMQ + Redis
- **Auth**: NextAuth.js

## Quick Start

1. Clone and install:
\`\`\`bash
git clone https://github.com/yourusername/ai-social-scheduler
cd ai-social-scheduler
npm install
\`\`\`

2. Setup environment:
\`\`\`bash
cp .env.example .env
# Add your API keys
\`\`\`

3. Setup database:
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

4. Run development server:
\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000

## Deployment
Deploy to Vercel with one click or use Docker.
## License
MIT
