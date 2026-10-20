"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Shield, Check, Compass, Target } from "lucide-react";

export default function ManifestoSection() {
  const metrics = [
    { value: "73%", label: "Kinetic Return", desc: "Energy rebound per stride through carbon-composite propulsion" },
    { value: "0g", label: "Friction Mass", desc: "Ultrasonic welded seams eliminate drag and abrasive chafing" },
    { value: "500", label: "Genesis Spots", desc: "Strictly capped initial allocation for testing and refinement" },
    { value: "+15°", label: "Elevation Vector", desc: "Forward biomechanical bias engineered into foot-strike transition" },
  ];

  const pillars = [
    {
      index: "01",
      title: "Purposeful Engineering",
      subtitle: "Biomechanical Supremacy",
      body: "Every seam, bonded edge, and laser perforation exists to optimize forward kinetic flow, reduce drag coefficient, and dissipate heat.",
      highlight: "Validated on multi-axis force plates",
    },
    {
      index: "02",
      title: "Subtle Elevation",
      subtitle: "Editorial Luxury Silhouette",
      body: "Rejecting loud neon gimmicks in favor of oat and espresso earthen tones suitable for pre-race focus, peak competition, and post-track transition.",
      highlight: "Dawn Pacesetter Natural Palette",
    },
    {
      index: "03",
      title: "Measurable Progress",
      subtitle: "Personal Record Breakthroughs",
      body: "Gear calibrated to accompany athletes through grueling training cycles, sub-maximal threshold blocks, and definitive personal record milestones.",
      highlight: "Built for intentional athletes",
    },
  ];

  return (
    <section
      id="manifesto-section"
      className="relative py-28 md:py-36 px-4 md:px-8 bg-[#0E0C0C] text-[#FAF6F2] overflow-hidden noise-layer"
    >
      {/* Architectural Background Grid for Dark Mode */}
      <div className="absolute inset-0 architectural-grid-dark pointer-events-none opacity-40" />

      {/* Atmospheric Caustic Glow in Dark Mode */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#FF4D24]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-[#F3B39C]/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Pill Label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-10 h-[1px] bg-[#FF4D24]" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#FF4D24] uppercase font-semibold">
            THE BEYONDSTRIDE DISCIPLINE // CODE 001
          </span>
        </div>

        {/* Massive Editorial Pull-Quote with Serif Luxury Italic (BeyondStrats Style) */}
        <div className="max-w-4xl mb-20">
          <blockquote className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.15] text-[#FAF6F2]">
            &ldquo;Progress is not a sprint. It is a calculated series of{" "}
            <span className="font-display-serif italic text-[#F3B39C] font-normal underline decoration-[#FF4D24]/40 decoration-2 underline-offset-8">
              intentional strides
            </span>
            , laid with discipline, poise, and surgical precision.&rdquo;
          </blockquote>

          <p className="mt-8 text-sm md:text-base font-light text-[#A89E96] max-w-xl leading-relaxed">
            Behind every shattered baseline and personal record pulses a human commitment to deliberate forward motion. We engineer the apparatus that honors that discipline.
          </p>
        </div>

        {/* ── METRIC TILES: High-Contrast Telemetry Tiles ─────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              whileHover={{ y: -4, borderColor: "rgba(255, 77, 36, 0.5)" }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="glass-panel-dark rounded-2xl p-6 border border-white/10 relative group"
            >
              <div className="crosshair-corner top-3 right-3 text-white/20" />
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white group-hover:text-[#FF4D24] transition-colors">
                {m.value}
              </p>
              <p className="text-xs font-mono uppercase tracking-widest text-[#F3B39C] mt-2 font-semibold">
                {m.label}
              </p>
              <p className="text-[11px] text-[#A89E96] font-light mt-2 leading-relaxed">
                {m.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── THREE DISCIPLINE PILLARS: Interactive Spatial Cards ───── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="glass-panel-dark rounded-3xl p-8 border border-white/10 flex flex-col justify-between group hover:border-[#FF4D24]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-[#FF4D24] font-bold tracking-widest">
                    PHASE // {p.index}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[#A89E96] group-hover:text-white group-hover:bg-[#FF4D24]/20 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#F3B39C] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-[#A89E96] mt-1 mb-4">
                  {p.subtitle}
                </p>

                <p className="text-sm font-light text-[#A89E96] leading-relaxed">
                  {p.body}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-[#F3B39C]">
                <Check className="w-3.5 h-3.5 text-[#FF4D24]" />
                <span>{p.highlight}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
