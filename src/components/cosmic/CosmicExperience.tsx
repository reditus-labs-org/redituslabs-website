"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  Code2,
  Database,
  Radio,
  Terminal,
  Cpu,
} from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { InquiryModal } from "@/components/modal/InquiryModal";
import { SERVICES } from "@/data/services";
import { PROJECTS } from "@/data/projects";
import { PROCESS_STEPS } from "@/data/process";
import { TECHNOLOGIES } from "@/data/technologies";
import { TESTIMONIALS } from "@/data/testimonials";
import styles from "./CosmicExperience.module.css";

const plans = [
  {
    name: "Standard",
    signal: "LOW EARTH ORBIT",
    price: "$300",
    cadence: "/ sprint",
    description:
      "A focused launch window for MVPs, interfaces, and high-performance web builds.",
    features: [
      "Dedicated senior engineer",
      "Weekly sprint transmission",
      "Frontend & landing page build",
      "Custom turnaround timeline",
    ],
    type: "Standard Plan",
  },
  {
    name: "Professional",
    signal: "PRIMARY TRAJECTORY",
    price: "$800",
    cadence: "/ sprint",
    description:
      "A dedicated product orbit for scaling SaaS systems, AI products, and complex platforms.",
    features: [
      "Full-stack application development",
      "Twice-weekly async updates",
      "UI/UX architecture included",
      "Dedicated engineering squad",
      "Priority sprint delivery",
    ],
    type: "Professional Plan",
    featured: true,
  },
  {
    name: "Senior",
    signal: "DEEP SPACE",
    price: "Custom",
    cadence: "mission",
    description:
      "A senior multidisciplinary crew for ambitious, security-critical, or long-range systems.",
    features: [
      "Lead + engineering + QA squad",
      "Architecture & security audits",
      "Advanced AI agent integration",
      "Continuous SLA support",
    ],
    type: "Custom Enterprise Plan",
  },
];

function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.sectionLabel}>
      <span>{index}</span>
      <i />
      <span>{children}</span>
    </div>
  );
}

