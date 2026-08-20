'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, KeyRound, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function LoginFormContent() {
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirect') || '/';

  // Handle password login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error);
      } else {
        toast.success('Welcome back to NyayaSahayak!');
        router.push(redirectTo);
      }
    } catch (err: any) {
      toast.error(err.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Send OTP to email
  const handleSendOtp = async () => {
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'login' }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setOtpSent(true);
        setOtpCode('');
        toast.success(`Verification code sent to ${email}. Check your inbox!`);
        // 60s cooldown
        setCountdown(60);
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        toast.error(data.error || 'Failed to send OTP.');
      }
    } catch {
      toast.error('Network error sending OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP & Login
  const handleVerifyOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      toast.error('Please enter the 6-digit code sent to your email.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otpCode }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Email verified successfully!');
        await signIn(email);
        router.push(redirectTo);
      } else {
        toast.error(data.error || 'Invalid or expired OTP.');
      }
    } catch {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Card Container */}
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-[14px] text-muted-foreground mt-1">
            Access your cases, RTI drafts, and legal queries
          </p>
        </div>

        {/* Auth Method Tabs */}
        <div className="flex bg-muted/60 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setAuthMode('password')}
            className={`flex-1 py-2 text-[13px] font-semibold rounded-lg transition-all ${
              authMode === 'password'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('otp')}
            className={`flex-1 py-2 text-[13px] font-semibold rounded-lg transition-all ${
              authMode === 'otp'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Email OTP
          </button>
        </div>

        {/* Password Login Form */}
        {authMode === 'password' ? (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setAuthMode('otp')}
                  className="text-[12px] text-primary hover:underline font-medium"
                >
                  Use OTP instead
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-secondary border border-border rounded-xl pl-10 pr-10 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-[14px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        ) : (
          /* OTP Login Form */
          <div className="space-y-4">
            <div>
              <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    disabled={otpSent}
                    className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60 transition-all"
                  />
                </div>
                {!otpSent && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading || !email}
                    className="bg-primary text-primary-foreground px-4 rounded-xl text-[13px] font-semibold hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 whitespace-nowrap"
                  >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </button>
                )}
              </div>
            </div>

            {otpSent && (
              <form onSubmit={handleVerifyOtpLogin} className="space-y-4 animate-in fade-in duration-200">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">
                      6-Digit Email Code
                    </label>
                    {countdown > 0 ? (
                      <span className="text-[11px] text-muted-foreground">Resend in {countdown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[11px] text-primary hover:underline font-semibold"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="123456"
                      className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-2.5 text-[18px] font-mono tracking-widest text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otpCode.length < 6}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-[14px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 size={15} />
                      <span>Verify &amp; Sign In</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-[13px] text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4 sm:px-6">
        <Suspense fallback={<div className="w-full max-w-md p-8 text-center text-muted-foreground">Loading login...</div>}>
          <LoginFormContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
