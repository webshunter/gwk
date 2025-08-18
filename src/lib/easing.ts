import { CustomEase } from "./gsap";

export const EASING = {
  custom: CustomEase.create("custom", "0.55, 0, 0.21, 1"),
  primary: CustomEase.create("primary", "0.62, 0.05, 0.01, 0.99"),
} as const;
