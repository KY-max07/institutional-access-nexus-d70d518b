
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'super_admin' | 'management' | 'institution_admin' | 'teacher' | 'custom';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutionId?: string;
  institutionName?: string;
  permissions?: string[];
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, User> = {
  'super@admin.com': {
    id: '1',
    name: 'Sarah Wilson',
    email: 'super@admin.com',
    role: 'super_admin',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b95b72d7?w=150'
  },
  'management@school.com': {
    id: '2',
    name: 'David Chen',
    email: 'management@school.com',
    role: 'management',
    institutionId: 'inst_1',
    institutionName: 'Riverside High School',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  },
  'admin@school.com': {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'admin@school.com',
    role: 'institution_admin',
    institutionId: 'inst_1',
    institutionName: 'Riverside High School',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
  },
  'teacher@school.com': {
    id: '4',
    name: 'James Thompson',
    email: 'teacher@school.com',
    role: 'teacher',
    institutionId: 'inst_1',
    institutionName: 'Riverside High School',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    const foundUser = mockUsers[email];
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
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
