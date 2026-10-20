"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrivacyModal() {
  const [open, setOpen] = useState(false);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const openModal = useCallback(() => {
    lastFocusRef.current = document.activeElement as HTMLElement;
    setOpen(true);
    setTimeout(() => closeRef.current?.focus(), 50);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
    lastFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) closeModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeModal]);

  return (
    <>
      {/* Trigger */}
      <motion.button
        id="privacyTrigger"
        className="footer-link font-medium cursor-pointer"
        onClick={openModal}
        aria-haspopup="dialog"
        aria-expanded={open}
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        Privacy Policy
      </motion.button>

      {/* Animated Modal Dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.12 }}
              className="modal-card"
            >
              <div className="flex items-start justify-between mb-5">
                <h2
                  id="modal-title"
                  className="font-bold text-base"
                  style={{ letterSpacing: "0.02em", color: "var(--color-espresso)" }}
                >
                  Privacy Policy
                </h2>
                <motion.button
                  ref={closeRef}
                  onClick={closeModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-medium ml-4 flex-shrink-0 cursor-pointer"
                  style={{
                    color: "var(--color-muted)",
                    background: "none",
                    border: "none",
                    padding: "2px 4px",
                    borderRadius: 3,
                  }}
                  aria-label="Close privacy policy modal"
                >
                  ✕ Close
                </motion.button>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  {
                    heading: "Data Collection",
                    body: "We collect only your email address when you join our waitlist. No additional personal data is gathered without your explicit consent.",
                  },
                  {
                    heading: "Data Use",
                    body: "Your email is used solely to notify you of the BeyondStride product launch and grant priority access. We will never sell or share your data with third parties for marketing purposes.",
                  },
                  {
                    heading: "Unsubscribe",
                    body: (
                      <>
                        You may opt out at any time by contacting us at{" "}
                        <a
                          href="mailto:hello@beyondstride.com"
                          style={{ color: "var(--color-espresso)", fontWeight: 500 }}
                        >
                          hello@beyondstride.com
                        </a>
                        .
                      </>
                    ),
                  },
                ].map(({ heading, body }) => (
                  <div key={heading}>
                    <h3
                      className="text-xs font-semibold mb-1 uppercase"
                      style={{
                        color: "var(--color-espresso)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {heading}
                    </h3>
                    <p
                      className="text-sm font-light leading-relaxed"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
