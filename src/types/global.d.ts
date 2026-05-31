// Meta (Facebook) Pixel global. Injected by the pixel snippet at runtime.
// Google Analytics gtag global. Injected by the GA4 snippet at runtime.
export {};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
