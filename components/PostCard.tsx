import React from 'react';
import Link from 'next/link';
import { Post } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <Card className="mb-6 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
              {post.authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <Link
                href={`/profile/${post.authorId}`}
                className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {post.authorName}
              </Link>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{timeAgo}</span>
            </div>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {post.text}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}