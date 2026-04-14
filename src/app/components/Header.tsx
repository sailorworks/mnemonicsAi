"use client";

import React, { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { User, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    console.log("Header - Current user:", user);
  }, [user]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("Login error:", error.message);
        throw error;
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const LogoSection = () => (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/mnemonics.svg"
        alt="MnemonicsAI Logo"
        width={28}
        height={28}
        className="w-7 h-7 filter drop-shadow-sm"
      />
      <span className="text-xl font-bold tracking-tight text-gray-900">MnemonicsAI</span>
    </Link>
  );

  const NavLinks = () => (
    <div className="hidden md:flex items-center space-x-8">
      <Link
        href="/blog"
        className="text-gray-600 hover:text-black font-medium text-sm transition-colors duration-200"
      >
        Blog
      </Link>
    </div>
  );

  if (loading) {
    return (
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-6xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <LogoSection />
          </div>
          <div className="flex items-center">
            <div className="animate-pulse bg-gray-200 h-10 w-28 rounded-full" />
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-6xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full px-4 md:px-6 py-3 flex justify-between items-center min-h-[60px]">
        <div className="flex items-center gap-12">
          <LogoSection />
          <NavLinks />
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-3 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  {user.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border border-gray-200"
                    />
                  ) : (
                    <User className="w-8 h-8 p-1.5 rounded-full bg-gray-100 text-gray-600" />
                  )}
                  <span className="font-medium text-sm text-gray-900 hidden sm:block">
                    {user.user_metadata?.full_name ||
                      user.email?.split("@")[0] ||
                      "User"}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-2 border border-gray-100 overflow-hidden">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              className="px-6 py-2.5 bg-[#14151a] text-white rounded-full hover:bg-black transition-all duration-200 font-medium text-sm shadow-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
