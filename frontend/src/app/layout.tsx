// src/app/layout.tsx
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-50 text-gray-900">
        <AuthProvider> {/* Wrap everything inside AuthProvider */}
          <Navbar />
          <div className="container mx-auto p-4">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
