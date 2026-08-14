"use client";

import React from "react";

export function IsometricHeroLogo() {
  const hatchId = React.useId().replace(/:/g, "");
  const hatch = `url(#${hatchId})`;

  return (
    <div className="relative w-full max-w-xl aspect-square mx-auto flex items-center justify-center select-none">
      
      {/* Outer Technical Blueprint Canvas Container */}
      <div className="absolute inset-0 bg-tech-grid-light opacity-80 rounded-sm border border-graphite/20 shadow-xs"></div>

      {/* Blueprint Outer Frame Lines & Dimensions */}
      <div className="absolute inset-3 border border-graphite/30 pointer-events-none flex flex-col justify-between p-4 z-20">
        <div className="flex justify-between font-mono text-[10px] text-graphite-muted tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-petrol inline-block"></span>
            SYS.DWG // REDITUS_OFFICIAL_LOGO
          </span>
          <span>SCALE 1:1.0 · ORIGINAL SVG</span>
        </div>

        <div className="flex justify-between items-end font-mono text-[10px] text-graphite-muted">
          <div>
            <div>FILE: Reditus_Logo.svg</div>
            <div>STATUS: VERIFIED_ASSET</div>
          </div>
          <div className="text-right">
            <span className="text-petrol font-bold bg-petrol/10 border border-petrol/30 px-2 py-0.5">
              OFFICIAL BRANDMARK
            </span>
          </div>
        </div>
      </div>

      {/* Blueprint Corner Crosshairs */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-petrol z-20"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-petrol z-20"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-petrol z-20"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-petrol z-20"></div>

      {/* Main Image Container for Reditus_Logo.svg */}
      <div className="relative z-10 w-4/5 h-4/5 flex items-center justify-center p-4 transition-transform duration-700 hover:scale-[1.02]">
        <img
          src="/Reditus_Logo.svg"
          alt="REDITUS Official Logo"
          className="w-full h-full object-contain drop-shadow-2xl rounded-xs"
        />
      </div>

      {/* Floating Monospace ASCII Indicators */}
      <div className="absolute top-8 right-8 font-mono text-[10px] bg-deep-ink text-seafoam border border-petrol/60 px-3 py-1.5 shadow-xl z-30">
        BRANDMARK :: OK
      </div>
      <div className="absolute bottom-8 left-8 font-mono text-[10px] text-graphite-muted bg-bone-card border border-graphite/20 px-3 py-1.5 shadow-xs z-30">
        ASSET: /Reditus_Logo.svg
      </div>

    </div>
  );
}
