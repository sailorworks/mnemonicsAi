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
    <div className="relative isolate min-h-[calc(100vh-4rem)]">
      {/* Background gradient with lower z-index */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 800"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
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

      {/* Main content */}
      <div className="relative pt-16 md:pt-24 lg:pt-32 pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              <span className="block md:inline">Remember Everything with</span>
              <span className="block md:inline text-indigo-600">
                {" "}
                AI-Powered
              </span>{" "}
              <span className="block md:inline">Mnemonics</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4 sm:px-6">
              Transform any list of words or concepts into memorable mnemonics
              instantly. Learn faster, retain longer.
            </p>

            {/* Input card */}
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
                      Free generations remaining:{" "}
                      {MAX_FREE_REQUESTS - requestCount}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
