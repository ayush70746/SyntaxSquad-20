// src/app/login/page.tsx
"use client";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-white/80">
            Please sign in to your account
          </p>
        </div>
        <AuthForm isLogin={true} />
        <p className="mt-4 text-center text-white">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium underline hover:text-white/80">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}