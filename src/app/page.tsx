import PostEditor from '@/components/PostEditor';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Social Scheduler
          </h1>
          <p className="text-xl text-gray-600">
            Schedule, publish, and analyze your social media posts with AI
          </p>
        </div>
        <PostEditor />
      </div>
    </main>
  );
}
