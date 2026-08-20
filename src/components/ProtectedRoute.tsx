'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

const publicRoutes = ['/', '/login', '/signup'];

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return; // Wait until auth state is resolved

    const isPublic = publicRoutes.includes(pathname);

    if (!user && !isPublic) {
      // User is not logged in and trying to access a protected route
      router.replace(`/login?redirect=${pathname}`);
    } else {
      setIsAuthorized(true);
    }
  }, [user, isLoading, pathname, router]);

  // Show loading spinner while checking auth status
  if (isLoading || (!isAuthorized && !publicRoutes.includes(pathname))) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 animate-pulse">
          <ShieldCheck size={32} />
        </div>
        <p className="text-muted-foreground font-medium animate-pulse">Verifying Access...</p>
      </div>
    );
  }

  return <>{children}</>;
}
