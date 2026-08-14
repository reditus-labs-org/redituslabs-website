"use client";

import React, { useState, useEffect } from "react";

export function AsciiSystemStatus({ className = "" }: { className?: string }) {
  return (
    <div
      className={`font-mono text-xs leading-relaxed tracking-wider border border-graphite/40 bg-deep-ink/90 p-4 text-seafoam shadow-xl select-none ${className}`}
      aria-hidden="true"
    >
      <div className="text-petrol font-bold mb-2 flex items-center justify-between border-b border-graphite/60 pb-1">
        <span>┌──────────────────────┐</span>
        <span className="inline-block w-2 h-2 rounded-full bg-seafoam animate-pulse"></span>
      </div>
      <div className="text-bone/90 font-semibold mb-1">│ REDITUS_CORE_v2.4    │</div>
      <div className="text-graphite-muted my-1">│                      │</div>
      <div className="text-seafoam/90">│ &gt; ENGINEERED         │</div>
      <div className="text-seafoam/90">│ &gt; INTELLIGENT        │</div>
      <div className="text-seafoam/90">│ &gt; RELIABLE           │</div>
      <div className="text-graphite-muted my-1">│                      │</div>
      <div className="text-brass flex items-center justify-between border-t border-graphite/60 pt-1">
        <span>│ STATUS: ONLINE       │</span>
        <span>└──────────────────────┘</span>
      </div>
    </div>
  );
}

