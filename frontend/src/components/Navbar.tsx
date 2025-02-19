"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Dashboard Link */}
        <div
          className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => router.push("/dashboard")}
        >
          <Image
            src="/logo.jpg"
            alt="OptiCare Logo"
            width={60}
            height={60}
            className="rounded-full border-4 border-white shadow-lg"
          />
          <h1 className="text-2xl font-semibold tracking-wide">OptiCare</h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          {[
            { name: "Beds", path: "/beds" },
            { name: "Staff", path: "/staff" },
            { name: "Flow", path: "/flow" },
            { name: "Devices", path: "/devices" },
            { name: "Alerts", path: "/alerts" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Authentication Buttons */}
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-md"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="px-5 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-800 transition-all shadow-md"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
