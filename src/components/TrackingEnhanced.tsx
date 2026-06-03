"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Enhanced tracking for the ebook landing page.
 *
 * Tracks:
 * - Scroll depth milestones (25%, 50%, 75%, 100%)
 * - Time on page milestones (10s, 30s, 60s, 120s, 300s)
 * - Section visibility (hero, problem, system, framework, cta, faq)
 * - CTA clicks
 * - Video engagement (play, 25%, 50%, 75%, 100%)
 * - Page exit intent (desktop)
 *
 * Fires events to both Meta Pixel (fbq) and GA4 (gtag) when available.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    whop?: { track: (...args: unknown[]) => void };
  }
}

/* ── helpers ── */

function fireEvent(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  // GA4
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // Meta Pixel custom event
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }

  // Whop pixel
  if (typeof window !== "undefined" && window.whop?.track) {
    window.whop.track(eventName, params);
  }

  // Debug in dev
  if (process.env.NODE_ENV === "development") {
    console.log(`[Track] ${eventName}`, params);
  }
}

/* ── Scroll Depth Tracker ── */

function useScrollDepth() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const m of milestones) {
        if (pct >= m && !firedRef.current.has(m)) {
          firedRef.current.add(m);
          fireEvent("scroll_depth", {
            percent: m,
            page: window.location.pathname,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

/* ── Time on Page Tracker ── */

function useTimeOnPage() {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    const milestones = [10, 30, 60, 120, 300]; // seconds
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);

      for (const m of milestones) {
        if (elapsed >= m && !firedRef.current.has(m)) {
          firedRef.current.add(m);
          fireEvent("time_on_page", {
            seconds: m,
            page: window.location.pathname,
          });
        }
      }

      // Stop checking after all milestones hit
      if (firedRef.current.size === milestones.length) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}

/* ── Section Visibility Tracker ── */

function useSectionVisibility() {
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sections = document.querySelectorAll("[data-track-section]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionName = (entry.target as HTMLElement).dataset
              .trackSection;
            if (sectionName && !firedRef.current.has(sectionName)) {
              firedRef.current.add(sectionName);
              fireEvent("section_view", {
                section: sectionName,
                page: window.location.pathname,
              });
            }
          }
        }
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
}

/* ── Exit Intent (desktop only) ── */

function useExitIntent() {
  const firedRef = useRef(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !firedRef.current) {
        firedRef.current = true;
        fireEvent("exit_intent", {
          page: window.location.pathname,
          time_on_page: Math.floor(performance.now() / 1000),
        });
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);
}

/* ── Video Engagement Tracker ── */

export function useVideoTracking(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      if (!firedRef.current.has("play")) {
        firedRef.current.add("play");
        fireEvent("video_play", {
          page: window.location.pathname,
        });
      }
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const pct = Math.round((video.currentTime / video.duration) * 100);

      for (const m of [25, 50, 75, 100]) {
        const key = `video_${m}`;
        if (pct >= m && !firedRef.current.has(key)) {
          firedRef.current.add(key);
          fireEvent("video_progress", {
            percent: m,
            page: window.location.pathname,
          });
        }
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef]);
}

/* ── CTA Click Tracker ── */

export function trackCTAClick(ctaName: string, params: Record<string, unknown> = {}) {
  fireEvent("cta_click", {
    cta_name: ctaName,
    page: window.location.pathname,
    ...params,
  });
}

/* ── Main Component ── */

export default function TrackingEnhanced() {
  useScrollDepth();
  useTimeOnPage();
  useSectionVisibility();
  useExitIntent();

  return null; // No UI — tracking only
}
