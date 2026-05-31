// Meta (Facebook) Pixel global. Injected by the pixel snippet at runtime.
export {};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
