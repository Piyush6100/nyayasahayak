'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  phone?: string;
  state?: string;
  occupation?: string;
  age?: number;
  income?: string;
  avatar_url?: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string, extra?: Partial<UserProfile>) => Promise<{ error: string | null; user?: User | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data as UserProfile);
      } else {
        // Fallback profile from user metadata
        const u = (await supabase.auth.getUser()).data.user;
        if (u) {
          setProfile({
            id: u.id,
            email: u.email,
            full_name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Citizen',
          });
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // 1. Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    // 2. Auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password?: string) => {
    try {
      if (password) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) return { error: error.message };
        return { error: null };
      } else {
        // Magic link / OTP signin
        const { error } = await supabase.auth.signInWithOtp({
          email,
        });
        if (error) return { error: error.message };
        return { error: null };
      }
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred during sign in.' };
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    extra?: Partial<UserProfile>
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            ...extra,
          },
        },
      });

      if (error) return { error: error.message };

      // Also upsert profile record
      if (data.user) {
        try {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            email,
            full_name: fullName,
            state: extra?.state || 'Gujarat',
            occupation: extra?.occupation || 'Student',
            ...extra,
            updated_at: new Date().toISOString(),
          });
        } catch {
          // Table might not exist yet if user hasn't run the SQL
        }
      }

      return { error: null, user: data.user };
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred during sign up.' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
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
