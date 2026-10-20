"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Activity, Wind, Compass, Sparkles } from "lucide-react";

export default function Interactive3DHeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<"biomech" | "aero">("biomech");

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 140, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);

  // Parallax shifts for floating chips
  const chip1Z = useSpring(useTransform(mouseX, [-0.5, 0.5], [60, 75]), springConfig);
  const chip2Z = useSpring(useTransform(mouseY, [-0.5, 0.5], [50, 70]), springConfig);

  // Specular reflection position
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["20%", "80%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["20%", "80%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="perspective-1400 w-full flex items-center justify-center py-6 select-none">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-[520px] aspect-[4/4.8] rounded-2xl glass-panel p-7 flex flex-col justify-between group cursor-grab active:cursor-grabbing transition-shadow duration-500 shadow-2xl hover:shadow-[0_30px_70px_rgba(255,90,36,0.14)]"
      >
        {/* Dynamic Specular Gloss Shine following cursor */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [shineX, shineY],
              ([x, y]) =>
                `radial-gradient(circle 320px at ${x} ${y}, rgba(255, 255, 255, 0.5), transparent 70%)`
            ),
          }}
        />

        {/* Architectural Crosshair Corners */}
        <div className="crosshair-corner top-3 left-3 text-[#A89E96]" />
        <div className="crosshair-corner top-3 right-3 text-[#A89E96]" />
        <div className="crosshair-corner bottom-3 left-3 text-[#A89E96]" />
        <div className="crosshair-corner bottom-3 right-3 text-[#A89E96]" />

        {/* ── CARD HEADER: Telemetry & Mode Switcher ─────────────── */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="relative z-20 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D24] pulse-beacon" />
            <span className="text-[10px] tracking-[0.2em] font-semibold uppercase text-[#786E67]">
              Spatial Kinetic Core // V4.2
            </span>
          </div>

          {/* Interactive Mode Pills */}
          <div className="flex items-center gap-1 bg-[#ECE5DE]/70 p-1 rounded-full border border-[#D5CDC4]/60">
            <button
              onClick={() => setActiveMode("biomech")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all ${
                activeMode === "biomech"
                  ? "bg-[#181516] text-[#FAF6F2] shadow-sm"
                  : "text-[#786E67] hover:text-[#181516]"
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>Biotech</span>
            </button>
            <button
              onClick={() => setActiveMode("aero")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all ${
                activeMode === "aero"
                  ? "bg-[#181516] text-[#FAF6F2] shadow-sm"
                  : "text-[#786E67] hover:text-[#181516]"
              }`}
            >
              <Wind className="w-3 h-3" />
              <span>Aero</span>
            </button>
          </div>
        </div>

        {/* ── CARD CENTER: 3D Multi-Layer Spatial Core ──────────── */}
        <div className="relative flex-1 flex items-center justify-center my-4 preserve-3d">
          {/* Deep Layer -40px: Orbital Rotating Caustic Rings */}
          <motion.div
            style={{ transform: "translateZ(-40px)" }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
            className="absolute w-72 h-72 rounded-full border border-dashed border-[#F3B39C]/40 pointer-events-none"
          />
          <motion.div
            style={{ transform: "translateZ(-20px)" }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 44, ease: "linear" }}
            className="absolute w-88 h-88 rounded-full border border-[#DCD5CD]/50 pointer-events-none"
          />

          {/* Atmospheric ambient glow sphere */}
          <div
            style={{ transform: "translateZ(-15px)" }}
            className="absolute w-60 h-60 rounded-full bg-gradient-to-tr from-[#F3B39C]/30 via-[#FF5A36]/15 to-transparent blur-3xl pointer-events-none"
          />

          {/* Mid Layer +35px: Iconic Aerodynamic BeyondStride Glyph */}
          <motion.div
            style={{ transform: "translateZ(35px)" }}
            animate={{ y: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            className="relative z-10 drop-shadow-[0_15px_30px_rgba(243,179,156,0.35)]"
          >
            <svg
              width="230"
              height="280"
              viewBox="0 0 260 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Reference grid trajectory */}
              <line
                x1="50"
                y1="310"
                x2="210"
                y2="30"
                stroke="#C8BEB5"
                strokeWidth="1.2"
                strokeDasharray="4 6"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Rotated 'B' Monogram at -15° */}
              <g transform="rotate(-15, 130, 170)">
                {/* Structural Spine */}
                <rect
                  x="110"
                  y="55"
                  width="10"
                  height="210"
                  rx="5"
                  fill="#181516"
                  opacity="0.95"
                />

                {/* Upper Kinetic Lobe */}
                <path
                  d="M120 55 C175 55, 200 82, 200 115 C200 148, 175 168, 120 168"
                  stroke="#181516"
                  strokeWidth="9"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Lower Power Lobe */}
                <path
                  d="M120 168 C190 168, 222 195, 222 230 C222 265, 190 280, 120 280"
                  stroke="#181516"
                  strokeWidth="9"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Crest Vector Indicator */}
                <g transform="translate(208, 45)">
                  <line x1="0" y1="14" x2="26" y2="0" stroke="#FF4D24" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="14" y1="0" x2="26" y2="0" stroke="#FF4D24" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="26" y1="0" x2="26" y2="14" stroke="#FF4D24" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              </g>

              {/* Animated stream / energy curve */}
              {activeMode === "biomech" ? (
                <path
                  d="M25 295 Q100 280 150 230 T225 140"
                  stroke="#FF4D24"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4 6"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              ) : (
                <path
                  d="M20 250 C90 270, 150 210, 230 110"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="3 5"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              )}

              {/* Angle Readout */}
              <text
                x="184"
                y="324"
                fill="#786E67"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                fontSize="11"
                fontWeight="600"
                letterSpacing="2"
              >
                +15.0°
              </text>
            </svg>
          </motion.div>

          {/* ── FOREGROUND SPATIAL CHIPS (High Z Parallax) ────────── */}
          {/* Top-Right Floating Chip: Kinetic Return */}
          <motion.div
            style={{ transform: "translateZ(75px)" }}
            whileHover={{ scale: 1.05 }}
            className="absolute -top-1 -right-2 glass-pill px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2.5 border border-white/90"
          >
            <div className="w-5 h-5 rounded-full bg-[#FF4D24]/15 flex items-center justify-center text-[#FF4D24]">
              <Sparkles className="w-3 h-3" />
            </div>
            <div>
              <p className="text-[9px] tracking-wider font-semibold text-[#786E67] uppercase">
                Kinetic Energy Return
              </p>
              <p className="text-xs font-bold text-[#181516] flex items-center gap-1">
                73.4% <span className="text-[10px] text-[#27AE60] font-normal">↑ +14%</span>
              </p>
            </div>
          </motion.div>

          {/* Bottom-Left Floating Chip: Unnecessary Mass */}
          <motion.div
            style={{ transform: "translateZ(65px)" }}
            whileHover={{ scale: 1.05 }}
            className="absolute -bottom-2 -left-3 glass-pill px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2.5 border border-white/90"
          >
            <div className="w-5 h-5 rounded-full bg-[#181516] flex items-center justify-center text-[#FAF6F2]">
              <Compass className="w-3 h-3" />
            </div>
            <div>
              <p className="text-[9px] tracking-wider font-semibold text-[#786E67] uppercase">
                Deadweight Friction
              </p>
              <p className="text-xs font-bold text-[#181516]">
                0.00g <span className="text-[10px] text-[#786E67] font-normal">Pure Kinetic</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── CARD FOOTER: Architectural Telemetry Bar ───────────── */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="relative z-20 pt-4 border-t border-[#DCD5CD]/70 flex items-center justify-between text-[11px] text-[#786E67]"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-wider bg-white/70 px-2 py-0.5 rounded border border-[#D5CDC4]/60">
              CADENCE: 182 SPM
            </span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-wider">
              DRAG: 0.18 Cd
            </span>
          </div>

          <p className="text-[10px] tracking-[0.16em] uppercase font-medium">
            3D Spatial Sensor Active
          </p>
        </div>
      </motion.div>
    </div>
  );
}
