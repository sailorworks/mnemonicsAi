"use client";

import React, { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { User, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LocaleSwitcher } from "lingo.dev/react/client";

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
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <span className="text-xl font-bold text-indigo-600">MnemonicsAI</span>
    </Link>
  );

  const NavLinks = () => (
    <div className="hidden md:flex items-center ml-8 space-x-6">
      <Link
        href="/blog"
        className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200"
      >
        Blog
      </Link>
    </div>
  );

  if (loading) {
    return (
      <nav className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <LogoSection />
              <NavLinks />
            </div>
            <div className="flex items-center">
              <div className="animate-pulse bg-gray-200 h-8 w-24 rounded" />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <LogoSection />
            <NavLinks />
          </div>
          <div className="flex items-center space-x-4">
            {/* --- Lingo.dev Locale Switcher --- */}
            <LocaleSwitcher locales={["en", "es"]} />
            {/* ---------------------------------- */}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
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
                    <span className="font-medium text-gray-700">
                      {user.user_metadata?.full_name ||
                        user.email?.split("@")[0] ||
                        "User"}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleGoogleLogin}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
