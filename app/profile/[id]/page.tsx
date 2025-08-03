'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User, Post } from '@/types';
import { PostCard } from '@/components/PostCard';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { Loader2, Mail, Calendar, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Profile() {
  const params = useParams();
  const userId = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setError('');
        const userData = await api.getUser(userId);
        setUser(userData.user);
        setPosts(userData.posts.sort((a: Post, b: Post) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !user) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-600 text-lg">{error || 'User not found'}</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const joinedAgo = formatDistanceToNow(new Date(user.createdAt), { addSuffix: true });

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {joinedAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          {user.bio && (
            <CardContent>
              <div className="flex items-start space-x-2">
                <FileText className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">{user.bio}</p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Posts Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Posts</h2>
          <Badge variant="secondary" className="text-sm">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </Badge>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No posts yet</p>
            <p className="text-gray-400">This user hasn't shared anything yet.</p>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}