import React, { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  // Animated progress counter (fake, for feel)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return p;
        return p + Math.random() * 8;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* ============ BACKGROUND GRADIENT ============ */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"></div>

      {/* ============ ANIMATED ORBS ============ */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[420px] h-[420px] rounded-full bg-blue-500/30 blur-[120px] animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[380px] h-[380px] rounded-full bg-cyan-400/25 blur-[120px] animate-[float_10s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-[40%] left-[50%] w-[320px] h-[320px] rounded-full bg-purple-500/20 blur-[120px] animate-[float_12s_ease-in-out_infinite]"></div>
      </div>

      {/* ============ GRID PATTERN OVERLAY ============ */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      ></div>

      {/* ============ FLOATING PARTICLES ============ */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="absolute block w-1 h-1 rounded-full bg-white/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `rise ${4 + Math.random() * 6}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6">
        {/* LOGO MARK */}
        <div className="relative">
          {/* Rotating gradient ring */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 blur-xl opacity-60 animate-pulse"></div>

          {/* Logo card */}
          <div className="relative w-24 h-24 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl">
            <svg
              viewBox="0 0 24 24"
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3L2 8l10 5 10-5-10-5z" />
              <path d="M2 16l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          {/* Orbiting dots */}
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_4px_rgba(34,211,238,0.8)]"></span>
          </div>
          <div className="absolute inset-0 animate-[spin_5s_linear_infinite_reverse]">
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_3px_rgba(168,85,247,0.8)]"></span>
          </div>
        </div>

        {/* BRAND NAME with shimmer */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">
            Learnova
          </h1>
          <p className="text-white/50 text-sm mt-2 tracking-[0.3em] uppercase">
            Loading your experience
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-64 md:w-80">
          <div className="flex items-center justify-between mb-2 text-xs text-white/60 font-medium">
            <span>Preparing...</span>
            <span className="tabular-nums">{Math.floor(progress)}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]"></div>
            </div>
          </div>
        </div>

        {/* DOTS LOADER */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/70 animate-[bounce_1.4s_ease-in-out_infinite]"></span>
          <span
            className="w-2 h-2 rounded-full bg-white/70 animate-[bounce_1.4s_ease-in-out_infinite]"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="w-2 h-2 rounded-full bg-white/70 animate-[bounce_1.4s_ease-in-out_infinite]"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>

      {/* ============ GLOBAL KEYFRAMES ============ */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(30px, -40px) scale(1.1); }
          }
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @keyframes rise {
            0% { transform: translateY(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
