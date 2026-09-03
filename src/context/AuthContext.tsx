'use strict';
'use client';

import React, { createContext, useContext, useState } from 'react';
import { User } from '@/lib/types';
import { DEMO_USER } from '@/data/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Pre-seed with DEMO_USER so the user can easily experience Library, Orders, and Account flows immediately
  const [user, setUser] = useState<User | null>(DEMO_USER);

  const login = () => {
    setUser(DEMO_USER);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
