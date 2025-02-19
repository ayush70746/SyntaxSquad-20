// src/app/signup/page.tsx
"use client";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-white/80">
            Join us by creating your account
          </p>
        </div>
        <AuthForm isLogin={false} />
        <p className="mt-4 text-center text-white">
          Already have an account?{" "}
          <Link href="/login" className="font-medium underline hover:text-white/80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}