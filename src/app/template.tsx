"use client";

import React from "react";

import ReactLenis from "lenis/react";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import useSplitTextAnimation from "@/hook/useSplitTextAnimation";
import useRevealAnimation from "@/hook/useRevealAnimation";

const Template = ({ children }: { children: React.ReactNode }) => {
  useSplitTextAnimation({
    selector: ".split",
  });
  useRevealAnimation({
    selector: ".reveal",
  });

  return (
    <ReactLenis root>
      <Navbar />
      {children}
      <Footer />
    </ReactLenis>
  );
};

export default Template;