export function AsciiTerminal({
  commands = [
    { cmd: "> initialize_system", output: "SYS_OK [200]" },
    { cmd: "> load_architecture", output: "BLUEPRINT_LOADED" },
    { cmd: "> vibe_code_rescue", output: "RE-ENGINEERING... DONE" },
  ],
  className = "",
}: {
  commands?: { cmd: string; output: string }[];
  className?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const barFilled = Math.floor(progress / 10);
  const barEmpty = 10 - barFilled;
  const progressBar = "█".repeat(barFilled) + "░".repeat(barEmpty);

  return (
    <div
      className={`font-mono text-xs leading-relaxed bg-deep-ink text-seafoam border border-graphite/60 p-4 rounded-sm shadow-2xl ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b border-graphite/60 pb-2 mb-3 text-graphite-muted">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-seafoam inline-block"></span>
          <span className="text-[11px] text-bone/60 ml-2">term://reditus.engine</span>
        </div>
        <span className="text-[10px] text-brass uppercase font-medium">Production</span>
      </div>

      <div className="space-y-1.5">
        {commands.map((c, i) => (
          <div key={i} className="space-y-0.5">
            <div className="text-bone/90 font-medium">{c.cmd}</div>
            <div className="text-petrol/90 pl-3 text-[11px]">{c.output}</div>
          </div>
        ))}

        <div className="pt-2 border-t border-graphite/40">
          <div className="text-bone/80 text-[11px] flex justify-between">
            <span>[SYS.COMPILE]</span>
            <span className="text-seafoam">{progress}%</span>
          </div>
          <div className="text-seafoam tracking-widest text-[11px] my-1">
            [{progressBar}]
          </div>
          {progress === 100 ? (
            <div className="text-seafoam font-bold text-[11px] flex items-center gap-1.5">
              <span className="text-brass">✓</span> BUILD COMPLETE — ALL SYSTEMS READY
            </div>
          ) : (
            <div className="text-brass text-[11px] animate-pulse">
              OPTIMIZING PIPELINE...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function AsciiPipelineDiagram({ className = "" }: { className?: string }) {
  return (
    <div
      className={`font-mono text-xs text-graphite/80 leading-tight bg-bone-card border border-graphite/20 p-4 rounded select-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex flex-wrap items-center justify-between text-center gap-2">
        <div className="px-2 py-1 bg-deep-ink text-bone font-bold rounded">IDEA</div>
        <span className="text-petrol">─►</span>
        <div className="px-2 py-1 bg-petrol/10 border border-petrol text-petrol font-bold rounded">
          REIMAGINE
        </div>
        <span className="text-petrol">─►</span>
        <div className="px-2 py-1 bg-seafoam/20 border border-seafoam-dark text-deep-ink font-bold rounded">
          ENGINEER
        </div>
        <span className="text-petrol">─►</span>
        <div className="px-2 py-1 bg-brass/10 border border-brass text-brass font-bold rounded">
          OPTIMIZE
        </div>
        <span className="text-petrol">─►</span>
        <div className="px-2 py-1 bg-petrol text-bone font-bold rounded shadow-sm">
          REALIZE
        </div>
      </div>
    </div>
  );
}

export function AsciiBrandGrid({ className = "" }: { className?: string }) {
  return (
    <pre
      className={`font-mono text-[10px] leading-none text-petrol/40 tracking-widest select-none ${className}`}
      aria-hidden="true"
    >
      {`. . . . . . . . . . . . . . . . . .
: : : : : : : : : : : : : : : : : :
+---+---+---+---+---+---+---+---+---+
| R | E | D | I | T | U | S |   | █ |
+---+---+---+---+---+---+---+---+---+`}
    </pre>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ASCII Atom — 3 intersecting orbital rings + nucleus
   Density chars: . : + * 7 S % $ # @
───────────────────────────────────────────────────────────────── */
export function AsciiAtom({
  className = "",
  color = "text-seafoam/30",
}: {
  className?: string;
  color?: string;
}) {
  return (
<pre
  className={`font-mono leading-[1.05] select-none tracking-tight ${color} ${className}`}
  aria-hidden="true"
  style={{ fontSize: "clamp(6px, 0.75vw, 9px)" }}
>
{`                                                                    .:-==-.
                                                                 -*%%%#**#%%=
                                                              =#@@*=.      -%%:
                                                            =%@#-            #@:
                                                         .+@@*.              .@#
                                                       .+@@+                  *@:
                                                      =@@*.                   :@+
                                                    -@@#.                      @+
                                                  .*@@-                        @+
                                                 -%@*.                         @+
                                                +@@=                           @+
                                              .*@%.                           -@:
                                             =%@*:-=-:                        -@.
                                            +%#+++-::=*-                      *%
                                          .*@*+%-     .#+                     %=
                                         .###+%:        +*                   :@
                                        :*%+.%=          #-                  #*
                                       -##* +%           .%                  @:
      .--=+++=+++=====-:-::.          -%**.-@:            ==                =#
    -#+=-...       .....--=--===-=-:.-##=  %#              #               .*.
   =@:                           ..:+**+:.:@=..            +:...::--=--=++=#*=-:.
   .%*                             =#+#.  +@ .:.-.. . .:::---::...        .#  ..=*.
    .#%-                          -**+.   #@      ..=-::. . =             +:     %+
      -##=                       -+++.   .@+ :.           ..+.:          :+     -#.
        :#%*:                   .+++.   .-@= .              ..    ::::   -     +#.
          .+#%*=.              .=+=..-:..-@:      .+-        .      ...:--   =*-
             .=*%#=:           ==+=:.    -@-    -@@@@@=      .          :.-#+*-
                 :+#%#+:      -++-       +@-   #@@@@@@@#.    .         -++=:  ..::..
                    .-+%%#+==-#*-        -@-   -+%@@@@*-     .      :+*+:         .---:
                        .#*#%++#-        -@-    .##@#@.         :=+*=-.               .-:::
                       ==.  -%*+#%#*+:.  .@-       .        :+++*+:                      .:-..
                     .+:   .#%*   -=+%%%**%=.         .:=++**=:     .                       .-+.
                     #.    *%%.        :-+*###*=-:.-++*++-  :      .                          .-=.
                    .#.   :@%=            --:+#%###%@+=:.   :      .                            .--
                     :+:-:*%#....:-::--==+++--.    .:=+*#*#**=-:.:.                               ==
                       ..=%%=.:::--:::..  .+:             .::--+*+*#+===-:...                    :=-
                         #@%               :#.             :   :.   ..:-=-==--==+===:----.--:-==:-.
                        :@@=                +:            ::  -.                ........:.:. ..
  .                     +@%                  =.           :  :
                       .%@+                  :=          -  =:
                       -@@:                   .:        : :=.
                       #@%                     :=.     . :+
                      .@@*                       :.. .. +=
                      .@@=                            .*-
                      =@@:                           =*.
                      +@%                          .#+
                      +@#                         -#-
                      +@#                       .#*
                      -@@                     .+#-
                      .@@.                  .+#-
                       #@+                .+#+
                       .@@.             -*#+
                        -@@:         -*%#-
                         .*%#+=--=+*#*=.
                            -*###*+:`}
</pre>
  );
}
