// contexts/AuthProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [previousUser, setPreviousUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        if (session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event);
      console.log("Session:", session);

      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);

      if (event === "SIGNED_IN") {
        console.log("Signed in:", session);
      } else if (event === "SIGNED_OUT") {
        console.log("Signed out");
      } else if (event === "TOKEN_REFRESHED") {
        console.log("Token refreshed");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setPreviousUser(user);
  }, [user]);

  useEffect(() => {
    if (user && !previousUser) {
      toast.success("Welcome!", {
        description: "You now have unlimited mnemonic generations",
      });
    }
  }, [user, previousUser]);

  // Prevent hydration errors
  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut: async () => {
          try {
            await supabase.auth.signOut();
            setUser(null);
          } catch (error) {
            console.error("Error signing out:", error);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
