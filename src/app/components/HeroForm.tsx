"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

export const HeroForm = () => {
  const [inputWords, setInputWords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [requestCount, setRequestCount] = useState(() => {
    // Client-side only check for localStorage
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("mnemonicRequestCount") || "0");
    }
    return 0;
  });

  const { user } = useAuth();
  const MAX_FREE_REQUESTS = 5;

  useEffect(() => {
    if (user) {
      setRequestCount(0);
      localStorage.removeItem("mnemonicRequestCount");
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("mnemonicRequestCount", requestCount.toString());
    }
  }, [requestCount, user]);

  const handleSignIn = () => {
    // This function will be called by the toast action
    // In a real app, you might trigger a login modal or redirect
    // For now, let's assume it should trigger the same logic as your Header's login button
    // Or, if you have a dedicated sign-in page:
    window.location.href = "/auth/signin"; // Or trigger a login modal
  };

  const handleGenerate = async () => {
    if (!inputWords) return;

    if (!user && requestCount >= MAX_FREE_REQUESTS) {
      toast.error("Free trial limit reached!", {
        description: "Sign in to get unlimited generations",
        action: {
          label: "Sign In",
          onClick: handleSignIn,
        },
        duration: 5000,
      });
      return;
    }

    setIsGenerating(true);
    setResult("");

    try {
      const response = await fetch("/api/generate-mnemonic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: inputWords }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch mnemonic");
      }

      const data = await response.json();
      setResult(data.mnemonic);

      if (!user) {
        setRequestCount((prev) => prev + 1);

        if (requestCount === MAX_FREE_REQUESTS - 1) {
          toast.warning("Last free generation!", {
            description: "Sign in to get unlimited generations",
            action: {
              label: "Sign In",
              onClick: handleSignIn,
            },
          });
        }
      }
    } catch (error) {
      toast.error("Failed to generate mnemonic", {
        description: "Please try again later",
      });
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 mb-8 md:mb-12">
      <div className="space-y-3 md:space-y-4">
        <textarea
          className="w-full p-2.5 md:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-sm md:text-base"
          rows={4}
          placeholder="Enter words or concepts to memorize (e.g., Mercury, Venus, Earth, Mars...)"
          value={inputWords}
          onChange={(e) => setInputWords(e.target.value)}
        />

        {!user && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs md:text-sm text-gray-600">
            <span>
              Free generations remaining: {MAX_FREE_REQUESTS - requestCount}
            </span>
            <div className="flex gap-1">
              {[...Array(MAX_FREE_REQUESTS)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full ${
                    i < requestCount ? "bg-indigo-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={
            isGenerating ||
            !inputWords ||
            (!user && requestCount >= MAX_FREE_REQUESTS)
          }
          className="w-full py-2.5 md:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm md:text-base"
        >
          {isGenerating ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 md:h-5 w-4 md:w-5 border-b-2 border-white mr-2" />
              Generating...
            </div>
          ) : (
            <div className="flex items-center">
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 mr-2" />
              Generate Mnemonic
            </div>
          )}
        </button>

        {result && (
          <div className="bg-white/80 backdrop-blur-sm p-3 md:p-4 rounded-lg">
            <p className="text-gray-800 whitespace-pre-line text-sm md:text-base">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
