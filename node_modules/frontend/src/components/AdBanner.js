import React, { useEffect, useRef } from 'react';

const AdBanner = ({ slot, format = 'auto', responsive = 'true', style = { display: 'block', minHeight: '90px', minWidth: '250px' } }) => {
  const adRef = useRef(false);
  const isDevelopment = window.location.hostname === 'localhost';

  useEffect(() => {
    // Only push if we have real IDs and haven't pushed yet
    if (adRef.current) return;
    
    const isPlaceholderClient = "ca-pub-YOUR_ADSENSE_CLIENT_ID".includes('YOUR_');
    const isPlaceholderSlot = (slot || "YOUR_DEFAULT_SLOT_ID").includes('YOUR_');

    if (isPlaceholderClient || isPlaceholderSlot) {
      console.log(`[AdSense] Placeholder active for slot: ${slot || 'Default'}. skipping push()`);
      return;
    }

    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adRef.current = true;
      }
    } catch (e) {
      // Silently catch push errors
    }
  }, [slot]);

  const isPlaceholder = !slot || String(slot).includes('YOUR_') || "ca-pub-YOUR_ADSENSE_CLIENT_ID".includes('YOUR_');

  return (
    <div className="ad-container my-8 flex flex-col items-center justify-center overflow-hidden w-full">
      {/* Visual Placeholder for Development or if IDs are missing */}
      {isPlaceholder && (
        <div className="w-full max-w-4xl min-h-[120px] bg-slate-800/80 border-2 border-dashed border-amber-500/30 rounded-2xl flex flex-col items-center justify-center p-6 transition-all hover:border-amber-500/50">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500 font-bold">Ad</div>
            <span className="text-slate-200 font-bold tracking-wider text-sm uppercase">Google AdSense Banner</span>
          </div>
          <span className="text-slate-400 text-xs font-mono bg-slate-900/50 px-3 py-1 rounded-md border border-slate-700">Slot ID: {slot || 'Default'}</span>
          <p className="text-slate-500 text-[11px] mt-4 text-center max-w-md leading-relaxed">
            Placeholder active. To see live ads, replace <code className="text-amber-400/80">YOUR_ADSENSE_CLIENT_ID</code> and <code className="text-amber-400/80">YOUR_DEFAULT_SLOT_ID</code> in 
            <span className="text-slate-300"> AdBanner.js</span> and <span className="text-slate-300">index.html</span>.
          </p>
        </div>
      )}
      
      {!isPlaceholder && (
        <ins
          className="adsbygoogle"
          style={style}
          data-ad-client="ca-pub-YOUR_ADSENSE_CLIENT_ID" // User will need to replace this
          data-ad-slot={slot || "YOUR_DEFAULT_SLOT_ID"} // User will need to replace this
          data-ad-format={format}
          data-full-width-responsive={responsive}
        ></ins>
      )}
    </div>
  );
};

export default AdBanner;
