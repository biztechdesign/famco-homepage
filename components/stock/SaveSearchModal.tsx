"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Bell, X, Mail, Check } from "lucide-react";

export default function SaveSearchModal({
  open,
  onClose,
  resultCount,
  filterSummary,
}: {
  open: boolean;
  onClose: () => void;
  resultCount: number;
  filterSummary: string;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Only portal after the component mounts on the client (avoids SSR mismatch)
  useEffect(() => setMounted(true), []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Reset on open
  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  if (!open || !mounted) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: hook to backend / Mailchimp / Resend
    setSubmitted(true);
  };

  const dialog = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-search-title"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
    >
      {/* Backdrop — solid charcoal so the sticky header / cards don't bleed through */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-charcoal-900/75 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="
          relative w-full sm:max-w-md
          bg-white rounded-t-2xl sm:rounded-2xl
          shadow-lift mx-0 sm:mx-4
          max-h-[90vh] overflow-y-auto
        "
      >
        {/* Close button */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-2.5 right-2.5 h-8 w-8 rounded-md hover:bg-bgalt flex items-center justify-center transition-colors z-10"
        >
          <X className="h-4 w-4 text-ink" />
        </button>

        {!submitted ? (
          <form onSubmit={submit} className="p-5">
            {/* Header — single row */}
            <div className="flex items-center gap-2.5 mb-3 pr-7">
              <span className="inline-flex h-8 w-8 rounded-md bg-secondary/10 items-center justify-center shrink-0">
                <Bell className="h-4 w-4 text-secondary" />
              </span>
              <h2
                id="save-search-title"
                className="font-display text-[16px] font-bold text-ink leading-tight"
              >
                Save search & email me when matches arrive
              </h2>
            </div>

            {/* Filter summary chip — single line */}
            <div className="rounded-md border border-line bg-bgalt/60 px-3 py-2 mb-4 flex items-center justify-between gap-3">
              <div className="text-[12px] text-ink leading-tight truncate">
                {filterSummary}
              </div>
              <span className="text-[11px] text-muted whitespace-nowrap shrink-0">
                <span className="font-semibold text-ink tabular-nums">
                  {resultCount.toLocaleString("en-AE")}
                </span>{" "}
                now
              </span>
            </div>

            {/* Email */}
            <label className="block mb-3">
              <span className="block text-[11.5px] font-bold text-ink mb-1">
                Email address
              </span>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.ae"
                  className="
                    w-full h-10 pl-9 pr-3 rounded-md
                    border border-line bg-white
                    text-[13px] text-ink placeholder:text-muted
                    outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20
                    transition-colors
                  "
                />
              </div>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="
                btn btn-primary w-full h-11 rounded-md text-[13.5px]
                inline-flex items-center justify-center gap-1.5
              "
            >
              <Bell className="h-4 w-4" />
              Save & start alerts
            </button>

            <p className="mt-2 text-[10.5px] text-muted text-center">
              Unsubscribe any time.{" "}
              <a href="#" className="text-secondary hover:underline">
                Privacy
              </a>
            </p>
          </form>
        ) : (
          /* Success state — also tightened */
          <div className="p-6 text-center">
            <span className="inline-flex h-11 w-11 rounded-full bg-secondary/15 items-center justify-center mb-3">
              <Check className="h-6 w-6 text-secondary" strokeWidth={3} />
            </span>
            <h2 className="font-display text-[17px] font-bold text-ink mb-1">
              You're set
            </h2>
            <p className="text-[13px] text-ink/85 mb-1">
              We'll email{" "}
              <span className="font-semibold text-ink">{email}</span>
            </p>
            <p className="text-[12px] text-muted mb-5">
              the moment a match arrives.
            </p>
            <button
              onClick={onClose}
              className="btn btn-primary h-10 px-5 rounded-md text-[13px]"
            >
              Got it
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Render to document.body so the modal escapes any stacking context
  // created by parent transforms / sticky positioning / overflow rules.
  return createPortal(dialog, document.body);
}
