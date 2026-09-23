import { useEffect, type RefObject } from 'react';
import { gsap, ScrollTrigger } from './gsap';

export function useReveal(
  targetRef: RefObject<HTMLElement | null>,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    trigger?: RefObject<HTMLElement | null>;
    start?: string;
  } = {}
) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const triggerEl = options.trigger?.current || el;
      const targetItems = el.children.length > 1 && options.stagger ? Array.from(el.children) : [el];
      
      ScrollTrigger.create({
        trigger: triggerEl,
        start: options.start ?? 'top 95%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            targetItems,
            { opacity: 0.3, y: options.y ?? 25 },
            { 
              opacity: 1, 
              y: 0, 
              duration: options.duration ?? 0.7, 
              stagger: options.stagger ?? 0.08, 
              ease: 'power3.out',
              clearProps: 'transform,opacity'
            }
          );
        },
      });
    }, el);

    return () => ctx.revert();
  }, [targetRef, options.y, options.duration, options.delay, options.stagger, options.start]);
}

export function useParallax(
  targetRef: RefObject<HTMLElement | null>,
  strength: number = 25,
  triggerRef?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const trigger = triggerRef?.current || el;
      gsap.fromTo(
        el,
        { y: -strength },
        {
          y: strength,
          ease: 'none',
          scrollTrigger: {
            trigger: trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [targetRef, strength, triggerRef]);
}
