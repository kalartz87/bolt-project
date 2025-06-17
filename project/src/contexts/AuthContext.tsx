import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: 'customer' | 'vendor' | 'admin') => Promise<boolean>;
  register: (userData: Partial<User>, role: 'customer' | 'vendor') => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@kalartz.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
  },
  {
    id: '2',
    email: 'vendor@kalartz.com',
    name: 'John Vendor',
    role: 'vendor',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
  },
  {
    id: '3',
    email: 'customer@kalartz.com',
    name: 'Jane Customer',
    role: 'customer',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'customer' | 'vendor' | 'admin'): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: Partial<User>, role: 'customer' | 'vendor'): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock registration - in real app, this would be an API call
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role,
      createdAt: new Date().toISOString(),
      isActive: role === 'customer', // Customers are active immediately, vendors need approval
    };
    
    mockUsers.push(newUser);
    
    if (role === 'customer') {
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
    }
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}