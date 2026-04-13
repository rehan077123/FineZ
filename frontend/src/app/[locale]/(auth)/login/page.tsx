"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TODO: Implement Supabase auth
      console.log("Login attempt:", { email, password });
      
      // Mock success for now
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Sign in to your FineZ account
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            icon={<Mail size={18} className="text-gray-400" />}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon={<Lock size={18} className="text-gray-400" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={loading}
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-center mt-4">
          <Link
            href="/forgot-password"
            className="text-blue-600 text-sm hover:underline"
          >
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
}
