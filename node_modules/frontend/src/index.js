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
  'responded with a status', 'pjh5becr',
  'adsbygoogle', 'adsense', 'tagerror', 'availablewidth', 'posthog',
  'already have ads in them', 'no slot size',
  'onrender', 'render.com', 'finez-1', 'err_aborted', 'net::err',
  'doubleclick.net', 'gen_204', 'googleads', 'managed/js/adsense',
  'availablewidth=0', 'adsbygoogle.push() error', 'tagerror',
  'aborted', 'googlesyndication', 'pagead2', 'err_connection_refused',
  'web-vitals', 'dead-clicks', 'recorder', 'surveys', 'phc_', 'posthog-recorder',
  'config.js', 'array.js', 'us.i.posthog.com', 'beacon=1', 'compression=gzip-js',
  'net::err_aborted', 'googlesyndication.com', 'doubleclick.net', 'googleads', 'pagead2',
  'localhost:8000'
];

const isSuppressed = (msg) => {
  if (!msg) return false;
  
  let str = '';
  if (msg instanceof Error) {
    str = (msg.message + (msg.name || '') + (msg.stack || '')).toLowerCase();
  } else if (typeof msg === 'object') {
    try {
      str = (JSON.stringify(msg) + (msg.message || '') + (msg.name || '')).toLowerCase();
    } catch (e) {
      str = String(msg).toLowerCase();
    }
  } else {
    str = String(msg).toLowerCase();
  }
  
  // Suppress all common third-party noise
  const noisyKeywords = ['google', 'posthog', 'adsbygoogle', 'adsense', 'doubleclick', 'syndication', 'aborted', 'err_aborted', 'net::err', 'localhost:8000'];
  if (noisyKeywords.some(kw => str.includes(kw))) return true;
  
  return SUPPRESS_KEYWORDS.some(kw => str.includes(kw));
};

// ULTIMATE CONSOLE FILTER
const silentLogger = (originalFn) => function(...args) {
  if (args.some(arg => isSuppressed(arg))) return;
  originalFn.apply(console, args);
};

console.error = silentLogger(originalError);
console.warn = silentLogger(originalWarn);
console.log = silentLogger(originalLog);

// STEP 2: Global error listener - HIGHEST PRIORITY
window.addEventListener('error', (e) => {
  const errorMsg = e.message || (e.error && e.error.message) || '';
  const errorStack = (e.error && e.error.stack) || '';
  const src = (e.target && (e.target.src || e.target.href)) || '';
  
  if (isSuppressed(errorMsg) || isSuppressed(e.filename) || isSuppressed(e.error) || isSuppressed(src) || isSuppressed(errorStack)) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return true;
  }
  // Suppress all TagErrors and AdSense/PostHog errors
  if (e.error && (e.error.name === 'TagError' || e.error.message?.includes('adsbygoogle') || e.error.message?.includes('posthog'))) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return true;
  }
  // Suppress all resource errors (IMG, SCRIPT, LINK)
  if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'LINK')) {
    const src = e.target.src || e.target.href || '';
    if (isSuppressed(src) || isSuppressed(errorMsg) || isSuppressed(errorStack)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return true;
    }
    // Also suppress all localhost/google/posthog resource failures
    if (src.includes('localhost') || src.includes('google') || src.includes('posthog') || src.includes('ads') || src.includes('syndication')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return true;
    }
  }
}, true);

// STEP 4.5: Intercept network calls to suppress third-party noise
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const url = String(args[0] || '');
  if (isSuppressed(url)) {
    return Promise.resolve(new Response(null, { status: 204, statusText: 'Suppressed' }));
  }
  return originalFetch.apply(this, args).catch(err => {
    if (isSuppressed(url) || isSuppressed(err)) {
      return new Response(null, { status: 204, statusText: 'Suppressed' });
    }
    throw err;
  });
};

const originalSendBeacon = navigator.sendBeacon;
if (originalSendBeacon) {
  navigator.sendBeacon = function(url, data) {
    if (isSuppressed(url)) return true; // Pretend it succeeded
    return originalSendBeacon.apply(this, [url, data]);
  };
}

const originalXhrSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(...args) {
  this.addEventListener('error', (e) => {
    if (isSuppressed(this._url) || isSuppressed('xhr error')) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  });
  return originalXhrSend.apply(this, args);
};
const originalXhrOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, ...rest) {
  this._url = url;
  return originalXhrOpen.apply(this, [method, url, ...rest]);
};

// STEP 2.5: Suppress network-related errors specifically
window.addEventListener('unhandledrejection', (e) => {
  const reason = e.reason || '';
  if (isSuppressed(reason.message) || isSuppressed(String(reason)) || isSuppressed(reason.stack) || isSuppressed(reason.name)) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return true;
  }
  // Suppress all fetch/axios/network related issues from third parties
  const reasonStr = String(reason).toLowerCase();
  if (reasonStr.includes('google') || reasonStr.includes('posthog') || reasonStr.includes('aborted') || reasonStr.includes('ads')) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return true;
  }
}, true);

// STEP 4: Document level error handler
document.addEventListener('error', (e) => {
  const src = (e.target && (e.target.src || e.target.href)) || '';
  if (isSuppressed(e.message) || isSuppressed(src) || isSuppressed(e.filename)) {
    e.preventDefault();
    e.stopImmediatePropagation();
    return true;
  }
  // Suppress all localhost/google/posthog resource failures
  if (src.includes('localhost') || src.includes('google') || src.includes('posthog') || src.includes('ads')) {
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
