"use client";

import React from "react";

export function IsometricHeroLogo() {
  const hatchId = React.useId().replace(/:/g, "");
  const hatch = `url(#${hatchId})`;

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[620px] select-none items-center justify-center">
      <svg
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Impossible isometric R"
        className="h-full w-full"
      >
        <defs>
          <pattern
            id={hatchId}
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="-5"
              x2="0"
              y2="22"
              stroke="#111"
              strokeWidth="4"
            />
          </pattern>
        </defs>

        <g
          fill="#fff"
          stroke="#111"
          strokeWidth="5"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {/* Lower-left returning surface */}
          <path
            d="
              M 280 878
              L 365 866
              L 622 609
              L 558 545
              Z
            "
            fill={hatch}
          />

          {/* Left vertical depth */}
          <path
            d="
              M 220 302
              L 280 359
              L 280 878
              L 220 818
              Z
            "
            fill={hatch}
          />

          {/* Left vertical front */}
          <path
            d="
              M 280 359
              L 329 408
              L 329 752
              L 558 526
              L 600 568
              L 365 866
              L 280 878
              Z
            "
          />

          {/* Lower thickness of the diagonal leg */}
          <path
            d="
              M 365 521
              L 651 807
              L 815 807
              L 772 854
              L 601 854
              L 360 600
              Z
            "
            fill={hatch}
          />

          {/* Main white diagonal leg */}
          <path
            d="
              M 373 365
              L 748 740
              L 815 740
              L 815 800
              L 651 800
              L 365 521
              Z
            "
          />

          {/* Hatched edge running toward the leg ending */}
          <path
            d="
              M 373 371
              L 464 371
              L 815 740
              L 748 740
              Z
            "
            fill={hatch}
          />

          {/* Top horizontal surface */}
          <path
            d="
              M 203 112
              L 648 112
              L 594 154
              L 158 154
              Z
            "
          />

          {/* Top horizontal depth */}
          <path
            d="
              M 158 154
              L 594 154
              L 557 218
              L 158 218
              Z
            "
            fill={hatch}
          />

          {/* Outer diagonal top surface */}
          <path
            d="
              M 648 112
              L 833 296
              L 788 348
              L 594 154
              Z
            "
          />

          {/* Outer diagonal depth */}
          <path
            d="
              M 594 154
              L 788 348
              L 730 410
              L 557 218
              Z
            "
            fill={hatch}
          />

          {/* Far-right end face */}
          <path
            d="
              M 788 348
              L 833 296
              L 833 438
              L 788 480
              Z
            "
            fill={hatch}
          />

          {/* Long right returning face */}
          <path
            d="
              M 730 410
              L 788 348
              L 788 480
              L 625 628
              L 577 580
              Z
            "
            fill={hatch}
          />

          {/* Upper inner top surface */}
          <path
            d="
              M 220 302
              L 269 265
              L 540 265
              L 497 302
              Z
            "
          />

          {/* Upper inner diagonal depth */}
          <path
            d="
              M 497 302
              L 540 265
              L 668 405
              L 626 453
              Z
            "
            fill={hatch}
          />

          {/* Main upper R face */}
          <path
            d="
              M 220 302
              L 497 302
              L 626 453
              L 580 500
              L 744 661
              L 658 740
              Z
            "
          />

          {/* Inner opening */}
          <path
            d="
              M 373 371
              L 464 371
              L 580 500
              L 533 536
              Z
            "
            fill={hatch}
          />

          {/* Main impossible crossing */}
          <path
            d="
              M 220 302
              L 658 740
            "
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
