"use client";

import type { ReactNode } from "react";
import { InquiryProvider } from "./InquiryContext";
import InquiryModal from "./InquiryModal";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <InquiryProvider>
      {children}
      <InquiryModal />
    </InquiryProvider>
  );
}
