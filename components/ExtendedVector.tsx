"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ExtendedVector() {
  // Mouse parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for parallax
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layer transforms with varied depth for realistic perspective
  const orb1X = useTransform(smoothX, [-1, 1], [-24, 24]);
  const orb1Y = useTransform(smoothY, [-1, 1], [-24, 24]);

  const orb2X = useTransform(smoothX, [-1, 1], [-14, 14]);
  const orb2Y = useTransform(smoothY, [-1, 1], [-14, 14]);

  const vectorParallaxX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const vectorParallaxY = useTransform(smoothY, [-1, 1], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
      const y = (e.clientY / innerHeight) * 2 - 1; // -1 to 1
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="hidden lg:flex items-center justify-center relative" aria-hidden="true">
      {/* Parallax Atmospheric Orb 1 (Top-Right) */}
      <motion.div
        className="orb"
        style={{
          width: 520,
          height: 520,
          background: "#F3B39C",
          top: -120,
          right: -160,
          opacity: 0.22,
          x: orb1X,
          y: orb1Y,
        }}
      />

      {/* Parallax Atmospheric Orb 2 (Bottom-Left) */}
      <motion.div
        className="orb"
        style={{
          width: 380,
          height: 380,
          background: "#E8C5B5",
          bottom: 80,
          left: -100,
          opacity: 0.18,
          x: orb2X,
          y: orb2Y,
        }}
      />

      <div className="relative w-full flex items-center justify-center" style={{ minHeight: 560 }}>
        {/* Outer orbital ring with subtle floating pulse */}
        <motion.div
          animate={{
            scale: [1, 1.03, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            scale: { repeat: Infinity, duration: 8, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 40, ease: "linear" },
          }}
          className="absolute rounded-full border pointer-events-none"
          style={{
            width: 420,
            height: 420,
            borderColor: "var(--color-border)",
            opacity: 0.35,
          }}
        />

        {/* Inner dashed ring rotating counter-clockwise */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
          className="absolute rounded-full border pointer-events-none"
          style={{
            width: 300,
            height: 300,
            borderColor: "var(--color-blush)",
            opacity: 0.25,
            borderStyle: "dashed",
          }}
        />

        {/* Extended Vector SVG with floating spring physics and mouse parallax */}
        <motion.div
          style={{ x: vectorParallaxX, y: vectorParallaxY }}
          animate={{ y: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          whileHover={{ scale: 1.04 }}
          className="vector-glow relative z-10 cursor-pointer"
        >
          <svg
            width="260"
            height="340"
            viewBox="0 0 260 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft backdrop radial glow circle */}
            <circle cx="130" cy="170" r="120" fill="rgba(243,179,156,0.08)" />

            {/* Baseline diagonal reference trajectory */}
            <line
              x1="60"
              y1="310"
              x2="200"
              y2="30"
              stroke="#D9D2CB"
              strokeWidth="1"
              strokeDasharray="4 6"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Ascending 'B' Glyph rotated at -15 deg */}
            <g transform="rotate(-15, 130, 170)">
              {/* Primary spine */}
              <motion.rect
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                x="112"
                y="60"
                width="8"
                height="200"
                rx="4"
                fill="var(--color-espresso)"
                opacity="0.9"
              />

              {/* Upper aerodynamic lobe */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                d="M120 60 C170 60, 195 85, 195 115 C195 145, 170 165, 120 165"
                stroke="var(--color-espresso)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Lower power drive lobe */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
                d="M120 165 C185 165, 215 192, 215 225 C215 258, 185 275, 120 275"
                stroke="var(--color-espresso)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Trajectory vector arrow at glyph crest */}
              <g transform="translate(200, 50)">
                <line
                  x1="0"
                  y1="12"
                  x2="24"
                  y2="0"
                  stroke="var(--color-blush)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="12"
                  y1="0"
                  x2="24"
                  y2="0"
                  stroke="var(--color-blush)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="24"
                  y1="0"
                  x2="24"
                  y2="12"
                  stroke="var(--color-blush)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            </g>

            {/* Kinetic speed line path with path animation */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              d="M30 295 L100 275 L160 240 L220 150"
              stroke="var(--color-blush)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="3 5"
            />

            {/* Waypoint nodes */}
            <circle cx="220" cy="148" r="4" fill="var(--color-blush)" opacity="0.85" />
            <circle cx="30" cy="296" r="3" fill="var(--color-border)" opacity="0.9" />
            <circle cx="130" cy="55" r="2.5" fill="var(--color-espresso)" opacity="0.4" />

            {/* Engineering coordinate reticle */}
            <g transform="translate(32, 55)" opacity="0.4">
              <line
                x1="10"
                y1="0"
                x2="10"
                y2="20"
                stroke="var(--color-espresso)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="10"
                x2="20"
                y2="10"
                stroke="var(--color-espresso)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <circle cx="10" cy="10" r="5" stroke="var(--color-espresso)" strokeWidth="1" fill="none" />
            </g>

            {/* Angle annotation */}
            <text
              x="192"
              y="320"
              fill="var(--color-muted)"
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="10"
              letterSpacing="2"
              opacity="0.6"
            >
              +15°
            </text>
          </svg>
        </motion.div>

        {/* Orbit pulse beacon dot */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute rounded-full"
          style={{
            width: 10,
            height: 10,
            background: "var(--color-blush)",
            top: "20%",
            right: "18%",
            boxShadow: "0 0 0 6px rgba(243,179,156,0.25)",
          }}
        />

        {/* Concept label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
        >
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "var(--color-muted)",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            The Extended Vector — Concept 01
          </p>
        </motion.div>
      </div>
    </div>
  );
}
