"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [timeString, setTimeString] = useState<string>("");
  const [tzString, setTzString] = useState<string>("GMT+0");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      // Determine GMT offset string e.g. GMT+5:30
      const offsetMinutes = -now.getTimezoneOffset();
      const sign = offsetMinutes >= 0 ? "+" : "-";
      const hours = Math.floor(Math.abs(offsetMinutes) / 60);
      const minutes = Math.abs(offsetMinutes) % 60;
      setTzString(`GMT${sign}${hours}${minutes ? `:${minutes}` : ""}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const formElement = document.getElementById("waitlist-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left: Brand Wordmark in Glass Pill */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="glass-pill px-4 py-2.5 rounded-full flex items-center gap-0 no-underline shadow-sm border border-white/80 transition-shadow hover:shadow-md"
          aria-label="BeyondStride Home"
        >
          <span
            className="wordmark-beyond uppercase text-[13px] tracking-[0.16em]"
            style={{ color: "var(--color-espresso)" }}
          >
            BEYOND
          </span>
          <span
            className="wordmark-stride uppercase text-[13px] tracking-[0.08em]"
            style={{ color: "var(--color-espresso)" }}
          >
            STRIDE
          </span>
        </motion.a>

        {/* Center: Live Timezone & Status Badge (BeyondStrats signature feature!) */}
        <div className="hidden lg:flex items-center gap-4 glass-pill px-5 py-2 rounded-full border border-white/80 shadow-sm text-xs text-[#786E67]">
          <div className="flex items-center gap-2 font-mono">
            <Clock className="w-3.5 h-3.5 text-[#FF4D24]" />
            <span>
              {timeString ? `${timeString} (${tzString})` : "Syncing..."}
            </span>
          </div>

          <span className="w-1 h-1 rounded-full bg-[#DCD5CD]" />

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4D24] pulse-beacon" />
            <span className="font-medium tracking-wide text-[#181516]">
              Genesis Waitlist Active
            </span>
          </div>
        </div>

        {/* Right: Quick Action & Links */}
        <div className="flex items-center gap-3">
          {/* Social / Info links */}
          <div className="hidden sm:flex items-center gap-2 glass-pill px-3 py-1.5 rounded-full border border-white/80">
            <a
              href="#bento-section"
              className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 text-[#786E67] hover:text-[#181516] transition-colors"
            >
              Telemetry
            </a>
            <a
              href="#manifesto-section"
              className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 text-[#786E67] hover:text-[#181516] transition-colors"
            >
              Discipline
            </a>
          </div>

          {/* Magnetic CTA button */}
          <motion.button
            onClick={scrollToWaitlist}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-magnetic !py-2.5 !px-5 text-xs tracking-wider"
          >
            <span className="btn-magnetic-content">
              <span>First 500 Access</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
