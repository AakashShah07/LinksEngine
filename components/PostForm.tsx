'use client';

import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api';
import { Loader2, Send } from 'lucide-react';

interface PostFormProps {
  onPostCreated: () => void;
}

export function PostForm({ onPostCreated }: PostFormProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !token) return;

    setLoading(true);
    setError('');

    try {
      await api.createPost(text.trim(), token);
      setText('');
      onPostCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] resize-none"
            disabled={loading}
          />
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!text.trim() || loading}
              className="flex items-center space-x-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>{loading ? 'Posting...' : 'Post'}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}