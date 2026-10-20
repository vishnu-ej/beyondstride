"use client";

import { motion } from "framer-motion";
import React from "react";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in milliseconds
  duration?: number;
  yOffset?: number;
  style?: React.CSSProperties;
}

/** Wraps children in a motion.div that smoothly fades up when scrolled into view. */
export default function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  yOffset = 24,
  style,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
