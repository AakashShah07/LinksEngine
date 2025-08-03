'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthContextType } from '@/types';
import { getStoredToken, setStoredToken, removeStoredToken } from '@/lib/auth';
import { api } from '@/lib/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getStoredToken();
      if (storedToken) {
        try {
          const userData = await api.getCurrentUser(storedToken);
          setToken(storedToken);
          setUser(userData);
        } catch (error) {
          // Token is invalid, remove it
          removeStoredToken();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (newToken: string, userData: User) => {
    setStoredToken(newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    removeStoredToken();
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}