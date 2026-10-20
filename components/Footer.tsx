"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full px-6 md:px-12 py-8 border-t border-[#DCD5CD]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#786E67]">
      <div className="flex items-center gap-1">
        <span className="wordmark-beyond uppercase tracking-[0.16em] text-[#181516] font-light">
          BEYOND
        </span>
        <span className="wordmark-stride uppercase tracking-[0.08em] text-[#181516] font-bold">
          STRIDE
        </span>
        <span className="mx-2 text-[#C8BEB5]">•</span>
        <span>&copy; {year ?? 2026} BeyondStride. All rights reserved.</span>
      </div>

      <div>
        <a
          href="mailto:hello@beyondstride.com"
          className="hover:text-[#181516] transition-colors"
        >
          hello@beyondstride.com
        </a>
      </div>
    </footer>
  );
}
