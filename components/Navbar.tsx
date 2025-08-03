'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { Button } from '@/components/ui/button';
import { User, LogOut, Users } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ConnectHub</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href={`/profile/${user.id}`}>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:block">{user.name}</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:block">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}