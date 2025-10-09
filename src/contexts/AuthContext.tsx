import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'demo123') {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        setIsLoading(false);
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error('Invalid credentials');
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (userError || !userData) {
        throw new Error('Failed to fetch user data');
      }

      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        schoolId: userData.school_id,
        profilePhoto: userData.profile_photo,
        status: userData.status,
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<string> => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Failed to create account');
    }

    const { error: userError } = await supabase.from('users').insert({
      id: authData.user.id,
      email: data.email,
      name: data.name,
      phone: data.phone || null,
      role: data.role,
      school_id: null,
      status: 'ACTIVE',
    });

    if (userError) {
      throw new Error('Failed to save user data');
    }

    if (data.role === 'PLATFORM_ADMIN') {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-2fa-otp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            userId: authData.user.id,
            email: data.email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send verification code');
      }
    } else {
      const user: User = {
        id: authData.user.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        schoolId: '',
        status: 'ACTIVE',
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    }

    return authData.user.id;
  };

  const verify2FA = async (userId: string, otpCode: string): Promise<void> => {
    const { data: otpRecords, error: fetchError } = await supabase
      .from('two_factor_auth')
      .select('*')
      .eq('user_id', userId)
      .eq('verified', false)
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchError || !otpRecords || otpRecords.length === 0) {
      throw new Error('No verification code found');
    }

    const otpRecord = otpRecords[0];

    if (new Date(otpRecord.otp_expires_at) < new Date()) {
      throw new Error('Verification code has expired');
    }

    if (otpRecord.otp_code !== otpCode) {
      throw new Error('Invalid verification code');
    }

    const { error: updateError } = await supabase
      .from('two_factor_auth')
      .update({ verified: true })
      .eq('id', otpRecord.id);

    if (updateError) {
      throw new Error('Failed to verify code');
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (userError || !userData) {
      throw new Error('Failed to fetch user data');
    }

    const user: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      schoolId: userData.school_id,
      profilePhoto: userData.profile_photo,
      status: userData.status,
    };

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const resend2FA = async (userId: string): Promise<void> => {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('email')
      .eq('id', userId)
      .maybeSingle();

    if (userError || !userData) {
      throw new Error('Failed to fetch user data');
    }

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-2fa-otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          userId,
          email: userData.email,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to resend verification code');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, verify2FA, resend2FA, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};