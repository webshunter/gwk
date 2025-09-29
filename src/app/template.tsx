"use client";

import React from "react";
import { usePathname } from "next/navigation";

import ReactLenis from "lenis/react";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import useSplitTextAnimation from "@/hook/useSplitTextAnimation";
import useRevealAnimation from "@/hook/useRevealAnimation";

const Template = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isAdminShellRoute = pathname.startsWith("/studio") || pathname.startsWith("/admin");

  useSplitTextAnimation({
    selector: ".split",
  });
  useRevealAnimation({
    selector: ".reveal",
  });

  // If it's a studio route, return children without navbar/footer and lenis
  if (isAdminShellRoute) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root>
      <Navbar />
      {children}
      <Footer />
    </ReactLenis>
  );
};

export default Template;
