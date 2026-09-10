import React, { useRef, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../animation/gsap';
import './Hero.css';

interface HeroProps {
  onOpenConversation?: () => void;
  onNavigate?: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConversation, onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillarRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. GSAP Load Timeline Sequence
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Background image settles subtly
      tl.fromTo(
        bgImgRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1.0, opacity: 1, duration: 1.4, ease: 'power2.out' }
      )
      // Split headline reveals line by line
      .fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current],
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.0, stagger: 0.15, ease: 'power3.out' },
        '-=1.0'
      )
      // Supporting body copy rises subtly
      .fromTo(
        descRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      // CTA reveals
      .fromTo(
        ctaRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.5'
      )
      // Right pillar message finishes
      .fromTo(
        pillarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      // Scroll indicator begins motion
      .fromTo(
        scrollRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      );

      // 2. Scroll Choreography
      if (sectionRef.current) {
        // Headline drifts horizontally
        if (headlineRef.current) {
          gsap.to(headlineRef.current, {
            x: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.4,
            },
          });
        }

        // Background visual slowly scales
        if (bgImgRef.current) {
          gsap.to(bgImgRef.current, {
            scale: 1.04,
            y: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          });
        }

        // Foreground elements drift subtly
        if (descRef.current && ctaRef.current) {
          gsap.to([descRef.current, ctaRef.current], {
            y: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.4,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollClick = () => {
    const next = document.querySelector('.trusted-bar');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={sectionRef} className="hero-editorial-section">
      {/* Full-bleed Cinematic Architectural Visual */}
      <div className="hero-editorial-bg-wrap">
        <picture className="hero-editorial-bg-picture">
          <source media="(min-aspect-ratio: 1/1)" srcSet="/assets/images/hero_landscape_pc.png" />
          <img
            ref={bgImgRef}
            src="/assets/images/hero_reference_visual.png"
            alt="REDITUS monumental brutalist architectural portal opening at dawn with distant mountains and reflective terrace"
            className="hero-editorial-bg-img"
          />
        </picture>
      </div>

      {/* Main Viewport Content Frame */}
      <div className="hero-editorial-stage">
        {/* Left Narrative Block */}
        <div className="hero-editorial-left-block">
          <div className="hero-editorial-eyebrow">
            A PRODUCT ENGINEERING STUDIO
          </div>

          <h1 ref={headlineRef} className="hero-editorial-headline">
            <span className="serif-line-wrap">
              <span ref={line1Ref} className="serif-line white-text">From</span>
            </span>
            <span className="serif-line-wrap">
              <span ref={line2Ref} className="serif-line white-text">ideas to</span>
            </span>
            <span className="serif-line-wrap">
              <span ref={line3Ref} className="serif-line champagne-text">possibilities.</span>
            </span>
          </h1>

          <p ref={descRef} className="hero-editorial-body">
            We build digital products, AI systems and scalable{' '}<br />
            software — from first idea to production, and from{' '}<br />
            unfinished software to reliable systems.
          </p>

          <div ref={ctaRef} className="hero-editorial-cta-group">
            <a
              href="#contact"
              className="hero-primary-white-btn"
              onClick={(e) => {
                if (onOpenConversation) {
                  e.preventDefault();
                  onOpenConversation();
                }
              }}
            >
              <span>Start a conversation</span>
              <ArrowRight size={13} className="btn-arrow" />
            </a>

            <a
              href="#story"
              className="hero-play-watch-btn"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('story');
              }}
            >
              <span className="play-ring">
                <Play size={10} fill="currentColor" />
              </span>
              <span>Watch our story</span>
            </a>
          </div>
        </div>

        {/* Right Architecture Pillar Text */}
        <div ref={pillarRef} className="hero-editorial-right-pillar">
          <div className="pillar-block">
            <div className="pillar-hairline top-hairline" />
            <div className="pillar-motto-stack">
              <span>RETURN.</span>
              <span>REIMAGINE.</span>
              <span>REALIZE.</span>
            </div>
            <div className="pillar-hairline bottom-hairline" />
          </div>
        </div>

        {/* Lower Right Secondary Editorial Note */}
        <div className="pillar-accent-note">
          SAME PROBLEMS.<br />
          HIGHER POSSIBILITIES.
        </div>
      </div>

      {/* Bottom Left Scroll Indicator */}
      <div ref={scrollRef} className="hero-editorial-scroll-row" role="button" tabIndex={0} aria-label="Scroll to what we build" onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleScrollClick(); } }} onClick={handleScrollClick}>
        <div className="editorial-scroll-track">
          <div className="editorial-scroll-circle" />
        </div>
        <span className="editorial-scroll-label">SCROLL</span>
      </div>
    </section>
  );
};
