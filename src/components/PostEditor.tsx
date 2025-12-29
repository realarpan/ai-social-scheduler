'use client';

import { useState } from 'react';

export default function PostEditor() {
  const [content, setContent] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [aiTopic, setAiTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAIGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          platform: platforms[0] || 'twitter',
        }),
      });
      const data = await response.json();
      if (data.success) {
        setContent(data.post.content);
      }
    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          platforms,
          scheduledAt: scheduledDate || null,
          aiGenerated: !!aiTopic,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Post created successfully!');
        setContent('');
        setPlatforms([]);
        setScheduledDate('');
      }
    } catch (error) {
      console.error('Post creation failed:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Create Post</h2>

      {/* AI Generator Section */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span>🤖</span> AI Post Generator
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter topic (e.g., productivity tips)"
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAIGenerate}
            disabled={loading || !aiTopic}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      {/* Content Editor */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Post Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post..."
          rows={6}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-2 text-sm text-gray-600">
          {content.length} characters
        </div>
      </div>

      {/* Platform Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Select Platforms</label>
        <div className="grid grid-cols-2 gap-3">
          {['twitter', 'linkedin', 'facebook', 'instagram'].map((platform) => (
            <label
              key={platform}
              className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={platforms.includes(platform)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPlatforms([...platforms, platform]);
                  } else {
                    setPlatforms(platforms.filter((p) => p !== platform));
                  }
                }}
                className="w-4 h-4"
              />
              <span className="capitalize">{platform}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Schedule Date */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Schedule Post (Optional)
        </label>
        <input
          type="datetime-local"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          {scheduledDate ? 'Schedule Post' : 'Save as Draft'}
        </button>
        <button
          onClick={() => {
            setContent('');
            setAiTopic('');
          }}
          className="px-6 py-3 border rounded-lg hover:bg-gray-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
