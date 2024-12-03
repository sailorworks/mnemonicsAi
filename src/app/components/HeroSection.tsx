import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

const HeroSection = () => {
  const [inputWords, setInputWords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [requestCount, setRequestCount] = useState(() => {
    return parseInt(localStorage.getItem("mnemonicRequestCount") || "0");
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

  const handleSignIn = () => {
    window.location.href = "/auth/signin";
  };

  return (
    <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient)"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Remember Everything with
            <span className="text-indigo-600"> AI-Powered</span> Mnemonics
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform any list of words or concepts into memorable mnemonics
            instantly. Learn faster, retain longer.
          </p>
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-12">
            <div className="space-y-4">
              <textarea
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows={4}
                placeholder="Enter words or concepts to memorize (e.g., Mercury, Venus, Earth, Mars...)"
                value={inputWords}
                onChange={(e) => setInputWords(e.target.value)}
              />

              {!user && (
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>
                    Free generations remaining:{" "}
                    {MAX_FREE_REQUESTS - requestCount}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(MAX_FREE_REQUESTS)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
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
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Mnemonic
                  </div>
                )}
              </button>

              {result && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-line">{result}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
