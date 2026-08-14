"use client";

import React from "react";
import Image from "next/image";

export function WebDigitalIllustration() {
  return (
    <div className="w-full h-56 sm:h-64 flex items-center justify-center relative">
      <Image
        src="/images/service-web-digital.png"
        alt="Web & Digital Isometric Illustration"
        width={600}
        height={450}
        className="w-full h-full object-contain mix-blend-multiply scale-105"
        priority
      />
    </div>
  );
}

export function SoftwareAppsIllustration() {
  return (
    <div className="w-full h-56 sm:h-64 flex items-center justify-center relative">
      <Image
        src="/images/service-software-apps.png"
        alt="Software & Apps Isometric Architecture"
        width={600}
        height={450}
        className="w-full h-full object-contain mix-blend-multiply scale-105"
        priority
      />
    </div>
  );
}

export function AIPipelinesIllustration() {
  return (
    <div className="w-full h-56 sm:h-64 flex items-center justify-center relative">
      <Image
        src="/images/service-ai-pipelines.png"
        alt="AI Pipelines & Tools Isometric Intelligence Flow"
        width={600}
        height={450}
        className="w-full h-full object-contain mix-blend-multiply scale-105"
        priority
      />
    </div>
  );
}

export function SaaSProductsIllustration() {
  return (
    <div className="w-full h-56 sm:h-64 flex items-center justify-center relative">
      <Image
        src="/images/service-saas-products.png"
        alt="SaaS Products Isometric Dashboard Platform"
        width={600}
        height={450}
        className="w-full h-full object-contain mix-blend-multiply scale-105"
        priority
      />
    </div>
  );
}
