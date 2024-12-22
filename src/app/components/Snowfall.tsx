import React, { useEffect, useState } from "react";

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<
    Array<{ id: number; left: number; delay: number; size: number }>
  >([]);

  useEffect(() => {
    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 50 }, (_, index) => ({
      id: index,
      left: Math.random() * 100, // Random horizontal position (0-100%)
      delay: Math.random() * 5, // Random animation delay (0-5s)
      size: Math.random() * 0.3 + 0.1, // Random size (0.1-0.4rem)
    }));

    setSnowflakes(initialSnowflakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-fall"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay}s`,
            width: `${flake.size}rem`,
            height: `${flake.size}rem`,
            opacity: 0.7,
            background: "white",
            borderRadius: "50%",
            filter: "blur(1px)",
            top: "-1%",
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