export function CosmicExperience() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<string>();
  const [activeProject, setActiveProject] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [activeSat, setActiveSat] = useState<string | null>(null);
  const universeRef = useRef<HTMLElement>(null);

  const openInquiry = (type?: string) => {
    setInquiryType(type);
    setIsInquiryOpen(true);
  };

  useEffect(() => {
    const root = universeRef.current;
    if (!root) return;
    const nodes = root.querySelectorAll(`.${styles.reveal}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -16, y: x * 18 });
  };

  const handleHeroMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleNewsletter = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const project = PROJECTS[activeProject];

  return (
    <main ref={universeRef} className={styles.universe}>
      {/* Background Depth Layers */}
      <div className={styles.cosmos} aria-hidden="true">
        <div className={styles.starsFar} />
        <div className={styles.starsNear} />
        <div className={styles.nebulaPrimary} />
        <div className={styles.nebulaSecondary} />
        <div className={styles.gridOverlay} />
      </div>

      <Navbar onOpenInquiry={openInquiry} />

      {/* 01. HERO / COMMAND VIEWPORT */}
      <section
        id="hero"
        className={styles.hero}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <div className={styles.heroMeta}>
          <span>SECTOR 07 // DIGITAL OBSERVER</span>
          <span className={styles.online}>
            <i /> SYSTEM ONLINE &amp; OPERATIONAL
          </span>
        </div>

        <div className={styles.heroCopy}>
          <div className={`${styles.eyebrow} ${styles.reveal}`}>
            <Radio size={13} /> INDEPENDENT SOFTWARE &amp; AI STUDIO
          </div>

          <h1 className={`${styles.heroTitle} ${styles.reveal}`}>
            We engineer
            <br />
            <span>new realities.</span>
          </h1>

          <p className={`${styles.heroIntro} ${styles.reveal}`}>
            REDITUS transforms ambitious ideas, fragile prototypes, and complex
            data into resilient production software engineered for scale.
          </p>

          <div className={`${styles.heroActions} ${styles.reveal}`}>
            <button
              className={styles.primaryButton}
              onClick={() => openInquiry()}
            >
              <span>Initiate a project</span>
              <ArrowRight size={16} />
            </button>

            <a className={styles.textLink} href="#work">
              Explore mission log <ArrowDown size={14} />
            </a>
          </div>
        </div>

        {/* Interactive 3D Holographic Celestial Orbital Core */}
        <div
          className={styles.planetSystem}
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: "transform 0.15s cubic-bezier(0.1, 0.5, 0.1, 1)",
          }}
        >
          <div className={styles.planetGlow} />

          {/* Orbit Ring 1: Equatorial */}
          <div className={styles.orbitRingOuter}>
            <button
              type="button"
              className={`${styles.satelliteNode} ${styles.sat1}`}
              onMouseEnter={() => setActiveSat("SAT-01")}
              onMouseLeave={() => setActiveSat(null)}
              aria-label="Satellite 1: Software Architecture"
            >
              <i />
              <span className={styles.satTag}>SAT-01</span>
              {activeSat === "SAT-01" && (
                <div className={styles.satTooltip}>
                  <strong>SOFTWARE ARCHITECTURE</strong>
                  <small>Status: Scalable &amp; Production-Ready</small>
                </div>
              )}
            </button>
          </div>

          {/* Orbit Ring 2: Polar Inclined */}
          <div className={styles.orbitRingMiddle}>
            <button
              type="button"
              className={`${styles.satelliteNode} ${styles.sat2}`}
              onMouseEnter={() => setActiveSat("SAT-02")}
              onMouseLeave={() => setActiveSat(null)}
              aria-label="Satellite 2: AI Pipelines"
            >
              <i />
              <span className={styles.satTag}>SAT-02</span>
              {activeSat === "SAT-02" && (
                <div className={styles.satTooltip}>
                  <strong>AI &amp; DATA PIPELINES</strong>
                  <small>Status: High Throughput / LLMs</small>
                </div>
              )}
            </button>
          </div>

          {/* Orbit Ring 3: Counter Inner */}
          <div className={styles.orbitRingInner}>
            <button
              type="button"
              className={`${styles.satelliteNode} ${styles.sat3}`}
              onMouseEnter={() => setActiveSat("SAT-03")}
              onMouseLeave={() => setActiveSat(null)}
              aria-label="Satellite 3: Vibe Code Rescue"
            >
              <i />
              <span className={styles.satTag}>SAT-03</span>
              {activeSat === "SAT-03" && (
                <div className={styles.satTooltip}>
                  <strong>VIBE CODE RESCUE</strong>
                  <small>Status: Enterprise Hardening</small>
                </div>
              )}
            </button>
          </div>

          {/* Multi-layered Planetary Core Visual */}
          <div className={styles.planet}>
            <div className={styles.globeGridLines} />
            <div className={styles.auroraWave} />
            <div className={styles.planetLight} />
            <div className={styles.planetShade} />
            <div className={styles.equatorHalo} />
          </div>

          {/* Telemetry Readout Badge */}
          <div className={styles.planetLabel}>
            <div className={styles.labelBeacon}>
              <i />
              <span>OBJ–R/01 · STABLE ORBIT</span>
            </div>
            <div className={styles.labelReadout}>
              <span>ALT: 420 KM</span>
              <span>VEL: 7.66 KM/S</span>
            </div>
          </div>
        </div>

        {/* Telemetry Bar */}
        <div className={styles.heroTelemetry}>
          <div>
            <span>COORDINATES</span>
            <strong>
              12.904° N<br />
              77.624° E
            </strong>
          </div>
          <div>
            <span>CORE SYSTEMS</span>
            <strong>
              WEB · SOFTWARE
              <br />
              AI · SAAS
            </strong>
          </div>
          <div>
            <span>AVAILABILITY</span>
            <strong>
              SELECT MISSIONS
              <br />
              Q3 / 2026
            </strong>
          </div>
        </div>

        <a
          className={styles.scrollCue}
          href="#services"
          aria-label="Scroll to capabilities"
        >
          <span>SCROLL TO EXPLORE</span>
          <i />
        </a>
      </section>

      {/* SIGNAL MARQUEE */}
      <div className={styles.signalStrip} aria-label="Technology stack">
        <div className={styles.signalTrack}>
          {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, index) => (
            <span key={`${tech.name}-${index}`}>
              <i />
              {tech.name}
              <small>{tech.category}</small>
            </span>
          ))}
        </div>
      </div>

      {/* 02. CAPABILITIES / SERVICES */}
      <section id="services" className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <SectionLabel index="01">SYSTEM CAPABILITIES</SectionLabel>
            <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
              Built for the
              <br />
              <em>unknown ahead.</em>
            </h2>
          </div>
          <p className={`${styles.sectionIntro} ${styles.reveal}`}>
            We bridge the gap between ambitious vision and bulletproof software
            architecture. Every system is built to scale smoothly under heavy load.
          </p>
        </div>

        <div className={styles.serviceGrid}>
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`${styles.serviceCard} ${styles.reveal}`}
            >
              <div className={styles.cardTop}>
                <span>MODULE 0{index + 1}</span>
                <span>{service.id.toUpperCase()}</span>
              </div>

              <div className={styles.serviceGlyph}>
                <span>
                  {index === 0 && <Code2 />}
                  {index === 1 && <Cpu />}
                  {index === 2 && <Database />}
                  {index === 3 && <Terminal />}
                </span>
                <i />
                <i />
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <ul>
                {service.features.map((item: string) => (
                  <li key={item}>
                    <Check size={14} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 03. MISSION RECOVERY (VIBE RESCUE) */}
      <section id="rescue" className={styles.section}>
        <div className={styles.rescue}>
          <div className={`${styles.rescueVisual} ${styles.reveal}`}>
            <div className={styles.brokenCore}>
              <span>!</span>
            </div>
            <div className={styles.rescueOrbit}>
              <i />
              <i />
              <i />
            </div>
            <div className={styles.scanLine} />
            <div className={styles.visualCode}>SYS_DIAG // ERROR: UNSTABLE</div>
            <div className={styles.visualStatus}>RECOVERY SEQUENCE READY</div>
          </div>

          <div className={styles.rescueCopy}>
            <SectionLabel index="02">VIBE CODE RESCUE</SectionLabel>

            <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
              We fix fragile
              <br />
              <em>prototypes.</em>
            </h2>

            <p className={`${styles.rescueLead} ${styles.reveal}`}>
              Built a fast prototype with AI or low-code tools that is now slowing down
              or breaking under load? We audit, clean up, and rebuild your application
              into production-ready software.
            </p>

            <div className={`${styles.diagnostics} ${styles.reveal}`}>
              <div>
                <span>01</span>
                <p>Architecture &amp; State Audit</p>
                <strong>COMPLETE</strong>
              </div>
              <div>
                <span>02</span>
                <p>Security &amp; API Hardening</p>
                <strong>COMPLETE</strong>
              </div>
              <div>
                <span>03</span>
                <p>Database &amp; Pipeline Scale</p>
                <strong>COMPLETE</strong>
              </div>
            </div>

            <button
              className={styles.primaryButton}
              onClick={() => openInquiry("Vibe Code Rescue")}
            >
              <span>Request System Audit</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 04. FLIGHT RECORD (WORK / PROJECTS) */}
      <section id="work" className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <SectionLabel index="03">FLIGHT RECORD</SectionLabel>
            <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
              Systems already
              <br />
              <em>in orbit.</em>
            </h2>
          </div>
          <div className={styles.projectCounter}>
            0{activeProject + 1} <span>/ 0{PROJECTS.length}</span>
          </div>
        </div>

        <div className={styles.missionPanel}>
          <div className={styles.missionNav}>
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                className={idx === activeProject ? styles.activeMission : ""}
                onClick={() => setActiveProject(idx)}
              >
                <span>0{idx + 1}</span>
                <strong>{proj.title}</strong>
                <small>{proj.category}</small>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>

          <div className={styles.missionDetail}>
            <div className={styles.missionVisual}>
              <div className={styles.radar}>
                <i />
                <i />
                <i />
                <i />
                <span />
              </div>
              <div className={styles.radarLabel}>
                BEACON LOG: {project.id.toUpperCase()}
                <br />
                STATUS: DEPLOYED TO PRODUCTION
              </div>
            </div>

            <div className={styles.missionCopy}>
              <h3>{project.title}</h3>
              <p className={styles.missionDescription}>{project.description}</p>

              <div className={styles.challenge}>
                <span>CHALLENGE</span>
                <p>{project.challenge}</p>
              </div>

              <div className={styles.solution}>
                <span>SOLUTION</span>
                <p>{project.solution}</p>
              </div>

              {project.metrics && project.metrics.length > 0 && (
                <div className={styles.metrics}>
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.stack}>
                {project.techStack.map((t: string) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. LAUNCH SEQUENCE (PROCESS) */}
      <section id="process" className={`${styles.section} ${styles.process}`}>
        <div className={styles.processHeader}>
          <SectionLabel index="04">LAUNCH SEQUENCE</SectionLabel>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            From first signal
            <br />
            <em>to stable orbit.</em>
          </h2>
          <p className={`${styles.reveal}`}>
            A structured, transparent engineering process designed to keep speed high
            and risks low.
          </p>
        </div>

        <div className={styles.trajectory}>
          <div className={styles.trajectoryLine} />

          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className={styles.processStep}>
              <div className={styles.processNode}>
                <span>{step.number}</span>
              </div>

              <div className={`${styles.processCard} ${styles.reveal}`}>
                <span>PHASE {step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <small>OUTPUT: {step.outputArtifact}</small>
              </div>

              <div className={styles.benchmark}>
                <span>{step.benchmarkTarget}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06. ENGAGEMENT ORBITS (PRICING) */}
      <section id="pricing" className={styles.section}>
        <div className={styles.sectionHead}>
          <div>
            <SectionLabel index="05">ENGAGEMENT ORBITS</SectionLabel>
            <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
              Choose your
              <br />
              <em>trajectory.</em>
            </h2>
          </div>
          <p className={`${styles.sectionIntro} ${styles.reveal}`}>
            Transparent engagement models tailored to your build phase. No surprise costs,
            just dedicated engineering capacity.
          </p>
        </div>

        <div className={styles.planGrid}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${styles.plan} ${
                plan.featured ? styles.featuredPlan : ""
              } ${styles.reveal}`}
            >
              <div className={styles.planSignal}>
                <span>{plan.signal}</span>
                {plan.featured && <strong>MOST POPULAR</strong>}
              </div>

              <div className={styles.planOrbit}>
                <i />
                <span>{plan.name[0]}</span>
              </div>

              <h3>{plan.name}</h3>
              <p>{plan.description}</p>

              <div className={styles.planPrice}>
                <strong>{plan.price}</strong>
                <span>{plan.cadence}</span>
              </div>

              <ul>
                {plan.features.map((feat) => (
                  <li key={feat}>
                    <Check size={14} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => openInquiry(plan.type)}>
                <span>Select Trajectory</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 07. GROUND CONTROL (TESTIMONIALS) */}
      <section className={`${styles.section} ${styles.testimonials}`}>
        <SectionLabel index="06">GROUND CONTROL TRANSMISSIONS</SectionLabel>

        <div className={styles.quoteMark}>“</div>

        <blockquote className={styles.reveal}>
          {TESTIMONIALS[0].quote}
        </blockquote>

        <div className={`${styles.quoteMeta} ${styles.reveal}`}>
          <strong>{TESTIMONIALS[0].author}</strong>
          <span>
            {TESTIMONIALS[0].role.toUpperCase()} — {TESTIMONIALS[0].company.toUpperCase()}
          </span>
        </div>

        <div className={styles.sampleNotice}>
          TRANSMISSION VERIFIED // GROUND CONTROL LOG
        </div>
      </section>

      {/* 08. OPEN CHANNEL (CONTACT CTA) */}
      <section id="contact" className={styles.finalSignal}>
        <div className={styles.finalOrb}>
          <i />
          <i />
          <i />
        </div>

        <div className={styles.finalContent}>
          <SectionLabel index="07">OPEN CHANNEL</SectionLabel>
          <h2 className={`${styles.reveal}`}>
            Have something
            <br />
            <em>impossible in mind?</em>
          </h2>
          <p className={`${styles.reveal}`}>
            Let&apos;s turn your vision into production software engineered to last.
          </p>

          <button
            className={styles.primaryButton}
            onClick={() => openInquiry("General Inquiry")}
          >
            <span>Transmit Project Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <strong>REDITUS LABS</strong>
            <span>ADVANCED SOFTWARE &amp; AI ENGINEERING</span>
          </div>

          <div className={styles.newsletter}>
            <label htmlFor="signal-email">
              SUBSCRIBE TO FREQUENCY (MONTHLY INSIGHTS)
            </label>
            <form onSubmit={handleNewsletter}>
              <div>
                <input
                  id="signal-email"
                  type="email"
                  placeholder="enter email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" aria-label="Subscribe to newsletter">
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
            {subscribed && <span>SIGNAL RECEIVED. WELCOME ABOARD.</span>}
          </div>

          <div className={styles.footerLinks}>
            <div>
              <span>NAVIGATION</span>
              <a href="#services">Capabilities</a>
              <a href="#rescue">Vibe Rescue</a>
              <a href="#work">Flight Record</a>
              <a href="#process">Process</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div>
              <span>LEGAL</span>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <button onClick={() => openInquiry("Contact")}>
                Direct Channel
              </button>
            </div>
          </div>
        </div>

        <div className={styles.wordmark}>REDITUS</div>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} REDITUS LABS. ALL RIGHTS RESERVED.</span>
          <div>
            <Link href="/privacy">PRIVACY</Link>
            <Link href="/terms">TERMS</Link>
          </div>
        </div>
      </footer>

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialType={inquiryType}
      />
    </main>
  );
}
