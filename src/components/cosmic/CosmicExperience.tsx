"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  CircleDot,
  Code2,
  Database,
  Orbit,
  Radio,
  Sparkles,
  Terminal,
  ShieldCheck,
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const universeRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 26; // deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -26; // deg
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

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
      <section id="hero" className={styles.hero}>
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

        {/* REDITUS Isometric "R" Monogram Emblem (Static Clean Visual) */}
        <div
          className={styles.heroMonogramContainer}
          aria-label="REDITUS R Monogram Emblem"
        >
          <img
            src="/reditus-logo.png"
            alt="REDITUS R Monogram"
            className={styles.heroMonogramImage}
          />
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
            <span key={`${tech.id}-${index}`}>
              <i />
              {tech.name}
              <small>{tech.category}</small>
            </span>
          ))}
        </div>
      </div>

      {/* 02. CAPABILITY SECTORS (SERVICES) */}
      <section
        id="services"
        className={`${styles.section} ${styles.capabilities}`}
      >
        <div className={styles.sectionHead}>
          <div>
            <SectionLabel index="01">CAPABILITY SECTORS</SectionLabel>
            <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
              Built for the
              <br />
              <em>unknown ahead.</em>
            </h2>
          </div>
          <p className={`${styles.sectionIntro} ${styles.reveal}`}>
            We fuse product architecture with serious engineering—giving every
            idea the intelligence, systems, and craft required for orbit.
          </p>
        </div>

        <div className={styles.serviceGrid}>
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              className={`${styles.serviceCard} ${styles.reveal}`}
            >
              <div className={styles.cardTop}>
                <span>SEC–{service.number}</span>
                <CircleDot size={15} />
              </div>

              <div className={styles.serviceGlyph} aria-hidden="true">
                <span>
                  {index === 0 ? (
                    <Code2 />
                  ) : index === 1 ? (
                    <Database />
                  ) : index === 2 ? (
                    <Sparkles />
                  ) : (
                    <Orbit />
                  )}
                </span>
                <i />
                <i />
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <ul>
                {service.features.map((feature) => (
                  <li key={feature}>
                    <ChevronRight size={11} />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* 03. VIBE CODE RESCUE */}
      <section
        id="vibe-rescue"
        className={`${styles.rescue} ${styles.section}`}
      >
        <div className={styles.rescueVisual} aria-hidden="true">
          <div className={styles.scanLine} />
          <div className={styles.brokenCore}>
            <span>!</span>
          </div>
          <div className={styles.rescueOrbit}>
            <i />
            <i />
            <i />
          </div>
          <span className={styles.visualCode}>
            ERR_04 / STRUCTURAL INSTABILITY
          </span>
          <span className={styles.visualStatus}>
            RECONSTRUCTION PATH: READY
          </span>
        </div>

        <div className={styles.rescueCopy}>
          <SectionLabel index="02">MISSION RECOVERY</SectionLabel>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            Your prototype
            <br />
            isn&apos;t a dead end.
          </h2>
          <p className={styles.rescueLead}>
            We turn vibe-coded applications and fragile MVPs into secure,
            type-safe, production-ready software.
          </p>

          <div className={styles.diagnostics}>
            {[
              "Architecture & schema audit",
              "Security & auth hardening",
              "Latency & query optimization",
              "Zero-downtime deployment",
            ].map((item, i) => (
              <div key={item}>
                <span>0{i + 1}</span>
                <p>{item}</p>
                <strong>VERIFIED</strong>
              </div>
            ))}
          </div>

          <button
            className={styles.outlineButton}
            onClick={() => openInquiry("vibe-rescue")}
          >
            Request a rescue audit <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* 04. FLIGHT RECORD (PROJECTS / CASE STUDIES) */}
      <section id="work" className={`${styles.section} ${styles.work}`}>
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
          <nav className={styles.missionNav} aria-label="Select case study">
            {PROJECTS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveProject(index)}
                className={activeProject === index ? styles.activeMission : ""}
              >
                <span>0{index + 1}</span>
                <strong>{item.title}</strong>
                <small>{item.tag}</small>
                <ArrowRight size={14} />
              </button>
            ))}
          </nav>

          <article key={project.id} className={styles.missionDetail}>
            <div className={styles.missionVisual}>
              <div className={styles.radar}>
                <i />
                <i />
                <i />
                <i />
                <span />
              </div>
              <span className={styles.radarLabel}>
                {project.category}
                <br />
                LIVE SYSTEM
              </span>
            </div>

            <div className={styles.missionCopy}>
              <span className={styles.sectionLabel}>
                {project.tag} / CASE STUDY
              </span>
              <h3>{project.title}</h3>
              <p className={styles.missionDescription}>
                {project.description}
              </p>

              <div className={styles.challenge}>
                <span>MISSION BRIEF</span>
                <p>{project.challenge}</p>
              </div>

              <div className={styles.solution}>
                <span>ENGINEERED RESPONSE</span>
                <p>{project.solution}</p>
              </div>

              <div className={styles.metrics}>
                {project.metrics?.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className={styles.stack}>
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 05. LAUNCH SEQUENCE (PROCESS) */}
      <section id="process" className={`${styles.section} ${styles.process}`}>
        <div className={styles.processHeader}>
          <SectionLabel index="04">LAUNCH SEQUENCE</SectionLabel>
          <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
            From first signal
            <br />
            to stable orbit.
          </h2>
          <p>
            No black boxes. A disciplined trajectory from technical audit to a
            resilient production deployment.
          </p>
        </div>

        <div className={styles.trajectory}>
          <div className={styles.trajectoryLine} />
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.number}
              className={`${styles.processStep} ${styles.reveal}`}
            >
              <div className={styles.processNode}>
                <span>{step.number}</span>
              </div>
              <div className={styles.processCard}>
                <span>{step.subtitle}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <small>OUTPUT / {step.outputArtifact}</small>
              </div>
              <div className={styles.benchmark}>{step.benchmarkTarget}</div>
            </article>
          ))}
        </div>
      </section>

      {/* 06. ENGAGEMENT ORBITS (PRICING) */}
      <section id="pricing" className={`${styles.section} ${styles.pricing}`}>
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
            Transparent sprint-based partnerships. Begin focused, build
            momentum, and scale as mission scope demands.
          </p>
        </div>

        <div className={styles.planGrid}>
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`${styles.plan} ${plan.featured ? styles.featuredPlan : ""
                } ${styles.reveal}`}
            >
              <div className={styles.planOrbit} aria-hidden="true">
                <i />
                <span>{index + 1}</span>
              </div>
              <div className={styles.planSignal}>
                {plan.signal}
                {plan.featured && <strong>RECOMMENDED</strong>}
              </div>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>

              <div className={styles.planPrice}>
                <strong>{plan.price}</strong>
                <span>{plan.cadence}</span>
              </div>

              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={13} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button onClick={() => openInquiry(plan.type)}>
                Select trajectory <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* 07. GROUND CONTROL (TESTIMONIALS) */}
      <section
        id="testimonials"
        className={`${styles.section} ${styles.testimonials}`}
      >
        <SectionLabel index="06">GROUND CONTROL</SectionLabel>
        <div className={styles.quoteMark}>“</div>
        <blockquote className={styles.reveal}>
          {TESTIMONIALS[0].quote}
        </blockquote>
        <div className={styles.quoteMeta}>
          <strong>{TESTIMONIALS[0].author}</strong>
          <span>
            {TESTIMONIALS[0].role} · {TESTIMONIALS[0].company}
          </span>
        </div>
        <p className={styles.sampleNotice}>
          Verified transmission record from past client partnership.
        </p>
      </section>

      {/* 08. TRUST TELEMETRY (METRICS) */}
      <section
        id="metrics"
        className={`${styles.section} ${styles.trustBand}`}
      >
        <div className={styles.trustHead}>
          <SectionLabel index="07">TRUST TELEMETRY</SectionLabel>
          <h2 className={`${styles.trustTitle} ${styles.reveal}`}>
            Telemetry from
            <br />
            <em>beyond the horizon.</em>
          </h2>
          <p className={styles.trustSub}>
            Every system we send to orbit is measured, hardened, and held to a
            production-grade standard — never a lucky launch.
          </p>
        </div>

        <div className={`${styles.telemetryWindow} ${styles.reveal}`} aria-hidden="true">
          <pre>
            <span className={styles.telPrompt}>$</span> system.status<br />
            <span className={styles.telKey}>projects </span>= <span className={styles.telVal}>50+</span>
            {"   "}
            <span className={styles.telKey}>clients </span>= <span className={styles.telVal}>30+</span>
            {"   "}
            <span className={styles.telKey}>impact </span>= <span className={styles.telGreen}>HIGH</span><br />
            <span className={styles.telKey}>status </span>= <span className={styles.telGreen}>BUILDING</span>
          </pre>
        </div>

        <div className={styles.metricGrid}>
          {[
            { code: "01", value: "50+", label: "Projects Delivered" },
            { code: "02", value: "30+", label: "Happy Clients" },
            { code: "03", value: "10+", label: "Industries Served" },
            { code: "04", value: "99%", label: "Client Satisfaction" },
          ].map((metric) => (
            <div key={metric.code} className={`${styles.metricCell} ${styles.reveal}`}>
              <span className={styles.metricCode}>TEL / {metric.code}</span>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.metricLabel}>{metric.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.trustStatus}>
          <i />
          Placeholder figures — verify before launch
        </div>
      </section>

      {/* 09. OPEN CHANNEL / FINAL CTA */}
      <section id="contact" className={styles.finalSignal}>
        <div className={styles.finalOrb} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div className={styles.finalContent}>
          <SectionLabel index="08">OPEN CHANNEL</SectionLabel>
          <h2 className={styles.reveal}>
            Have something
            <br />
            <em>impossible</em> in mind?
          </h2>
          <p>
            Transmit your brief. We will analyze your architecture and return with
            a clear path forward within 24 hours.
          </p>
          <button
            className={styles.primaryButton}
            onClick={() => openInquiry()}
          >
            Start the conversation <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <strong>REDITUS</strong>
            <span>RETURN · REIMAGINE · REALIZE</span>
          </div>

          <form onSubmit={handleNewsletter} className={styles.newsletter}>
            <label htmlFor="signal-email">RECEIVE FIELD NOTES</label>
            <div>
              <input
                id="signal-email"
                type="email"
                required
                placeholder="work@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button aria-label="Subscribe">
                {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
            {subscribed && <span>TRANSMISSION RECEIVED</span>}
          </form>

          <div className={styles.footerLinks}>
            <div>
              <span>EXPLORE</span>
              <a href="#services">Capabilities</a>
              <a href="#work">Mission log</a>
              <a href="#process">Process</a>
              <a href="#metrics">Telemetry</a>
            </div>
            <div>
              <span>CONNECT</span>
              <a href="mailto:hello@reditus.agency">Email us</a>
              <button onClick={() => openInquiry()}>Project inquiry</button>
            </div>
          </div>
        </div>

        <div className={styles.wordmark}>REDITUS</div>

        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} REDITUS LABS</span>
          <span>REMOTE · GLOBAL OPERATIONS</span>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>

      <InquiryModal
        key={inquiryType ?? "general"}
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialType={inquiryType}
      />
    </main>
  );
}
