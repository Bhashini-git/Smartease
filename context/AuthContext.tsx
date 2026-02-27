import React, { createContext, useState, useContext } from 'react';
import type { User } from '../types';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  sendOtp: (contact: string) => Promise<{ success: boolean; message?: string, otp?: string }>;
  verifyOtp: (contact: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const sendOtp = async (contact: string): Promise<{ success: boolean; message?: string, otp?: string }> => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return { success: true, otp: data.otp }; // For demo purposes, we return the OTP
      }
      return { success: false, message: data.message || 'Failed to send OTP.' };
    } catch (error) {
      console.error('Send OTP error:', error);
      return { success: false, message: 'Could not connect to the server.' };
    }
  };

  const verifyOtp = async (contact: string, otp: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, otp }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setUser(data.user);
        return { success: true };
      }
      return { success: false, message: data.message || 'OTP verification failed.' };
    } catch (error) {
      console.error('Verify OTP error:', error);
      return { success: false, message: 'Could not connect to the server.' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, sendOtp, verifyOtp, logout }}>
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