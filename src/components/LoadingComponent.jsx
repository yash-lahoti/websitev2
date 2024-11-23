import React, { useEffect, useState } from 'react';

const LoadingComponent = ({ duration = 2000, colors = ['#001f3f', '#FF851B'] }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!loading) return null;

  return (
    <div className="flex items-center justify-center h-screen bg-primary relative overflow-hidden">
      {/* Infinity Shape */}
      <div className="absolute w-[400px] h-[200px]">
        <svg
          viewBox="0 0 400 200"
          xmlns="http://www.w3.org/2000/svg"
          className="infinity-shape"
        >
          <path
            d="M100,100 C100,50 300,50 300,100 C300,150 100,150 100,100 Z"
            stroke="rgba(0, 150, 255, 0.7)"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>

      {/* Traveling Point */}
      <div className="absolute w-[400px] h-[200px]">
        <svg
          viewBox="0 0 400 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle r="6" fill="#00FFFF" className="glow-point">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path="M100,100 C100,50 300,50 300,100 C300,150 100,150 100,100 Z"
            />
          </circle>
        </svg>
      </div>

      {/* Animated Text */}
      <div className="text-9xl font-bold z-10">
        <span
          className="fluid-animation text-transparent"
          style={{
            backgroundImage: `linear-gradient(to top, ${colors[0]}, ${colors[1]})`,
          }}
        >
          Y
        </span>
        <span
          className="fluid-animation text-transparent"
          style={{
            backgroundImage: `linear-gradient(to top, ${colors[0]}, ${colors[1]})`,
          }}
        >
          L
        </span>
      </div>

      <style jsx>{`
        @keyframes fluidFill {
          0% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        .fluid-animation {
          background-size: 100% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fluidFill ${duration / 1000}s ease-in-out forwards;
        }

        .bg-primary {
          background-color: #000000; /* Deep black background */
        }

        .infinity-shape path {
          filter: drop-shadow(0 0 10px rgba(0, 150, 255, 0.8)) drop-shadow(0 0 20px rgba(0, 150, 255, 0.8));
        }

        .glow-point {
          filter: drop-shadow(0 0 10px #00FFFF) drop-shadow(0 0 30px #00FFFF);
        }
      `}</style>
    </div>
  );
};

export default LoadingComponent;
