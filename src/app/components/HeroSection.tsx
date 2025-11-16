import { HeroForm } from "./HeroForm"; // Import the new client component

// This is now a Server Component. Notice there is NO "use client".
const HeroSection = () => {
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
            {/* THIS IS THE STATIC CONTENT THAT LINGO.DEV WILL TRANSLATE */}
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

            {/* HERE WE RENDER THE INTERACTIVE CLIENT COMPONENT */}
            <HeroForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
