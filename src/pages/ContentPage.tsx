import { responsiveImage } from '../components/responsiveImage';
import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft, Play, Pause } from 'lucide-react';
import { HomeFooter } from '../components/Footer/HomeFooter';
import { services, industryItems, articleItems, caseItems, architectures, EditorialItem } from './content';

const collections: Record<string, { title: string; intro: string; items: EditorialItem[]; prefix: string }> = {
 services: { title: 'What we build', intro: 'End-to-end product engineering across web, mobile, AI, cloud and more.', items: services, prefix: 'services' },
 'all-industries': { title: 'Different worlds. Same possibilities.', intro: 'Engineering shaped around your industry and the people in it.', items: industryItems, prefix: 'industry' },
 'all-insights': { title: 'Insights', intro: 'Ideas. Engineering. Perspective.', items: articleItems, prefix: 'insight' },
 'case-studies': { title: 'Case studies', intro: 'Explore illustrative solution blueprints. Client case studies will be added when approved for publication.', items: caseItems, prefix: 'case-study' },
};
const playbook: EditorialItem = { slug: 'playbook', title: 'A clear path to what’s possible.', category: 'OUR PLAYBOOK', image: '/assets/images/approach_pavilion_master.jpg', intro: 'A structured approach. Real collaboration. Measurable outcomes.', sections: [['01 — Discover', 'Understand the people, problem and constraints. Align on the outcome, explore the existing systems and agree on how success will be measured.'], ['02 — Design', 'Translate the problem into product flows, prototypes and an architecture. Review the experience together before committing to the full build.'], ['03 — Engineer', 'Build in small, reviewable increments. Integrate the systems, test the important journeys and share working software as it takes shape.'], ['04 — Deploy', 'Prepare the release, verify access controls and recovery, and make system health visible. Put a clear operational handover in place.'], ['05 — Iterate', 'Monitor real usage, review feedback and prioritize the next improvement. Keep the product and its foundations healthy as needs evolve.']] };
function Story() {
 const [step, setStep] = useState(0);
 const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 const chapters = [ ['RETURN.', 'Every possibility starts with a problem worth solving.', 'hero_portal.jpg'], ['REIMAGINE.', 'Bring the right ideas, architecture and people together.', 'approach_pavilion.jpg'], ['REALIZE.', 'Build useful systems. Make room for what comes next.', 'mountain_mist_horizon.jpg'] ];
 useEffect(() => { if (!playing) return; const timer = window.setInterval(() => setStep(s => (s + 1) % 3), 6000); return () => clearInterval(timer); }, [playing]);
 return <section className="story-player" aria-label="Our studio story"><img key={step} src={'/assets/images/' + chapters[step][2]} alt="Architecture and mountain landscape" /><div className="story-copy"><p className="editorial-eyebrow">OUR STORY · {step + 1} / 3</p><h1>{chapters[step][0]}</h1><p>{chapters[step][1]}</p><div className="story-controls"><button onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause story' : 'Play story'}>{playing ? <Pause size={20}/> : <Play size={20}/>}</button>{chapters.map((c, i) => <button key={c[0]} aria-label={'Chapter ' + (i+1)} aria-pressed={step === i} onClick={() => setStep(i)}>{String(i+1).padStart(2, '0')}</button>)}</div><a className="arch-rect-btn" href="#contact">Start a conversation <ArrowRight size={16}/></a></div></section>;
}
export function ContentPage({route}: {route: string}) {
 const collection = collections[route];
 const [kind, slug] = route.split('/');
 const sources: Record<string, EditorialItem[]> = { services, industry: industryItems, insight: articleItems, 'case-study': caseItems, architecture: architectures };
 const item = route === 'playbook' ? playbook : sources[kind]?.find(i => i.slug === slug);
 const legal = route === 'privacy' || route === 'terms';
 return <div className="editorial-page">
 {route === 'story' || route === 'about' ? <Story/> : <div className="container editorial-container">
 <a href={item ? '#' + ({industry: 'all-industries', insight: 'all-insights', 'case-study': 'case-studies', services: 'services', architecture: 'architectures'}[kind] || 'approach') : '#home'} className="editorial-back"><ArrowLeft size={15}/> {item ? 'Back to overview' : 'Back to home'}</a>
 {collection ? <><p className="editorial-eyebrow">REDITUS / EXPLORE</p><h1>{collection.title}</h1><p className="editorial-intro">{collection.intro}</p><div className="editorial-grid">{collection.items.map(i => <a className="editorial-card" key={i.slug} href={'#' + collection.prefix + '/' + i.slug}><img src={i.image} {...responsiveImage(i.image, "(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 680px")} alt=""/><p className="editorial-eyebrow">{i.category}</p><h2>{i.title}</h2><p>{i.intro}</p><span className="editorial-read">Explore <ArrowRight size={16}/></span></a>)}</div></>
 : item ? <article><p className="editorial-eyebrow">{item.category}</p><h1>{item.title}</h1><p className="editorial-intro">{item.intro}</p><img className="editorial-hero" src={item.image} {...responsiveImage(item.image, "(max-width: 1440px) 100vw, 1440px")} alt="Architectural landscape"/><div className="editorial-body">{item.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<a href="#contact" className="pill-btn pill-btn-dark">Let’s build what’s next <ArrowRight size={16}/></a></div></article>
 : legal ? <article className="editorial-body"><p className="editorial-eyebrow">WEBSITE INFORMATION</p><h1>{route === 'privacy' ? 'Privacy' : 'Terms'}</h1>{route === 'privacy' ? <><h2>Contact information</h2><p>The contact form asks for your name, email and project message. A configured delivery service is required to transmit a message; without it, the form displays a notice and does not send your details.</p><h2>External services</h2><p>This site loads fonts from Google Fonts. External links open services with their own privacy practices.</p></> : <><h2>Using this website</h2><p>This website introduces the studio’s capabilities and approach. Illustrative solution examples do not represent verified client results. Project scope, timing and commercial terms are agreed separately.</p><h2>Publication status</h2><p>These website notes are provisional. Final business terms and legal notices must be supplied by the site owner before public launch.</p></>}<a href="#contact" className="editorial-read">Contact the studio <ArrowRight size={16}/></a></article>
 : <><p className="editorial-eyebrow">404</p><h1>This page hasn’t been built yet.</h1><p className="editorial-intro">Let’s get you back to the possibilities.</p><a className="pill-btn pill-btn-dark" href="#home">Back to home <ArrowRight size={16}/></a></>}
 </div>}
 <HomeFooter/>
 </div>;
}
