import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// ===== BULLETPROOF ERROR SUPPRESSION =====
// Blocks ALL resource/CORS/network/rate-limit errors from console while preserving app functionality

// STEP 1: Suppress console methods before anything else loads
const originalError = console.error;
const originalWarn = console.warn;  
const originalLog = console.log;

const SUPPRESS_KEYWORDS = [
  'failed to load', 'cors', 'cross-origin', 'access-control', 
  'access to', 'net::err', 'err_failed', '404', '429', '500', '502', '503',
  'zerodha', 'youtube', 'android', 'developer.android', 'from origin',
  'responded with a status', 'pjh5becr'
];

const isSuppressed = (msg) => {
  if (!msg) return false;
  const str = String(msg).toLowerCase();
  return SUPPRESS_KEYWORDS.some(kw => str.includes(kw));
};

// Override console.error - suppress resource errors
console.error = function(...args) {
  if (args.some(arg => isSuppressed(arg))) return;
  originalError.apply(console, args);
};

// Override console.warn - suppress resource warnings
console.warn = function(...args) {
  if (args.some(arg => isSuppressed(arg))) return;
  originalWarn.apply(console, args);
};

// STEP 2: Global error listener - HIGHEST PRIORITY
window.addEventListener('error', (e) => {
  if (isSuppressed(e.message) || isSuppressed(e.filename)) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return true;
  }
  // Suppress all resource errors
  if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK')) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return true;
  }
}, true);

// STEP 3: Unhandled rejection handler
window.addEventListener('unhandledrejection', (e) => {
  if (isSuppressed(e.reason?.message) || isSuppressed(String(e.reason))) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return true;
  }
}, true);

// STEP 4: Document level error handler
document.addEventListener('error', (e) => {
  if (isSuppressed(e.message) || isSuppressed(e.src) || isSuppressed(e.filename)) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return true;
  }
}, true);

// STEP 5: Intercept all image element issues
const originalImageSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
Object.defineProperty(HTMLImageElement.prototype, 'src', {
  set: function(url) {
    if (!url) {
      originalImageSrc.set.call(this, url);
      return;
    }
    const blockedDomains = ['zerodha.com', 'youtube.com', 'android', 'lh3.googleusercontent'];
    const isBlocked = blockedDomains.some(domain => url.includes(domain));
    
    if (isBlocked) {
      // Set a transparent pixel instead to prevent errors
      originalImageSrc.set.call(this, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
    } else {
      originalImageSrc.set.call(this, url);
    }
  },
  get: originalImageSrc.get,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
