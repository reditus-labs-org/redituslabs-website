import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenisInstance: Lenis | null = null;

const tick = (time: number) => lenisInstance?.raf(time * 1000);

export function initLenis(): Lenis {
  if (typeof window === 'undefined') return {} as Lenis;
  
  if (lenisInstance) {
    return lenisInstance;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenisInstance = new Lenis({
    duration: prefersReducedMotion ? 0.1 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !prefersReducedMotion,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add(tick);

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function destroyLenis(): void {
  if (lenisInstance) {
    gsap.ticker.remove(tick);
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
