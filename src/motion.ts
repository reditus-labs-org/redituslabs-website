import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Lenis from 'lenis';

/** Editorial motion: preserve the composition, lead the eye, then get out of the way. */
export function initMotion(root: HTMLElement = document.body): () => void {
  gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);
  const abort = new AbortController();
  const { signal } = abort;
  const media = gsap.matchMedia();
  const ownedTabIndexes = new Set<HTMLElement>();
  let lenis: Lenis | undefined;
  const menu = root.querySelector<HTMLButtonElement>('#menu-toggle');
  const nav = root.querySelector<HTMLElement>('#main-nav');
  const desktopNav = window.matchMedia('(min-width: 768px)');

  const setMenu = (open: boolean) => {
    menu?.setAttribute('aria-expanded', String(open));
    menu?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };
  menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'), { signal });
  desktopNav.addEventListener('change', () => { if (desktopNav.matches) setMenu(false); }, { signal });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menu.focus();
    }
  }, { signal });
  document.addEventListener('click', (event) => {
    if (event.target instanceof Element && !event.target.closest('#main-nav, #menu-toggle')) setMenu(false);
  }, { signal });
  root.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const hash = anchor.getAttribute('href');
    if (!hash || hash === '#') return;
    let id: string;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target || !root.contains(target)) return;
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      ownedTabIndexes.add(target);
    }
    setMenu(false);
    if (!lenis) return;
    event.preventDefault();
    if (window.location.hash !== hash) history.pushState(null, '', hash);
    // A pinned element's live rectangle no longer identifies its document start.
    const pin = ScrollTrigger.getAll().find((trigger) => trigger.pin === target);
    lenis.scrollTo(pin ? Math.max(0, pin.start) : target, {
      offset: -12,
      duration: 1.15,
      onComplete: () => { if (!signal.aborted) target.focus({ preventScroll: true }); },
    });
  }, { signal });

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const smooth = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      prevent: (node) => Boolean(node.closest('dialog, [data-native-scroll]')),
    });
    lenis = smooth;
    smooth.on('scroll', ScrollTrigger.update);
    const tick = (seconds: number) => { if (!document.hidden) smooth.raf(seconds * 1000); };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const textSplits: SplitText[] = [];
    {
      const heroHeading = root.querySelector<HTMLElement>('#hero-heading');
      if (heroHeading) {
        textSplits.push(SplitText.create(heroHeading, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          aria: 'auto',
          onSplit: (split) => {
            gsap.set(split.masks, { paddingBottom: '0.12em', marginBottom: '-0.12em' });
            return gsap.from(split.lines, {
              yPercent: 112,
              rotation: 1.5,
              transformOrigin: 'left bottom',
              duration: 1.15,
              stagger: 0.12,
              ease: 'power4.out',
              clearProps: 'transform',
            });
          },
        }));
        gsap.from(root.querySelectorAll('.hero-copy > p, .hero-copy > .text-link'), {
          y: 22, opacity: 0, duration: 0.85, delay: 0.35, stagger: 0.1,
          ease: 'power3.out', clearProps: 'transform,opacity',
        });
      }
      root.querySelectorAll<HTMLElement>('[data-reveal], .reveal').forEach((element, index) => {
        if (element.classList.contains('hero-copy')) return;
        const initial = element.closest('#home') !== null;
        gsap.from(element, {
          y: initial ? 24 : 20,
          opacity: 0,
          duration: initial ? 0.9 : 0.7,
          delay: initial ? Math.min(index * 0.07, 0.28) : 0,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          ...(initial ? {} : { scrollTrigger: { trigger: element, start: 'top 94%', once: true } }),
        });
      });
    }
    return () => {
      textSplits.forEach((split) => { split.kill(); split.revert(); });
      gsap.ticker.remove(tick);
      smooth.destroy();
      lenis = undefined;
    };
  }, root);

  media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const addedProgress: HTMLElement[] = [];
    let heroProgress = 0;
    const hero = root.querySelector<HTMLElement>('#home');
    const heroStage = root.querySelector<HTMLElement>('.hero-stage') ?? hero;
    if (hero && heroStage) {
      const canPin = heroStage.offsetHeight <= window.innerHeight + 2;
      const camera = gsap.timeline({ scrollTrigger: {
        trigger: heroStage,
        start: 'top top',
        end: canPin ? () => `+=${Math.round(window.innerHeight * 0.65)}` : 'bottom top',
        pin: canPin,
        pinSpacing: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      } });
      const layers: Array<[string, number, number]> = [
        ['.hero-sun', -15, 1.015],
        ['.mountain-back', -25, 1.025],
        ['.mountain-summit', -60, 1.04],
        ['.mountain-front', -120, 1.065],
      ];
      camera.eventCallback('onUpdate', () => { heroProgress = camera.progress(); });
      layers.forEach(([selector, y, scale]) => {
        const layer = hero.querySelector(selector);
        if (layer) camera.to(layer, { y, scale, transformOrigin: '55% 65%', duration: 1, ease: 'none' }, 0);
      });
    }

    const aboutArt = root.querySelector<HTMLElement>('.about-art');
    if (aboutArt) {
      const pieces = aboutArt.querySelectorAll<HTMLElement>('[class*="collage-piece"]');
      const assembly = gsap.timeline({ scrollTrigger: {
        trigger: aboutArt, start: 'top 88%', end: 'center 57%', scrub: 0.65,
      } });
      pieces.forEach((piece, index) => {
        assembly.from(piece, {
          x: index % 2 === 0 ? -24 : 26,
          y: index % 3 === 0 ? 26 : -18,
          rotation: index % 2 === 0 ? -3 : 2.5,
          scale: 0.98,
          transformOrigin: 'center center',
          duration: 1,
          ease: 'power2.out',
        }, index * 0.1);
      });
    }

    root.querySelectorAll<HTMLElement>('.mission-art').forEach((art) => {
      gsap.fromTo(art, { clipPath: 'inset(0 85% 0 0)', scale: 1.08 }, {
        clipPath: 'inset(0 0% 0 0)', scale: 1, ease: 'power2.out',
        scrollTrigger: { trigger: art, start: 'top 88%', end: 'center 58%', scrub: 0.7 },
      });
    });
    root.querySelectorAll<HTMLElement>('.service-art').forEach((art, index) => {
      gsap.from(art, {
        rotation: index % 2 === 0 ? -9 : 8,
        y: 28,
        scale: 0.88,
        clipPath: index % 2 === 0 ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)',
        transformOrigin: '50% 70%',
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform,clipPath',
        scrollTrigger: { trigger: art, start: 'top 92%', once: true },
      });
    });

    const process = root.querySelector<HTMLElement>('#process');
    const processStage = root.querySelector<HTMLElement>('.process-stage') ?? process;
    const steps = process ? [...process.querySelectorAll<HTMLElement>('.process-step')] : [];
    if (process && processStage) {
      const canPin = processStage.offsetHeight <= window.innerHeight + 2;
      let currentStep = -1;
      const journey = gsap.timeline({ scrollTrigger: {
        trigger: processStage,
        start: canPin ? 'top top' : 'top 48%',
        end: canPin ? () => `+=${Math.round(window.innerHeight * 1.15)}` : 'bottom 58%',
        pin: canPin,
        pinSpacing: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
          if (next === currentStep) return;
          currentStep = next;
          steps.forEach((step, index) => {
            step.classList.toggle('is-current', index === next);
            if (index === next) step.setAttribute('aria-current', 'step');
            else step.removeAttribute('aria-current');
          });
          processStage.dataset.activeStage = String(next + 1);
        },
      } });
      const path = process.querySelector<SVGPathElement>('#journey-path');
      const marker = process.querySelector<SVGElement>('.journey-marker');
      if (path && marker) {
        const length = path.getTotalLength();
        if (length > 0) {
          journey.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
            strokeDashoffset: 0, duration: 4, ease: 'none',
          }, 0);
          journey.to(marker, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5], autoRotate: false, start: 0, end: 1 },
            duration: 4,
            ease: 'none',
          }, 0);
        }
      }
      const road = process.querySelector<HTMLElement>('.road-scene');
      if (road) journey.fromTo(road, { scale: 1.025, y: 18 }, {
        scale: 1, y: -12, duration: 4, transformOrigin: 'center center', ease: 'none',
      }, 0);
      steps.forEach((step, index) => {
        const track = step.querySelector<HTMLElement>('.step-track i');
        if (track) {
          const progress = document.createElement('span');
          progress.setAttribute('aria-hidden', 'true');
          progress.style.cssText = 'position:absolute;inset:-1px 0;height:2px;background:#ff581b;transform:scaleX(0);transform-origin:left center;pointer-events:none';
          track.append(progress);
          addedProgress.push(progress);
          journey.to(progress, { scaleX: 1, duration: 1, ease: 'none' }, index);
        }
        journey.to(step.querySelectorAll('h3, .step-track .mono'), {
          color: '#d44b1c', duration: 0.3,
        }, index + 0.3);
      });
    }

    root.querySelectorAll<HTMLElement>('.contact-art').forEach((art) => {
      gsap.from(art, {
        y: 70, scale: 1.045, transformOrigin: 'right bottom', ease: 'power2.out',
        scrollTrigger: { trigger: art, start: 'top 95%', end: 'center 62%', scrub: 0.65 },
      });
    });

    const local = new AbortController();
    const canvas = root.querySelector<HTMLCanvasElement>('#hero-webgl');
    let disposeScene: (() => void) | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      void import('./hero-webgl').then(async ({ initHeroWebGL }) => {
        if (local.signal.aborted || !canvas) return;
        const dispose = await initHeroWebGL(canvas, local.signal, () => heroProgress);
        if (local.signal.aborted) dispose();
        else disposeScene = dispose;
      }).catch(() => { if (canvas) canvas.hidden = true; });
    }, { rootMargin: '120px' });
    if (canvas) observer.observe(canvas);
    return () => {
      local.abort();
      observer.disconnect();
      disposeScene?.();
      addedProgress.forEach((element) => element.remove());
      steps.forEach((step) => { step.classList.remove('is-current'); step.removeAttribute('aria-current'); });
      if (processStage) delete processStage.dataset.activeStage;
    };
  }, root);

  const links = [...root.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]')];
  const currentSections = new Map<string, number>();
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => currentSections.set(entry.target.id, entry.intersectionRatio));
    const activeId = [...currentSections].sort((a, b) => b[1] - a[1])[0]?.[0];
    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-10% 0px -40% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
  root.querySelectorAll('section[id]').forEach((section) => sectionObserver.observe(section));
  const refresh = () => { if (!signal.aborted) ScrollTrigger.refresh(); };
  document.fonts.ready.then(refresh);
  root.addEventListener('load', refresh, { signal, capture: true });
  return () => {
    abort.abort();
    media.revert();
    sectionObserver.disconnect();
    ownedTabIndexes.forEach((element) => element.removeAttribute('tabindex'));
    links.forEach((link) => { link.classList.remove('is-active'); link.removeAttribute('aria-current'); });
    setMenu(false);
  };
}
