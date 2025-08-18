import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin, MorphSVGPlugin } from "gsap/all";

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  useGSAP,
  CustomEase,
  DrawSVGPlugin,
  MorphSVGPlugin
);

export {
  gsap,
  ScrollTrigger,
  SplitText,
  useGSAP,
  CustomEase,
  DrawSVGPlugin,
  MorphSVGPlugin,
};
