import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  isAdmin: boolean;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isAdmin: false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('elysian_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    // In a real app, we would authenticate with Firebase here
    setUser(userData);
    localStorage.setItem('elysian_user', JSON.stringify(userData));
  };

  const logout = () => {
    // In a real app, we would sign out from Firebase here
    setUser(null);
    localStorage.removeItem('elysian_user');
  };

  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};