"use client";

import React, { useId, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface IsometricTextProps {
  text?: string;
  className?: string;
}

export function IsometricText({ text = "REDITUS LABS", className = "" }: IsometricTextProps) {
  const rawId = useId();
  const hatchId = `iso-hatch-${rawId.replace(/:/g, "")}`;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".iso-letter-group", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 40,
        scale: 0.85,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.4)",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 1420 160"
        className="w-full h-auto max-h-[160px] select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Diagonal Hatch Pattern matching the architectural logo */}
          <pattern
            id={hatchId}
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1.5" className="text-[#F1EDE3]/70" />
          </pattern>

          {/* Subtle Drop Shadow */}
          <filter id="iso-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#087F8C" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#iso-shadow)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="text-[#F1EDE3]">
          
          {/* --- LETTER R (X: 20) --- */}
          <g transform="translate(20, 20)" className="iso-letter-group">
            <polygon points="0,0 20,-15 70,-15 50,0" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="50,0 70,-15 70,30 50,45" fill={`url(#${hatchId})`} />
            <polygon points="0,0 50,0 50,45 0,45" fill="#12191d" />
            <polygon points="0,45 20,30 60,30 40,45" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,45 40,45 40,65 0,65" fill="#12191d" />
            <polygon points="20,65 40,65 70,120 50,120" fill={`url(#${hatchId})`} />
            <polygon points="0,65 20,65 50,120 30,120" fill="#12191d" />
            <polygon points="-15,0 0,0 0,120 -15,120" fill={`url(#${hatchId})`} />
          </g>

          {/* --- LETTER E (X: 130) --- */}
          <g transform="translate(130, 20)" className="iso-letter-group">
            <polygon points="-15,0 0,0 0,120 -15,120" fill={`url(#${hatchId})`} />
            <polygon points="0,0 20,-15 70,-15 50,0" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,0 50,0 50,25 0,25" fill="#12191d" />
            <polygon points="50,0 70,-15 70,10 50,25" fill={`url(#${hatchId})`} />
            <polygon points="0,50 15,38 55,38 40,50" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,50 40,50 40,70 0,70" fill="#12191d" />
            <polygon points="40,50 55,38 55,58 40,70" fill={`url(#${hatchId})`} />
            <polygon points="0,95 20,80 70,80 50,95" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,95 50,95 50,120 0,120" fill="#12191d" />
            <polygon points="50,95 70,80 70,105 50,120" fill={`url(#${hatchId})`} />
          </g>

          {/* --- LETTER D (X: 240) --- */}
          <g transform="translate(240, 20)" className="iso-letter-group">
            <polygon points="-15,0 0,0 0,120 -15,120" fill={`url(#${hatchId})`} />
            <polygon points="0,0 20,-15 50,-15 70,15 50,30" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,0 50,0 70,30 70,90 50,120 0,120 0,95 35,95 50,75 50,45 35,25 0,25" fill="#12191d" />
            <polygon points="50,0 70,-15 90,15 70,30" fill={`url(#${hatchId})`} />
            <polygon points="70,30 90,15 90,75 70,90" fill={`url(#${hatchId})`} />
            <polygon points="50,120 70,105 70,90 50,120" fill={`url(#${hatchId})`} />
          </g>

          {/* --- LETTER I (X: 360) --- */}
          <g transform="translate(360, 20)" className="iso-letter-group">
            <polygon points="0,0 20,-15 45,-15 25,0" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,0 25,0 25,120 0,120" fill="#12191d" />
            <polygon points="25,0 45,-15 45,105 25,120" fill={`url(#${hatchId})`} />
          </g>

          {/* --- LETTER T (X: 440) --- */}
          <g transform="translate(440, 20)" className="iso-letter-group">
            <polygon points="-15,0 5,-15 75,-15 55,0" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="-15,0 55,0 55,25 -15,25" fill="#12191d" />
            <polygon points="55,0 75,-15 75,10 55,25" fill={`url(#${hatchId})`} />
            <polygon points="7,25 27,10 47,10 27,25" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="7,25 32,25 32,120 7,120" fill="#12191d" />
            <polygon points="32,25 52,10 52,105 32,120" fill={`url(#${hatchId})`} />
          </g>

          {/* --- LETTER U (X: 555) --- */}
          <g transform="translate(555, 20)" className="iso-letter-group">
            <polygon points="0,0 20,-15 45,-15 25,0" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,0 25,0 25,95 0,95" fill="#12191d" />
            <polygon points="45,0 65,-15 90,-15 70,0" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="45,0 70,0 70,95 45,95" fill="#12191d" />
            <polygon points="70,0 90,-15 90,80 70,95" fill={`url(#${hatchId})`} />
            <polygon points="0,95 25,95 70,95 70,120 0,120" fill="#12191d" />
            <polygon points="70,95 90,80 90,105 70,120" fill={`url(#${hatchId})`} />
          </g>

          {/* --- LETTER S (X: 675) --- */}
          <g transform="translate(675, 20)" className="iso-letter-group">
            <polygon points="0,0 20,-15 70,-15 50,0" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,0 50,0 50,25 0,25" fill="#12191d" />
            <polygon points="50,0 70,-15 70,10 50,25" fill={`url(#${hatchId})`} />
            <polygon points="0,25 20,10 20,40 0,55" fill={`url(#${hatchId})`} />
            <polygon points="0,25 25,25 25,55 0,55" fill="#12191d" />
            <polygon points="0,55 20,40 70,40 50,55" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,55 50,55 50,75 0,75" fill="#12191d" />
            <polygon points="25,75 50,75 50,100 25,100" fill="#12191d" />
            <polygon points="50,75 70,60 70,85 50,100" fill={`url(#${hatchId})`} />
            <polygon points="0,95 20,80 70,80 50,95" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,95 50,95 50,120 0,120" fill="#12191d" />
            <polygon points="50,95 70,80 70,105 50,120" fill={`url(#${hatchId})`} />
          </g>

          {/* --- LETTER L (X: 845) --- */}
          <g transform="translate(845, 20)" className="iso-letter-group">
            <polygon points="0,0 20,-15 45,-15 25,0" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,0 25,0 25,95 0,95" fill="#12191d" />
            <polygon points="25,0 45,-15 45,80 25,95" fill={`url(#${hatchId})`} />
            <polygon points="0,95 20,80 70,80 50,95" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,95 50,95 50,120 0,120" fill="#12191d" />
            <polygon points="50,95 70,80 70,105 50,120" fill={`url(#${hatchId})`} />
          </g>

          {/* --- LETTER A (X: 955) --- */}
          <g transform="translate(955, 20)" className="iso-letter-group">
            <polygon points="20,0 35,-15 55,-15 40,0" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,120 20,0 40,0 20,120" fill="#12191d" />
            <polygon points="-15,120 0,120 20,0 5,0" fill={`url(#${hatchId})`} />
            <polygon points="20,0 40,0 60,120 40,120" fill="#12191d" />
            <polygon points="40,0 55,-15 75,105 60,120" fill={`url(#${hatchId})`} />
            <polygon points="10,65 25,50 55,50 40,65" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="10,65 40,65 40,80 10,80" fill="#12191d" />
          </g>

          {/* --- LETTER B (X: 1065) --- */}
          <g transform="translate(1065, 20)" className="iso-letter-group">
            <polygon points="-15,0 0,0 0,120 -15,120" fill={`url(#${hatchId})`} />
            <polygon points="0,0 20,-15 50,-15 65,0 50,15" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,0 50,0 65,20 50,55 0,55" fill="#12191d" />
            <polygon points="50,0 65,-15 80,5 65,20" fill={`url(#${hatchId})`} />
            <polygon points="65,20 80,5 80,40 65,55" fill={`url(#${hatchId})`} />
            <polygon points="0,55 20,40 55,40 70,60 50,75" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,55 50,55 70,80 50,120 0,120" fill="#12191d" />
            <polygon points="50,55 70,40 90,65 70,80" fill={`url(#${hatchId})`} />
            <polygon points="70,80 90,65 90,105 70,120" fill={`url(#${hatchId})`} />
          </g>

          {/* --- LETTER S (X: 1180) --- */}
          <g transform="translate(1180, 20)" className="iso-letter-group">
            <polygon points="0,0 20,-15 70,-15 50,0" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,0 50,0 50,25 0,25" fill="#12191d" />
            <polygon points="50,0 70,-15 70,10 50,25" fill={`url(#${hatchId})`} />
            <polygon points="0,25 20,10 20,40 0,55" fill={`url(#${hatchId})`} />
            <polygon points="0,25 25,25 25,55 0,55" fill="#12191d" />
            <polygon points="0,55 20,40 70,40 50,55" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,55 50,55 50,75 0,75" fill="#12191d" />
            <polygon points="25,75 50,75 50,100 25,100" fill="#12191d" />
            <polygon points="50,75 70,60 70,85 50,100" fill={`url(#${hatchId})`} />
            <polygon points="0,95 20,80 70,80 50,95" fill="#A8E6CF" stroke="#087F8C" />
            <polygon points="0,95 50,95 50,120 0,120" fill="#12191d" />
            <polygon points="50,95 70,80 70,105 50,120" fill={`url(#${hatchId})`} />
          </g>

        </g>
      </svg>
    </div>
  );
}
