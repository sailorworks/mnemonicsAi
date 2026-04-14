import React, { useState, useEffect } from "react";
import { Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

const MosaicBackground = ({ inputLength }: { inputLength: number }) => {
  const [blocks, setBlocks] = useState<{visible: boolean, color?: string, i: number}[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const cols = 26;
    const rows = 8;
    
    // Creating the mosaic tiles in an arch shape
    const newBlocks = Array.from({ length: rows * cols }).map((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      const centerCol = (cols - 1) / 2;
      const distFromCenter = Math.abs(col - centerCol);
      // Normalized from 0 (center) to 1 (edges)
      const normalizedDist = distFromCenter / centerCol;
      
      // Calculate arch probability
      let chance = 0;
      if (row === 0) chance = .98;
      else if (row === 1) chance = 0.8 + (normalizedDist * 0.2);
      else if (row === 2) chance = 0.4 + (normalizedDist * 0.5);
      else if (row === 3) chance = 0.1 + (normalizedDist * 0.7);
      else if (row === 4) chance = normalizedDist > 0.5 ? 0.6 : 0;
      else if (row === 5) chance = normalizedDist > 0.65 ? 0.7 : 0;
      else if (row === 6) chance = normalizedDist > 0.8 ? 0.8 : 0;
      else if (row === 7) chance = normalizedDist > 0.9 ? 0.9 : 0;

      const isVisible = Math.random() < chance;
      
      if (!isVisible) return { visible: false, i };

      let bgColors = [];
      if (col < 6) bgColors = ["bg-gradient-to-br from-blue-400/80 to-blue-500/80", "bg-gradient-to-br from-sky-400/80 to-blue-400/80", "bg-gradient-to-br from-cyan-400/80 to-sky-500/80"];
      else if (col < 12) bgColors = ["bg-gradient-to-br from-indigo-400/80 to-indigo-500/80", "bg-gradient-to-br from-violet-400/80 to-indigo-400/80", "bg-gradient-to-br from-blue-400/80 to-indigo-500/80"];
      else if (col < 18) bgColors = ["bg-gradient-to-br from-purple-400/80 to-purple-500/80", "bg-gradient-to-br from-fuchsia-400/80 to-purple-500/80", "bg-gradient-to-br from-violet-400/80 to-fuchsia-500/80"];
      else if (col < 23) bgColors = ["bg-gradient-to-br from-pink-400/80 to-pink-500/80", "bg-gradient-to-br from-fuchsia-400/80 to-pink-500/80", "bg-gradient-to-br from-rose-400/80 to-pink-400/80"];
      else bgColors = ["bg-gradient-to-br from-rose-400/80 to-orange-400/80", "bg-gradient-to-br from-orange-400/80 to-amber-400/80", "bg-gradient-to-br from-amber-400/80 to-orange-400/80"];

      return { visible: true, color: bgColors[Math.floor(Math.random() * bgColors.length)], i };
    });
    setBlocks(newBlocks);
  }, []);

  // Single tile pulse animation triggered by typing
  useEffect(() => {
    if (inputLength > 0 && blocks.length > 0) {
      const visibleBlocks = blocks.filter(b => b.visible);
      if (visibleBlocks.length > 0) {
        // Pick a random tile to pop
        const randomBlock = visibleBlocks[Math.floor(Math.random() * visibleBlocks.length)];
        setActiveIndex(randomBlock.i);
        
        const timeout = setTimeout(() => {
          setActiveIndex(null);
        }, 300);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [inputLength, blocks]);

  return (
    <div className="absolute top-0 inset-x-0 h-[650px] overflow-hidden -z-10 bg-white pointer-events-none flex justify-center">
      <div className="w-[1200px] md:w-full min-w-[1200px] max-w-[1800px] px-2 md:px-4 pt-16 md:pt-24 pointer-events-auto">
        <div 
          className="grid gap-[2px] md:gap-1 opacity-90"
          style={{ gridTemplateColumns: 'repeat(26, minmax(0, 1fr))' }}
        >
          {blocks.map((block) => (
            <motion.div 
              key={block.i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: block.visible ? 1 : 0, 
                scale: activeIndex === block.i ? 1.25 : (block.visible ? 1 : 0.8),
                zIndex: activeIndex === block.i ? 50 : 1
              }}
              transition={{ 
                duration: activeIndex === block.i ? 0.1 : 0.8,
                delay: activeIndex === block.i ? 0 : block.i * 0.001 
              }}
              className={`w-full aspect-square rounded-md md:rounded-lg lg:rounded-[12px] transition-shadow hover:z-40 relative backdrop-blur-md ${
                block.visible 
                  ? `${block.color} border border-white/60 shadow-[inset_0_2px_10px_rgba(255,255,255,0.7),0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[inset_0_2px_10px_rgba(255,255,255,0.9),0_10px_25px_rgba(0,0,0,0.15)] hover:scale-[1.15] hover:duration-200 cursor-default`
                  : 'pointer-events-none'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none backdrop-blur-[1px]"></div>
      <div className="absolute inset-x-0 bottom-0 top-[200px] bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none"></div>
    </div>
  );
};

const HeroSection = () => {
  const [inputWords, setInputWords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState("");
  const [requestCount, setRequestCount] = useState(() => {
    return parseInt(typeof window !== 'undefined' ? localStorage.getItem("mnemonicRequestCount") || "0" : "0");
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
    if (!inputWords) {
      toast.error("Please enter a word first");
      return;
    }

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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch mnemonic");
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
      const message = error instanceof Error ? error.message : "Failed to generate mnemonic";
      toast.error(message, {
        description: "Please try again later or check your API key",
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
    <div className="relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-white text-gray-900 pb-20 pt-28">
      
      {/* Dynamic Glassmorphism Arch Grid */}
      <MosaicBackground inputLength={inputWords.length} />

      {/* Main content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 mt-[15vh]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] text-[#111827] mb-5 md:mb-6 leading-[1.1]">
              Remember <span className="font-serif italic font-normal tracking-normal text-gray-800">everything</span><br />
              with AI-Powered Mnemonics
            </h1>
            <p className="text-base md:text-lg text-gray-500 mb-8 md:mb-10 max-w-2xl mx-auto font-medium leading-relaxed px-4">
              Easily transform random words into unforgettable stories. <br className="hidden md:block" />
              Master your studies with the power of artificial intelligence.
            </p>
          </motion.div>

          {/* Input container - Formatted as a sleek pill-like rounded box with textarea */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-gray-100 p-2 flex flex-col md:flex-row items-end gap-3 transition-shadow duration-300 hover:shadow-[0_8px_50px_rgb(0,0,0,0.12)] relative z-20">
              <textarea
                className="w-full bg-transparent border-0 focus:ring-0 text-gray-800 placeholder:text-gray-400 font-medium px-5 py-4 min-h-[90px] resize-none outline-none text-base md:text-lg lg:text-xl"
                placeholder="Enter words to memorize (e.g., Mercury, Venus...)"
                value={inputWords}
                onChange={(e) => setInputWords(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />

              <div className="flex flex-col w-full md:w-auto items-end gap-2 shrink-0 self-end px-2 md:px-0 md:pr-2 pb-2 md:pb-2">
                {!user && (
                  <div className="text-xs text-gray-400 font-medium px-4 text-center md:text-right w-full">
                    <span className="text-pink-500">{MAX_FREE_REQUESTS - requestCount}</span> free generations left
                  </div>
                )}
                <button
                  onClick={handleGenerate}
                  disabled={
                    isGenerating ||
                    !inputWords ||
                    (!user && requestCount >= MAX_FREE_REQUESTS)
                  }
                  className="w-full md:w-auto whitespace-nowrap px-8 py-3.5 bg-[#14151a] text-white rounded-full font-semibold hover:bg-black hover:scale-[1.02] focus:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-md hover:shadow-xl shadow-black/10"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-gray-300" />
                      <span>Create Mnemonic</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Simulated Reviews Footer like reference image */}
            <div className="mt-6 flex items-center justify-center gap-3 text-[13px] font-semibold text-gray-600">
              <div className="bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">G</div>
              <div className="flex items-center gap-[2px] text-black">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span>1,020+ Reviews</span>
            </div>

            {/* Generated Result Card */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 text-left shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Result Ready</h3>
                </div>
                <p className="text-xl text-gray-800 whitespace-pre-line leading-relaxed font-medium">
                  {result}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
