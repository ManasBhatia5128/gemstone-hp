'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Gem, Lock, Loader2, AlertCircle } from 'lucide-react';

const LOGO_URL = '/hp_logo.png';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Invalid password');
      }

      const redirect = searchParams.get('redirect') || '/admin';
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img
            src={LOGO_URL}
            alt="Humara Pandit"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="heading-2 text-[#232323]">Admin Login</h1>
          <p className="body-small text-[#353535] mt-2">
            Enter your password to access the admin dashboard
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#FCC9C7] rounded-xl border border-red-300 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="body-small text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[#E9E1E1] shadow-lg">
          <div className="mb-6">
            <label className="block body-small text-[#232323] mb-2 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-3 border border-[#999999] rounded-xl bg-white text-[#232323] placeholder:text-[#999999] focus:border-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-[#4D4D4D]/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <Gem className="w-5 h-5" />
                <span>Login to Dashboard</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center caption text-[#353535] mt-6">
          <a href="/" className="text-[#768597] hover:text-[#232323] transition-colors">
            ← Back to Home
          </a>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
