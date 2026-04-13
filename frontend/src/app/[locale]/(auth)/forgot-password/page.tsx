"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement password reset
      console.log("Password reset request:", email);

      // Mock success
      setTimeout(() => {
        setSubmitted(true);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-4xl mb-4">📧</div>
          <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Click the link in the email to reset your password.
          </p>
          <Link href="/login">
            <Button variant="primary" className="w-full">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">Forgot Password?</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Enter your email to reset your password
        </p>

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

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={loading}
          >
            Send Reset Link
          </Button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
