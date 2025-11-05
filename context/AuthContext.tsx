
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  socialLogin: (provider: 'google' | 'linkedin') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session from localStorage
    try {
      const storedUser = localStorage.getItem('resumeGeniusUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
        // Use a small timeout to prevent flash of login page on reload
        setTimeout(() => setLoading(false), 200);
    }
  }, []);

  // Fake login for demo purposes
  const login = async (email: string, pass: string): Promise<void> => {
    console.log(`Attempting login for ${email}`);
    // In a real app, you'd make an API call here.
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = { name: 'Demo User', email: email };
        setCurrentUser(user);
        localStorage.setItem('resumeGeniusUser', JSON.stringify(user));
        resolve();
      }, 500);
    });
  };

  // Fake signup for demo purposes
  const signup = async (name: string, email: string, pass: string): Promise<void> => {
     console.log(`Attempting signup for ${name} with email ${email}`);
    // In a real app, you'd make an API call here.
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = { name, email };
        setCurrentUser(user);
        localStorage.setItem('resumeGeniusUser', JSON.stringify(user));
        resolve();
      }, 500);
    });
  };
  
  // Fake social login for demo purposes
  const socialLogin = async (provider: 'google' | 'linkedin'): Promise<void> => {
      console.log(`Attempting login with ${provider}`);
      return new Promise((resolve) => {
          setTimeout(() => {
              const user: User = { name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`, email: `${provider}@example.com` };
              setCurrentUser(user);
              localStorage.setItem('resumeGeniusUser', JSON.stringify(user));
              resolve();
          }, 500);
      });
  }

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('resumeGeniusUser');
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    socialLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
