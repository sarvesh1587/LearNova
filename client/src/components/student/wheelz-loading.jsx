/**
 * ═══════════════════════════════════════════════════════════════
 *  WHEELZ — Premium Loading Screen (FINAL)
 *  Realistic animated vehicles + detailed alloy wheel
 *  Tech: React 18 + Tailwind CSS v4 + Pure CSS Keyframes
 * ═══════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from "react";

export default function WheelzLoading() {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const statusMessages = [
    "Warming up engines...",
    "Checking fleet availability...",
    "Mapping your route...",
    "Preparing your ride...",
    "Almost there...",
  ];

  useEffect(() => {
    setMounted(true);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 30 ? 3 : prev < 70 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#05050a] flex items-center justify-center">
      {/* ═══ SKY / ATMOSPHERE ═══ */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #2a1810 0%, #0f0805 40%, #05050a 80%)",
        }}
      />

      {/* ═══ STARFIELD ═══ */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-white"
            style={{
              top: `${Math.random() * 60}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${
                2 + Math.random() * 3
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ═══ DISTANT CITY LIGHTS ═══ */}
      <div className="absolute w-full" style={{ top: "55%", height: "10%" }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${i * 3.5}%`,
              bottom: "0",
              width: `${2 + Math.random() * 3}px`,
              height: `${4 + Math.random() * 12}px`,
              background:
                Math.random() > 0.5
                  ? "rgba(245,158,11,0.6)"
                  : "rgba(251,191,36,0.4)",
              boxShadow: "0 0 6px rgba(245,158,11,0.6)",
              animation: `cityFlicker ${
                2 + Math.random() * 4
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ═══ ROAD / HIGHWAY ═══ */}
      <div className="absolute bottom-0 left-0 w-full h-[45%]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #1a1a1f 0%, #0f0f14 40%, #05050a 100%)",
          }}
        />

        {/* Road edge line (top) */}
        <div
          className="absolute top-[15%] w-full h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.5) 80%, transparent)",
          }}
        />

        {/* Center dashed line (moving) */}
        <div
          className="absolute top-1/2 w-full h-[4px] -translate-y-1/2"
          style={{
            background:
              "repeating-linear-gradient(90deg, #fbbf24 0px, #fbbf24 80px, transparent 80px, transparent 160px)",
            animation: "roadMove 0.8s linear infinite",
            filter: "drop-shadow(0 0 12px rgba(245,158,11,0.9))",
            opacity: 0.9,
          }}
        />

        {/* Road edge line (bottom) */}
        <div
          className="absolute bottom-[10%] w-full h-[3px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 20%, rgba(255,255,255,0.4) 80%, transparent)",
          }}
        />

        {/* Ambient light reflections */}
        <div
          className="absolute top-[20%] left-1/4 w-[200px] h-[60px] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.4), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div
          className="absolute top-[30%] right-1/4 w-[180px] h-[50px] opacity-15"
          style={{
            background:
              "radial-gradient(ellipse, rgba(251,191,36,0.4), transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      </div>

      {/* ═══ VEHICLE 1 — SPORTS CAR (going right) ═══ */}
      <div
        className="absolute"
        style={{
          bottom: "8%",
          animation: "driveRight 8s linear infinite",
        }}
      >
        <SportsCar />
      </div>

      {/* ═══ VEHICLE 2 — MOTORCYCLE (going left) ═══ */}
      <div
        className="absolute"
        style={{
          bottom: "20%",
          animation: "driveLeft 7s linear infinite",
          animationDelay: "2s",
        }}
      >
        <Motorcycle />
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center px-6 text-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* ─── REALISTIC WHEEL ─── */}
        <div className="relative mb-10 w-[220px] h-[220px]">
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.8), transparent 70%)",
            }}
          />
          <DetailedWheel />
        </div>

        {/* ─── BRAND ─── */}
        <h1
          className="text-6xl md:text-8xl font-black tracking-tighter mb-3"
          style={{
            background:
              "linear-gradient(90deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #f59e0b 75%, #fbbf24 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s linear infinite",
            filter: "drop-shadow(0 4px 30px rgba(245,158,11,0.6))",
            letterSpacing: "-0.04em",
          }}
        >
          WHEELZ
        </h1>

        <p className="text-xs md:text-sm text-amber-200/60 tracking-[0.4em] uppercase mb-12 font-medium">
          Premium Vehicle Rental
        </p>

        {/* ─── PROGRESS BAR ─── */}
        <div className="w-[280px] md:w-[380px] mb-4">
          <div
            className="relative h-[6px] rounded-full overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.08)",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #d97706, #f59e0b, #fbbf24)",
                boxShadow: "0 0 20px rgba(245,158,11,0.8)",
              }}
            />
            <div
              className="absolute top-0 left-0 h-full w-20 rounded-full opacity-60"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                animation: "progressShimmer 1.8s ease-in-out infinite",
              }}
            />
          </div>

          <div className="flex items-center justify-between mt-3">
            <span
              className="text-xs font-semibold tracking-wider"
              style={{ color: "#f59e0b" }}
            >
              {statusMessages[statusIndex]}
            </span>
            <span
              className="text-sm font-bold tabular-nums"
              style={{
                color: "#fbbf24",
                textShadow: "0 0 20px rgba(245,158,11,0.6)",
              }}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* ═══ VIGNETTE ═══ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      {/* ═══ CORNER ACCENTS ═══ */}
      {[
        "top-6 left-6 border-t border-l rounded-tl-lg",
        "top-6 right-6 border-t border-r rounded-tr-lg",
        "bottom-6 left-6 border-b border-l rounded-bl-lg",
        "bottom-6 right-6 border-b border-r rounded-br-lg",
      ].map((c, i) => (
        <div
          key={i}
          className={`absolute w-12 h-12 border-amber-500/50 ${c}`}
        />
      ))}

      {/* ═══ KEYFRAMES ═══ */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
        @keyframes progressShimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }
        @keyframes roadMove { 0% { background-position: 0 0; } 100% { background-position: -160px 0; } }
        @keyframes driveRight { 0% { left: -320px; } 100% { left: calc(100% + 60px); } }
        @keyframes driveLeft { 0% { right: -260px; } 100% { right: calc(100% + 60px); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.9; } }
        @keyframes cityFlicker { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes suspension { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes exhaust {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translate(-40px, -30px) scale(2); opacity: 0; }
        }
        @keyframes headlightFlicker {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DETAILED WHEEL — Realistic alloy with brake disc & caliper
   ═══════════════════════════════════════════════════════════════ */
function DetailedWheel() {
  return (
    <svg
      viewBox="0 0 220 220"
      className="absolute inset-0 w-full h-full"
      style={{ animation: "spin 2.5s linear infinite" }}
    >
      <defs>
        <radialGradient id="tireGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="75%" stopColor="#0a0a0a" />
          <stop offset="88%" stopColor="#1c1c1c" />
          <stop offset="96%" stopColor="#151515" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>

        <radialGradient id="tireHighlight" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#1a1a1a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="rimMetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="25%" stopColor="#c0c0c0" />
          <stop offset="50%" stopColor="#e8e8e8" />
          <stop offset="75%" stopColor="#909090" />
          <stop offset="100%" stopColor="#b8b8b8" />
        </linearGradient>

        <linearGradient id="spokeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0e0e0" />
          <stop offset="50%" stopColor="#a8a8a8" />
          <stop offset="100%" stopColor="#606060" />
        </linearGradient>

        <linearGradient id="chromeLip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#d0d0d0" />
          <stop offset="100%" stopColor="#808080" />
        </linearGradient>

        <radialGradient id="brakeDisc" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#707070" />
          <stop offset="60%" stopColor="#505050" />
          <stop offset="100%" stopColor="#303030" />
        </radialGradient>

        <radialGradient id="hubCap" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>

        <linearGradient id="caliperGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>

        <filter id="wheelGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer tire */}
      <circle cx="110" cy="110" r="105" fill="url(#tireGrad)" />
      <circle cx="110" cy="110" r="105" fill="url(#tireHighlight)" />

      {/* Tire tread */}
      {[...Array(48)].map((_, i) => {
        const angle = i * 7.5;
        return (
          <g key={i} transform={`rotate(${angle} 110 110)`}>
            <rect
              x="106"
              y="4"
              width="8"
              height="18"
              rx="1"
              fill="#000000"
              opacity="0.95"
            />
            <rect
              x="108"
              y="10"
              width="4"
              height="10"
              fill="#1a1a1a"
              opacity="0.6"
            />
          </g>
        );
      })}

      {/* Tire sidewall ridges */}
      {[...Array(36)].map((_, i) => {
        const angle = i * 10;
        return (
          <line
            key={i}
            x1="110"
            y1="22"
            x2="110"
            y2="32"
            stroke="#1f1f1f"
            strokeWidth="1"
            opacity="0.7"
            transform={`rotate(${angle} 110 110)`}
          />
        );
      })}

      <circle
        cx="110"
        cy="110"
        r="95"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1"
      />
      <circle
        cx="110"
        cy="110"
        r="85"
        fill="none"
        stroke="#222222"
        strokeWidth="0.8"
      />

      {/* Chrome rim lip */}
      <circle
        cx="110"
        cy="110"
        r="80"
        fill="none"
        stroke="url(#chromeLip)"
        strokeWidth="4"
      />

      {/* Brake disc */}
      <circle cx="110" cy="110" r="72" fill="url(#brakeDisc)" />

      {/* Brake disc drilled holes */}
      {[...Array(20)].map((_, i) => {
        const angle = i * 18;
        const rad = (angle * Math.PI) / 180;
        const x = 110 + 55 * Math.cos(rad);
        const y = 110 + 55 * Math.sin(rad);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2.5"
            fill="#1a1a1a"
            stroke="#404040"
            strokeWidth="0.5"
          />
        );
      })}

      <circle
        cx="110"
        cy="110"
        r="55"
        fill="none"
        stroke="#202020"
        strokeWidth="1"
      />
      <circle
        cx="110"
        cy="110"
        r="35"
        fill="none"
        stroke="#202020"
        strokeWidth="1"
      />

      {/* Brake disc wear marks */}
      {[...Array(24)].map((_, i) => {
        const angle = i * 15;
        return (
          <line
            key={i}
            x1="110"
            y1="45"
            x2="110"
            y2="70"
            stroke="#606060"
            strokeWidth="0.4"
            opacity="0.4"
            transform={`rotate(${angle} 110 110)`}
          />
        );
      })}

      {/* Brake caliper */}
      <g transform="translate(110 110) rotate(-30) translate(0 -48)">
        <rect
          x="-14"
          y="-14"
          width="28"
          height="28"
          rx="4"
          fill="url(#caliperGrad)"
          stroke="#7f1d1d"
          strokeWidth="1"
        />
        <rect
          x="-11"
          y="-11"
          width="22"
          height="6"
          rx="2"
          fill="#f87171"
          opacity="0.5"
        />
        <line x1="-10" y1="4" x2="10" y2="4" stroke="#450a0a" strokeWidth="1" />
        <line x1="-10" y1="8" x2="10" y2="8" stroke="#450a0a" strokeWidth="1" />
      </g>

      {/* Rim ring */}
      <circle
        cx="110"
        cy="110"
        r="68"
        fill="none"
        stroke="url(#rimMetal)"
        strokeWidth="8"
      />
      <circle
        cx="110"
        cy="110"
        r="62"
        fill="none"
        stroke="#4a4a4a"
        strokeWidth="1"
      />

      {/* 5 Spokes */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 110 110)`}>
          <path
            d="M 110 48 L 98 100 L 122 100 Z"
            fill="#404040"
            opacity="0.6"
            transform="translate(2 2)"
          />
          <path
            d="M 110 48 Q 104 55 100 90 L 98 100 L 122 100 L 120 90 Q 116 55 110 48 Z"
            fill="url(#spokeGrad)"
            stroke="#505050"
            strokeWidth="0.8"
          />
          <path
            d="M 110 52 L 108 95 L 112 95 Z"
            fill="#ffffff"
            opacity="0.35"
          />
          <path
            d="M 110 48 L 104 60 L 106 80"
            stroke="#ffffff"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </g>
      ))}

      {/* Lug nuts */}
      {[36, 108, 180, 252, 324].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 110 110)`}>
          <circle
            cx="110"
            cy="58"
            r="6"
            fill="#606060"
            stroke="#303030"
            strokeWidth="1"
          />
          <circle cx="110" cy="56" r="3.5" fill="#a0a0a0" />
          <circle cx="110" cy="56" r="1.5" fill="#202020" />
        </g>
      ))}

      {/* Center hub cap */}
      <circle cx="110" cy="110" r="24" fill="#303030" />
      <circle
        cx="110"
        cy="110"
        r="24"
        fill="none"
        stroke="#606060"
        strokeWidth="1"
      />
      <circle cx="110" cy="110" r="20" fill="url(#hubCap)" />
      <circle
        cx="110"
        cy="110"
        r="15"
        fill="none"
        stroke="#78350f"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* W logo */}
      <path
        d="M 103 104 L 106 113 L 110 106 L 114 113 L 117 104"
        stroke="#78350f"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <ellipse cx="104" cy="104" rx="8" ry="6" fill="#fef3c7" opacity="0.35" />

      {/* Top-left highlight */}
      <ellipse
        cx="75"
        cy="65"
        rx="45"
        ry="30"
        fill="white"
        opacity="0.06"
        transform="rotate(-30 75 65)"
      />

      {/* Bottom-right shadow */}
      <ellipse
        cx="150"
        cy="160"
        rx="50"
        ry="35"
        fill="black"
        opacity="0.15"
        transform="rotate(-30 150 160)"
      />

      {/* Motion blur ring */}
      <circle
        cx="110"
        cy="110"
        r="103"
        fill="none"
        stroke="rgba(245,158,11,0.15)"
        strokeWidth="6"
        strokeDasharray="10 20 30 15"
        filter="url(#wheelGlow)"
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SPORTS CAR
   ═══════════════════════════════════════════════════════════════ */
function SportsCar() {
  return (
    <div
      style={{
        width: "300px",
        height: "100px",
        animation: "suspension 0.6s ease-in-out infinite",
        position: "relative",
      }}
    >
      <svg viewBox="0 0 300 100" className="w-full h-full">
        <defs>
          <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c0392b" />
            <stop offset="50%" stopColor="#a02020" />
            <stop offset="100%" stopColor="#5a0f0f" />
          </linearGradient>
          <linearGradient id="carRoof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e74c3c" />
            <stop offset="100%" stopColor="#8b1818" />
          </linearGradient>
          <linearGradient id="window" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0a0a1a" />
          </linearGradient>
          <linearGradient id="headlightBeam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bodyReflect" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <ellipse cx="150" cy="88" rx="130" ry="6" fill="#000" opacity="0.7" />

        <path
          d="M 275 55 L 320 45 L 320 70 Z"
          fill="url(#headlightBeam)"
          style={{ animation: "headlightFlicker 2s ease-in-out infinite" }}
        />

        <path
          d="M 15 75 Q 15 68 25 66 L 55 62 L 80 42 Q 88 36 100 36 L 210 36 Q 222 36 228 44 L 245 62 L 275 66 Q 288 68 288 76 L 288 82 Q 288 86 282 86 L 20 86 Q 15 86 15 80 Z"
          fill="url(#carBody)"
          stroke="#2a0a0a"
          strokeWidth="1"
        />

        <path
          d="M 82 44 Q 90 36 102 36 L 208 36 Q 220 36 226 42 L 240 58 L 90 58 Z"
          fill="url(#carRoof)"
          stroke="#2a0a0a"
          strokeWidth="1"
        />

        <path
          d="M 88 54 L 100 40 L 135 40 L 135 54 Z"
          fill="url(#window)"
          stroke="#0a0a1a"
          strokeWidth="1"
        />
        <path
          d="M 92 52 L 100 42 L 115 42 L 115 52 Z"
          fill="white"
          opacity="0.15"
        />

        <path
          d="M 140 40 L 200 40 L 200 54 L 140 54 Z"
          fill="url(#window)"
          stroke="#0a0a1a"
          strokeWidth="1"
        />
        <path
          d="M 145 42 L 165 42 L 165 52 L 145 52 Z"
          fill="white"
          opacity="0.1"
        />

        <path
          d="M 205 40 L 220 40 Q 224 42 226 46 L 232 56 L 205 56 Z"
          fill="url(#window)"
          stroke="#0a0a1a"
          strokeWidth="1"
        />

        <line
          x1="160"
          y1="40"
          x2="160"
          y2="80"
          stroke="#2a0a0a"
          strokeWidth="1.5"
        />
        <rect x="165" y="60" width="12" height="3" rx="1.5" fill="#404040" />

        <path
          d="M 20 70 L 280 70 L 280 74 Q 150 78 20 74 Z"
          fill="url(#bodyReflect)"
        />

        <rect
          x="275"
          y="70"
          width="10"
          height="12"
          rx="2"
          fill="#1a1a1a"
          stroke="#404040"
          strokeWidth="0.5"
        />

        <rect x="272" y="60" width="14" height="8" rx="1" fill="#0a0a0a" />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={274 + i * 3}
            y1="61"
            x2={274 + i * 3}
            y2="67"
            stroke="#333"
            strokeWidth="0.8"
          />
        ))}

        <ellipse
          cx="278"
          cy="52"
          rx="6"
          ry="4"
          fill="#fbbf24"
          stroke="#78350f"
          strokeWidth="0.5"
          style={{ animation: "headlightFlicker 2s ease-in-out infinite" }}
        />
        <ellipse cx="278" cy="52" rx="3" ry="2" fill="#fef3c7" />

        <ellipse cx="16" cy="55" rx="3" ry="4" fill="#dc2626" />
        <ellipse cx="16" cy="55" rx="1.5" ry="2" fill="#f87171" />

        <Wheel cx="70" cy="80" />
        <Wheel cx="235" cy="80" />

        <circle
          cx="12"
          cy="78"
          r="3"
          fill="#666"
          opacity="0"
          style={{
            animation: "exhaust 1.5s ease-out infinite",
            animationDelay: "0s",
          }}
        />
        <circle
          cx="12"
          cy="78"
          r="3"
          fill="#666"
          opacity="0"
          style={{
            animation: "exhaust 1.5s ease-out infinite",
            animationDelay: "0.5s",
          }}
        />
        <circle
          cx="12"
          cy="78"
          r="3"
          fill="#666"
          opacity="0"
          style={{
            animation: "exhaust 1.5s ease-out infinite",
            animationDelay: "1s",
          }}
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MOTORCYCLE
   ═══════════════════════════════════════════════════════════════ */
function Motorcycle() {
  return (
    <div
      style={{
        width: "180px",
        height: "110px",
        animation: "suspension 0.4s ease-in-out infinite",
        position: "relative",
        transform: "scaleX(-1)",
      }}
    >
      <svg viewBox="0 0 180 110" className="w-full h-full">
        <defs>
          <linearGradient id="bikeBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e67e22" />
            <stop offset="100%" stopColor="#a04000" />
          </linearGradient>
          <linearGradient id="riderBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <linearGradient id="helmet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c3e50" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          <linearGradient id="bikeBeam" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
        </defs>

        <ellipse cx="90" cy="98" rx="70" ry="4" fill="#000" opacity="0.7" />

        <path d="M 175 45 L 200 30 L 200 60 Z" fill="url(#bikeBeam)" />

        <Wheel cx="35" cy="88" r="14" />
        <Wheel cx="150" cy="88" r="14" />

        <line
          x1="35"
          y1="88"
          x2="65"
          y2="70"
          stroke="#2a2a2a"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M 35 88 L 65 68 L 100 60 L 130 65 L 150 88"
          stroke="#2a2a2a"
          strokeWidth="3"
          fill="none"
        />

        <rect
          x="65"
          y="65"
          width="35"
          height="22"
          rx="3"
          fill="#1a1a1a"
          stroke="#333"
          strokeWidth="1"
        />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="68"
            y1={70 + i * 4}
            x2="97"
            y2={70 + i * 4}
            stroke="#404040"
            strokeWidth="0.8"
          />
        ))}

        <path
          d="M 68 60 Q 75 50 100 50 L 120 52 Q 125 55 125 60 L 100 65 Z"
          fill="url(#bikeBody)"
          stroke="#5a2000"
          strokeWidth="1"
        />
        <path
          d="M 75 55 Q 85 52 100 52 L 110 53"
          stroke="white"
          strokeWidth="1"
          opacity="0.3"
          fill="none"
        />

        <path
          d="M 55 62 Q 60 58 70 58 L 90 58 L 95 60 Q 92 64 85 64 L 60 64 Q 56 64 55 62 Z"
          fill="#0a0a0a"
          stroke="#333"
          strokeWidth="0.5"
        />

        <line
          x1="120"
          y1="55"
          x2="135"
          y2="42"
          stroke="#2a2a2a"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="135" cy="42" r="2" fill="#555" />

        <line
          x1="130"
          y1="55"
          x2="150"
          y2="88"
          stroke="#404040"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <path
          d="M 125 50 L 135 40 L 138 42 L 130 52 Z"
          fill="#1a1a2e"
          opacity="0.8"
          stroke="#333"
          strokeWidth="0.5"
        />

        <circle
          cx="140"
          cy="50"
          r="6"
          fill="#fbbf24"
          stroke="#78350f"
          strokeWidth="1"
          style={{ animation: "headlightFlicker 2s ease-in-out infinite" }}
        />
        <circle cx="140" cy="50" r="3" fill="#fef3c7" />

        <path
          d="M 65 82 Q 55 85 45 82 L 30 78"
          stroke="#666"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M 75 55 Q 85 35 105 35 L 115 38 Q 118 42 115 48 L 100 55 Z"
          fill="url(#riderBody)"
          stroke="#0a0a0a"
          strokeWidth="1"
        />
        <path
          d="M 85 55 L 80 70 L 90 78 L 95 75 L 88 60 Z"
          fill="#0a0a0a"
          stroke="#1a1a1a"
          strokeWidth="0.5"
        />
        <path
          d="M 108 42 L 125 45 L 130 42"
          stroke="#0a0a0a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="115" cy="32" rx="9" ry="10" fill="url(#helmet)" />
        <path
          d="M 118 28 Q 124 30 123 35 L 118 36 Z"
          fill="#1a1a2e"
          stroke="#000"
          strokeWidth="0.5"
        />
        <ellipse cx="112" cy="28" rx="4" ry="3" fill="white" opacity="0.15" />

        <circle
          cx="28"
          cy="78"
          r="2.5"
          fill="#666"
          opacity="0"
          style={{ animation: "exhaust 1.2s ease-out infinite" }}
        />
        <circle
          cx="28"
          cy="78"
          r="2.5"
          fill="#666"
          opacity="0"
          style={{
            animation: "exhaust 1.2s ease-out infinite",
            animationDelay: "0.6s",
          }}
        />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WHEEL COMPONENT — small wheels for vehicles
   ═══════════════════════════════════════════════════════════════ */
function Wheel({ cx, cy, r = 16 }) {
  return (
    <g
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        animation: "spin 0.6s linear infinite",
      }}
    >
      <circle cx={cx} cy={cy} r={r} fill="#0a0a0a" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1"
      />

      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = cx + (r - 1) * Math.cos(angle);
        const y1 = cy + (r - 1) * Math.sin(angle);
        const x2 = cx + (r - 3) * Math.cos(angle);
        const y2 = cy + (r - 3) * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#000"
            strokeWidth="1"
          />
        );
      })}

      <circle cx={cx} cy={cy} r={r * 0.7} fill="#a0a0a0" />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.7}
        fill="none"
        stroke="#505050"
        strokeWidth="0.5"
      />

      <circle cx={cx} cy={cy} r={r * 0.55} fill="#404040" />

      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={cx + r * 0.15 * Math.cos(rad)}
            y1={cy + r * 0.15 * Math.sin(rad)}
            x2={cx + r * 0.65 * Math.cos(rad)}
            y2={cy + r * 0.65 * Math.sin(rad)}
            stroke="#d0d0d0"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}

      <circle cx={cx} cy={cy} r={r * 0.18} fill="#fbbf24" />
      <circle cx={cx} cy={cy} r={r * 0.08} fill="#0a0a0a" />
    </g>
  );
}
