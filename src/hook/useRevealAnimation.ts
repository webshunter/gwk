import { useGSAP } from "@/lib/gsap";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { EASING } from "@/lib/easing";

export default function useRevealAnimation({
  selector,
  stagger = 0.1,
  startDesktop = "top bottom",
  startMobile = "top bottom",
  delay = null,
  delayMobile = 0,
  markers = false,
  enabled = true,
}: {
  selector: string;
  stagger?: number;
  startDesktop?: string;
  startMobile?: string;
  delay?: number | null;
  delayMobile?: number;
  markers?: boolean;
  enabled?: boolean;
}) {
  useGSAP(() => {
    if (!enabled) return;

    // Check if selector is valid (not empty or null)
    if (!selector || selector.trim() === "") return;

    gsap.delayedCall(0.1, () => {
      // Check if elements exist before setting up animations
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isPortrait: "(orientation: portrait)",
          isLandscape: "(orientation: landscape)",
          desktop: "(min-width: 768px) and (orientation: landscape)",
          maxXXs: "(max-width: 767.98px)",
        },
        (context) => {
          const desktop = context.conditions?.desktop ?? false;

          // Check selector again and select all elements that match the class name
          if (!selector || selector.trim() === "") return;
          const elements = document.querySelectorAll(selector);

          // Only proceed if elements exist
          if (elements.length === 0) return;

          // Set initial state for all elements
          gsap.set(elements, {
            clipPath: "inset(0% 0% 100% 0%)",
            y: "100%",
            autoAlpha: 0,
          });

          // Loop over each element to create individual ScrollTriggers
          elements.forEach((element) => {
            // Create the ScrollTrigger
            const scrollTrigger = ScrollTrigger.create({
              markers: markers,
              trigger: element, // Set the trigger for this specific element
              start: desktop ? startDesktop : startMobile, // Adjust this if necessary
              onEnter: () => {
                gsap.to(element, {
                  clipPath: "inset(0% 0% 0% 0%)",
                  y: "0%",
                  autoAlpha: 1,
                  duration: 1.2,
                  delay: desktop ? delay ?? 0 : delayMobile,
                  ease: EASING.custom,
                });
              },
            });

            return () => {
              scrollTrigger.kill(); // Clean up the ScrollTrigger
            };
          });
        }
      );
    });
  }, [
    selector,
    stagger,
    delay,
    delayMobile,
    startDesktop,
    startMobile,
    markers,
    enabled, // Add enabled to dependencies
  ]);
}
