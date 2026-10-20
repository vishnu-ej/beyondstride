"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4EFEA] text-[#181516] noise-layer selection:bg-[#F3B39C] selection:text-[#181516]">
      {/* ── Minimal Brand Top Bar ──────────────────────────── */}
      <header className="w-full px-6 md:px-12 py-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-0">
            <span className="wordmark-beyond uppercase text-sm tracking-[0.16em] text-[#181516]">
              BEYOND
            </span>
            <span className="wordmark-stride uppercase text-sm tracking-[0.08em] text-[#181516]">
              STRIDE
            </span>
          </div>
          {/* Live dot placed next to the nav bar text on the left */}
          <span className="w-2 h-2 rounded-full bg-[#FF4D24] pulse-beacon ml-1" />
        </motion.div>
      </header>

      {/* ── Centered Catchy Coming Soon Section ────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Soft atmospheric ambient glow */}
        <div
          className="absolute w-[440px] h-[440px] rounded-full bg-gradient-to-tr from-[#F3B39C]/30 via-[#FF4D24]/10 to-transparent blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Catchy Editorial Typography */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-[#181516] leading-tight select-none">
              Coming{" "}
              <span className="font-display-serif italic font-normal text-[#FF4D24]">
                Soon
              </span>
              <span className="text-[#A89E96]">...</span>
            </h1>

            {/* Subtle brand tag under the headline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="text-xs sm:text-sm font-light text-[#786E67] tracking-widest uppercase mt-4"
            >
              Beyond the baseline
            </motion.p>
          </motion.div>
        </div>
      </main>

      {/* ── Simple Minimal Footer ──────────────────────────── */}
      <Footer />
    </div>
  );
}
