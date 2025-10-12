import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'SCHOOL_ADMIN' | 'PLATFORM_ADMIN';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<string>;
  verify2FA: (userId: string, otpCode: string) => Promise<void>;
  resend2FA: (userId: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  pendingUser: { id: string; data: SignupData } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'parent@demo.com',
    phone: '+1234567890',
    role: 'PARENT',
    schoolId: 'school1',
    profilePhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'ACTIVE'
  },
  {
    id: '2',
    name: 'Mr. David Smith',
    email: 'teacher@demo.com',
    phone: '+1234567891',
    role: 'TEACHER',
    schoolId: 'school1',
    profilePhoto: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'ACTIVE'
  },
  {
    id: '3',
    name: 'Dr. Emily Clark',
    email: 'admin@demo.com',
    phone: '+1234567892',
    role: 'SCHOOL_ADMIN',
    schoolId: 'school1',
    profilePhoto: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'ACTIVE'
  },
  {
    id: '4',
    name: 'Alex Johnson',
    email: 'student@demo.com',
    phone: '+1234567893',
    role: 'STUDENT',
    schoolId: 'school1',
    profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'ACTIVE'
  }
];

const mockOTPs: { [key: string]: string } = {};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingUser, setPendingUser] = useState<{ id: string; data: SignupData } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }

    setIsLoading(false);
  };

  const signup = async (data: SignupData): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }

    const userId = `user_${Date.now()}`;

    if (data.role === 'PLATFORM_ADMIN') {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      mockOTPs[userId] = otp;

      console.log(`[MOCK] OTP for ${data.email}: ${otp}`);

      setPendingUser({ id: userId, data });

      return userId;
    } else {
      const newUser: User = {
        id: userId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        schoolId: 'school1',
        status: 'ACTIVE',
      };

      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));

      return userId;
    }
  };

  const verify2FA = async (userId: string, otpCode: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const storedOTP = mockOTPs[userId];
    if (!storedOTP) {
      throw new Error('No verification code found');
    }

    if (storedOTP !== otpCode) {
      throw new Error('Invalid verification code');
    }

    if (pendingUser && pendingUser.id === userId) {
      const newUser: User = {
        id: userId,
        name: pendingUser.data.name,
        email: pendingUser.data.email,
        phone: pendingUser.data.phone,
        role: pendingUser.data.role,
        schoolId: 'school1',
        status: 'ACTIVE',
      };

      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setPendingUser(null);
      delete mockOTPs[userId];
    } else {
      throw new Error('User verification failed');
    }
  };

  const resend2FA = async (userId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!pendingUser || pendingUser.id !== userId) {
      throw new Error('No pending verification found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    mockOTPs[userId] = otp;

    console.log(`[MOCK] New OTP for ${pendingUser.data.email}: ${otp}`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, verify2FA, resend2FA, logout, isLoading, pendingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
