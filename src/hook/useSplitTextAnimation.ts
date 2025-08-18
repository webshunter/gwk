import { useGSAP } from "@/lib/gsap";
import { gsap, ScrollTrigger, SplitText } from "../lib/gsap";
import { EASING } from "@/lib/easing";

export default function useSplitTextAnimation({
  selector,
  type = "lines",
  stagger = 0.1,
  startDesktop = "top bottom",
  startMobile = "top bottom",
  delay = null,
  delayMobile = 0,
  markers = false,
  enabled = true,
}: {
  selector: string;
  type?: "lines" | "words" | "chars";
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

    gsap.delayedCall(0.1, () => {
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

          // Select all elements that match the class name
          const elements = document.querySelectorAll(selector);

          // Loop over each element
          elements.forEach((element) => {
            const splitTextInstance = new SplitText(element, {
              type: type,
            });

            const splitElements = gsap.utils.toArray(splitTextInstance[type]);

            gsap.set(splitElements, {
              clipPath: "inset(0% 0% 100% 0%)",
              yPercent: 100,
              rotate: "1deg",
              marginRight: "-16px",
              paddingRight: "16px",
              marginBottom: "-16px",
              paddingBottom: "16px",
            });

            // Create the ScrollTrigger
            const scrollTrigger = ScrollTrigger.create({
              trigger: element, // Set the trigger for this specific element
              start: desktop ? startDesktop : startMobile, // Adjust this if necessary
              markers: markers,
              onEnter: () => {
                gsap.to(splitElements, {
                  clipPath: "inset(0% 0% 0% 0%)",
                  yPercent: 0,
                  rotate: "0deg",
                  duration: 1.47,
                  stagger: stagger,
                  delay: desktop ? delay ?? 0 : delayMobile,
                  ease: EASING.primary,
                });
              },
            });

            return () => {
              scrollTrigger.kill(); // Clean up the ScrollTrigger
              splitTextInstance.revert();
            };
          });
        }
      );
    });
  }, [selector, type, stagger, delay, enabled]);
}
