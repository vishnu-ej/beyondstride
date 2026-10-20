"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export default function BentoShowcase() {
  const [selectedTier, setSelectedTier] = useState<"endurance" | "club" | "hybrid">("endurance");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(3);

  const telemetryData = [
    { km: "0k", force: 2.1, cadence: 174, speed: "3:30/km" },
    { km: "10k", force: 2.2, cadence: 178, speed: "3:28/km" },
    { km: "21k", force: 2.0, cadence: 182, speed: "3:25/km" },
    { km: "30k", force: 1.9, cadence: 184, speed: "3:24/km" },
    { km: "42k", force: 1.8, cadence: 188, speed: "3:20/km" },
  ];

  return (
    <section id="bento-section" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECE5DE]/70 border border-[#D5CDC4]/70 text-xs font-semibold uppercase tracking-[0.2em] text-[#786E67] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#FF4D24]" />
          <span>Biomechanical Submersion</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#181516] max-w-2xl leading-[1.1]">
            Engineered beyond the baseline.{" "}
            <span className="font-display-serif italic font-normal text-[#786E67]">
              Validated in motion.
            </span>
          </h2>
          <p className="text-sm md:text-base font-light text-[#786E67] max-w-md leading-relaxed">
            Every stitch, bonded seam, and aerated channel is subjected to multi-axis force plate testing and sub-second motion capture.
          </p>
        </div>
      </div>

      {/* Bento Grid Layout (Inspired by BeyondStrats modular spatial cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── CARD 1: Interactive Biomechanical Telemetry (7 Cols) ─────── */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="lg:col-span-7 glass-panel rounded-3xl p-7 md:p-9 relative overflow-hidden group flex flex-col justify-between"
        >
          {/* Subtle corner crosshairs */}
          <div className="crosshair-corner top-4 left-4 text-[#C8BEB5]" />
          <div className="crosshair-corner top-4 right-4 text-[#C8BEB5]" />

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#FF4D24] font-semibold">
                TELEMETRY MODULE 01 // DYNAMIC CADENCE
              </span>
              <h3 className="text-2xl font-bold text-[#181516] mt-1">
                Kinetic Load Dissipation
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#181516] text-[#FAF6F2] text-xs font-mono">
              -18.4% Impact Shock
            </span>
          </div>

          {/* Interactive Dynamic SVG Graph */}
          <div className="relative my-4 bg-white/40 p-5 rounded-2xl border border-white/60">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#786E67]">
              <span>Ground Contact Time (GCT)</span>
              <span className="text-[#181516] font-semibold">168ms (Elite Benchmark)</span>
            </div>

            {/* SVG Telemetry Curve */}
            <svg
              className="w-full h-40 overflow-visible"
              viewBox="0 0 500 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF4D24" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FF4D24" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid guide lines */}
              <line x1="0" y1="35" x2="500" y2="35" stroke="#E2DAD1" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="#E2DAD1" strokeDasharray="3 3" />
              <line x1="0" y1="115" x2="500" y2="115" stroke="#E2DAD1" strokeDasharray="3 3" />

              {/* Shaded Area Under Curve */}
              <path
                d="M 20 130 Q 120 110, 200 65 T 380 45 L 480 30 L 480 150 L 20 150 Z"
                fill="url(#curveGradient)"
              />

              {/* Main Vector Curve */}
              <path
                d="M 20 130 Q 120 110, 200 65 T 380 45 L 480 30"
                stroke="#FF4D24"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Interactive Scrub Points */}
              {telemetryData.map((d, idx) => {
                const x = 20 + idx * 115;
                const y = 130 - idx * 24;
                const isSelected = hoveredPoint === idx;

                return (
                  <g
                    key={d.km}
                    onMouseEnter={() => setHoveredPoint(idx)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 7 : 4}
                      fill={isSelected ? "#FF4D24" : "#181516"}
                      stroke="#FAF6F2"
                      strokeWidth="2"
                      className="transition-all duration-200"
                    />
                    <text
                      x={x}
                      y={145}
                      textAnchor="middle"
                      fill="#786E67"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {d.km}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hovered Point Readout Pill */}
            {hoveredPoint !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-3 flex items-center justify-between bg-white/90 px-3.5 py-2 rounded-xl text-xs font-mono border border-[#D5CDC4]/60"
              >
                <span className="text-[#786E67]">
                  Milestone: <strong className="text-[#181516]">{telemetryData[hoveredPoint].km}</strong>
                </span>
                <span className="text-[#786E67]">
                  Pace: <strong className="text-[#FF4D24]">{telemetryData[hoveredPoint].speed}</strong>
                </span>
                <span className="text-[#786E67]">
                  Cadence: <strong className="text-[#181516]">{telemetryData[hoveredPoint].cadence} SPM</strong>
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-[#786E67]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#27AE60]" />
              Multi-planar kinetic stabilization
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#27AE60]" />
              Zero lateral shear drag
            </span>
          </div>
        </motion.div>

        {/* ── CARD 2: 0g Fabric Architecture (5 Cols) ────────────────── */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="lg:col-span-5 glass-panel rounded-3xl p-7 md:p-9 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="crosshair-corner top-4 right-4 text-[#C8BEB5]" />

          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#FF4D24] font-semibold">
              MATERIAL INTELLIGENCE // 0g SYSTEM
            </span>
            <h3 className="text-2xl font-bold text-[#181516] mt-1">
              Ultralight Micro-Weave
            </h3>
            <p className="text-xs text-[#786E67] font-light mt-2 leading-relaxed">
              Proprietary yarn configuration that breathes with diaphragm expansion and wicks sweat in sub-second intervals.
            </p>
          </div>

          {/* Micro-Weave Tactile Visual Matrix */}
          <div className="my-6 p-6 rounded-2xl bg-[#181516] text-[#FAF6F2] relative overflow-hidden">
            {/* Visual weave lines pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#F3B39C]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#F3B39C]">
                  Aero-Breathe Grid
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/80">
                -2.4°C Microclimate
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#A89E96] uppercase font-mono">Tensile Strength</p>
                <p className="text-lg font-bold text-white mt-0.5">8.4 cN/dtex</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-[#A89E96] uppercase font-mono">Dry-Down Time</p>
                <p className="text-lg font-bold text-[#FF4D24] mt-0.5">3.8 mins</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#786E67] border-t border-[#DCD5CD]/70 pt-4">
            <span className="font-mono text-[11px]">WEIGHT: 68g (MEN'S M)</span>
            <span className="text-[#FF4D24] font-semibold flex items-center gap-0.5">
              Explore Specs <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </motion.div>

        {/* ── CARD 3: Genesis Batch Allocation Tracker (5 Cols) ───────── */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="lg:col-span-5 glass-panel rounded-3xl p-7 md:p-9 relative overflow-hidden group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#FF4D24] font-semibold">
                BATCH ALLOCATION // FIRST 500
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF4D24] pulse-beacon" />
            </div>
            <h3 className="text-2xl font-bold text-[#181516] mt-1">
              Genesis Cohort Reserved
            </h3>
            <p className="text-xs text-[#786E67] font-light mt-1.5">
              Select your athlete discipline to verify remaining allocation slots.
            </p>
          </div>

          {/* Interactive Tier Buttons */}
          <div className="my-5 flex flex-col gap-2">
            {[
              { id: "endurance", label: "Endurance Marathoner", spots: "18 Spots Left", pct: 96 },
              { id: "club", label: "Club & Track Athlete", spots: "42 Spots Left", pct: 88 },
              { id: "hybrid", label: "Hybrid Fitness Practitioner", spots: "28 Spots Left", pct: 92 },
            ].map((tier) => {
              const active = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id as any)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    active
                      ? "bg-[#181516] text-[#FAF6F2] border-[#181516] shadow-md"
                      : "bg-white/50 text-[#181516] border-[#D5CDC4]/60 hover:bg-white/80"
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold">{tier.label}</p>
                    <p className={`text-[10px] font-mono mt-0.5 ${active ? "text-[#F3B39C]" : "text-[#786E67]"}`}>
                      {tier.spots}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-mono font-bold ${active ? "text-white" : "text-[#181516]"}`}>
                      {tier.pct}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Allocation Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#786E67] mb-1.5">
              <span>Genesis Allocation Status</span>
              <span className="font-bold text-[#181516]">412 / 500 Claimed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#DCD5CD]/70 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "82.4%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[#FF5A36] to-[#F3B39C]"
              />
            </div>
          </div>
        </motion.div>

        {/* ── CARD 4: 48h Production & Editorial Silhouette (7 Cols) ───── */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="lg:col-span-7 glass-panel rounded-3xl p-7 md:p-9 relative overflow-hidden group flex flex-col justify-between"
        >
          <div className="crosshair-corner top-4 right-4 text-[#C8BEB5]" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#FF4D24] font-semibold">
                PRECISION LOGISTICS // 48H DISPATCH
              </span>
              <h3 className="text-2xl font-bold text-[#181516] mt-1">
                From Lab Spec to Trackside
              </h3>
            </div>
            <span className="self-start text-[11px] font-mono px-3 py-1 rounded-full bg-[#FF4D24]/10 text-[#FF4D24] border border-[#FF4D24]/30 font-semibold">
              Zero Mass Guarantee
            </span>
          </div>

          <p className="text-sm text-[#786E67] font-light my-4 leading-relaxed max-w-xl">
            Designed for the transitions between pre-race focus, peak competition, and post-session recovery. Quiet editorial luxury with world-class kinetic performance.
          </p>

          {/* Interactive Milestone Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
            {[
              { time: "00:00", step: "Biomechanical Fit", desc: "Digital sizing scan & kinetic calibration" },
              { time: "24:00", step: "Precision Assembly", desc: "Ultrasonic bonded seams & laser perforations" },
              { time: "48:00", step: "Genesis Dispatch", desc: "Priority delivery to your club or doorstep" },
            ].map((s, idx) => (
              <div key={s.time} className="p-3.5 rounded-2xl bg-white/60 border border-white/80">
                <span className="text-[10px] font-mono font-bold text-[#FF4D24]">{s.time} HR</span>
                <p className="text-xs font-semibold text-[#181516] mt-0.5">{s.step}</p>
                <p className="text-[10px] text-[#786E67] font-light mt-1 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#DCD5CD]/70 flex items-center justify-between text-xs text-[#786E67]">
            <span>Editorial Silhouette // Dawn Pacesetter</span>
            <span className="text-[#181516] font-medium font-mono">Q1 2027 DELIVERY</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
