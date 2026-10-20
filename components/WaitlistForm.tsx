"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, X, Shield, Lock } from "lucide-react";
import confetti from "canvas-confetti";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function mockApiSubmit(email: string): Promise<{ ok: boolean; ticketNumber: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 99% success rate for smooth user demo
      const randomTicket = Math.floor(Math.random() * 88) + 412;
      resolve({ ok: true, ticketNumber: randomTicket });
    }, 1100);
  });
}

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msgText, setMsgText] = useState("");
  const [ticketNo, setTicketNo] = useState<number | null>(null);
  const [shouldShake, setShouldShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidFormat = EMAIL_RE.test(email.trim());

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setMsgText("");
    if (state === "error" || state === "success") setState("idle");
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setMsgText("Please enter your athlete email address.");
      setState("error");
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
      inputRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setMsgText("Please provide a valid email format.");
      setState("error");
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
      inputRef.current?.focus();
      return;
    }

    setState("loading");
    setMsgText("");

    try {
      const res = await mockApiSubmit(trimmed);
      setTicketNo(res.ticketNumber);
      setState("success");
      setMsgText(`Priority Spot #${res.ticketNumber} locked. Welcome to the Genesis cohort.`);

      // Trigger celebratory confetti burst!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#FF4D24", "#F3B39C", "#181516", "#27AE60"],
        });
      } catch (err) {
        // ignore confetti errors
      }
    } catch {
      setMsgText("Network timeout. Please retry in a moment.");
      setState("error");
      setShouldShake(true);
      setTimeout(() => setShouldShake(false), 500);
    }
  };

  return (
    <div id="waitlist-section" className="w-full max-w-[540px]">
      <form onSubmit={handleSubmit} noValidate>
        {/* Input & Button Container */}
        <motion.div
          animate={shouldShake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`relative p-2 rounded-full glass-panel border transition-all duration-300 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-lg ${
            isFocused
              ? "border-[#FF4D24]/70 shadow-[0_10px_35px_rgba(255,77,36,0.14)]"
              : state === "error"
              ? "border-[#E74C3C]"
              : state === "success"
              ? "border-[#27AE60]"
              : "border-white/90"
          }`}
        >
          {/* Email Input Field */}
          <div className="relative flex-1 flex items-center pl-4 pr-2">
            <input
              ref={inputRef}
              type="email"
              id="emailInput"
              name="email"
              value={email}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your email for Genesis access"
              autoComplete="email"
              spellCheck={false}
              inputMode="email"
              disabled={state === "loading" || state === "success"}
              className="w-full bg-transparent text-sm md:text-base text-[#181516] placeholder:text-[#9A9086] outline-none font-normal py-3"
            />

            {/* Clear Button if text present */}
            {email && state !== "loading" && state !== "success" && (
              <button
                type="button"
                onClick={() => {
                  setEmail("");
                  setMsgText("");
                  inputRef.current?.focus();
                }}
                className="text-[#9A9086] hover:text-[#181516] p-1 rounded-full transition-colors"
                aria-label="Clear email"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Live Email Validated Micro-Pill */}
            {isValidFormat && state !== "success" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#27AE60]/10 text-[#27AE60] ml-2"
              >
                <Check className="w-3 h-3" />
                <span>Verified</span>
              </motion.span>
            )}
          </div>

          {/* Elevated Submit Button with Dual Arrow Hover */}
          <button
            type="submit"
            disabled={state === "loading" || state === "success"}
            className="btn-magnetic cursor-pointer !py-3.5 !px-6 whitespace-nowrap self-stretch sm:self-auto"
          >
            <span className="btn-magnetic-content">
              {state === "loading" ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Locking Slot...</span>
                </div>
              ) : state === "success" ? (
                <div className="flex items-center gap-1.5 text-white">
                  <Check className="w-4 h-4" />
                  <span>Access Locked</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 group/arrow">
                  <span>Claim Early Spot</span>
                  <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/arrow:translate-x-5" />
                    <ArrowRight className="w-4 h-4 absolute -translate-x-5 transition-transform duration-300 group-hover/arrow:translate-x-0" />
                  </div>
                </div>
              )}
            </span>
          </button>
        </motion.div>

        {/* Dynamic Animated Feedback Message */}
        <AnimatePresence>
          {msgText && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className={`mt-3 p-3.5 rounded-2xl text-xs font-mono flex items-center justify-between border ${
                state === "success"
                  ? "bg-[#27AE60]/10 border-[#27AE60]/30 text-[#1E8449]"
                  : "bg-[#E74C3C]/10 border-[#E74C3C]/30 text-[#C0392B]"
              }`}
            >
              <div className="flex items-center gap-2">
                {state === "success" ? (
                  <Sparkles className="w-4 h-4 text-[#27AE60] flex-shrink-0" />
                ) : (
                  <Shield className="w-4 h-4 text-[#C0392B] flex-shrink-0" />
                )}
                <span>{msgText}</span>
              </div>
              {ticketNo && (
                <span className="font-bold text-[#181516] bg-white px-2 py-0.5 rounded shadow-xs">
                  PASS #{ticketNo}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Micro Guarantee & Policy */}
        <div className="flex items-center justify-between mt-3 text-[11px] text-[#786E67] px-2 font-light">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#A89E96]" />
            Strictly limited to 500 invitations. No spam.
          </span>
          <span className="font-mono">BATCH Q1 2027</span>
        </div>
      </form>
    </div>
  );
}
