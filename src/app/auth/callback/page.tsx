"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for hash fragment first
        const hashFragment = window.location.hash;
        if (hashFragment) {
          // Handle hash-based auth (production case)
          const hashParams = new URLSearchParams(hashFragment.substring(1));
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");

          if (accessToken) {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || "",
            });
            if (error) throw error;
          }
        } else {
          // Handle query-based auth (localhost case)
          const { error } = await supabase.auth.getSession();
          if (error) throw error;
        }

        // Redirect to home page after successful authentication
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Error during auth callback:", error);
        router.push("/");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
    </div>
  );
}
