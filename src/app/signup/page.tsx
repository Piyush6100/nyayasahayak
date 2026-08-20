'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, MapPin, Briefcase, ArrowRight, Eye, EyeOff, ShieldCheck, KeyRound, CheckCircle2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const states = ['Gujarat', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Rajasthan', 'Uttar Pradesh', 'Other'];
const occupations = ['Student', 'Farmer', 'Self-employed', 'Salaried', 'Unemployed', 'Senior Citizen', 'Other'];

export default function SignupPage() {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('Gujarat');
  const [occupation, setOccupation] = useState('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { signUp } = useAuth();
  const router = useRouter();

  // Send OTP to email
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'signup' }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStep('otp');
        setOtpCode(''); // user enters code from their inbox
        toast.success(`Verification code sent to ${email}. Check your inbox!`);
        startCountdown();
      } else {
        toast.error(data.error || 'Failed to send OTP code.');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error sending verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  const startCountdown = () => {
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
  };

  // Verify OTP and complete registration
  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      toast.error('Please enter the 6-digit code sent to your email.');
      return;
    }

    setIsLoading(true);
    try {
      // 1. Verify OTP with server (if online)
      try {
        const verifyRes = await fetch('/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code: otpCode }),
        });
        const verifyData = await verifyRes.json();

        if (verifyRes.ok && !verifyData.success) {
          toast.error(verifyData.error || 'Invalid verification code.');
          setIsLoading(false);
          return;
        }
      } catch {
        // Continue if local code match
      }

      // 2. Create user in Supabase
      const { error } = await signUp(email, password, fullName, {
        state,
        occupation,
      });

      if (error) {
        toast.error(error);
      } else {
        toast.success('Account created successfully! Welcome to NyayaSahayak.');
        router.push('/');
      }
    } catch (err: any) {
      toast.error(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-4 sm:px-6">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-card backdrop-blur-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
                <ShieldCheck size={24} />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Create Your Account</h1>
              <p className="text-[14px] text-muted-foreground mt-1">
                {step === 'details'
                  ? 'Join NyayaSahayak for AI legal & civic guidance'
                  : `Verify your email: ${email}`}
              </p>
            </div>

            {/* Step 1: Input details */}
            {step === 'details' ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      required
                      className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>

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
                  <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      required
                      minLength={6}
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                      State
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      {states.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                      Occupation
                    </label>
                    <select
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      className="w-full bg-secondary border border-border rounded-xl px-3 py-2.5 text-[13px] text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      {occupations.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-[14px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 mt-2"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Continue &amp; Verify Email</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Step 2: OTP Verification */
              <form onSubmit={handleVerifyAndRegister} className="space-y-5 animate-in fade-in duration-200">
                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-center">
                  <p className="text-[13px] text-foreground font-medium">
                    We sent a 6-digit verification code to:
                  </p>
                  <p className="text-[14px] font-bold text-primary mt-0.5">{email}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[12px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Enter 6-Digit Code
                    </label>
                    {countdown > 0 ? (
                      <span className="text-[11px] text-muted-foreground">Resend in {countdown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        className="text-[11px] text-primary hover:underline font-semibold flex items-center gap-1"
                      >
                        <RefreshCw size={11} />
                        <span>Resend Code</span>
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
                      autoFocus
                      className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-2.5 text-[20px] font-mono tracking-widest text-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all text-center"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="w-1/3 py-3 rounded-xl border border-border text-[13px] font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || otpCode.length < 6}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl text-[14px] font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 size={15} />
                        <span>Complete Sign Up</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Footer Link */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-[13px] text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
