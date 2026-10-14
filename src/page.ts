const art = (name: string, x: number, y: number, w: number, h: number, label: string, attrs = '') => `<div class="atlas-art ${name}" role="img" aria-label="${label}" ${attrs} style="--art-ratio:${w}/${h};background-size:${1536/w*100}% ${1024/h*100}%;background-position:${x/(1536-w)*100}% ${y/(1024-h)*100}%"></div>`;
const arrow = '<span aria-hidden="true">↗</span>';
const marker = (number: string, label: string) => `<div class="section-marker"><span>${number}</span><span>${label}</span></div>`;
const folio = (number: string, label: string, note: string) => `<div class="folio" aria-hidden="true"><span>${number} &nbsp; ${label}</span><span>${note}</span></div>`;
const brand = `<svg class="brand-symbol brand-vector" viewBox="34 20 24 29" aria-hidden="true"><defs><filter id="logo-invert"><feColorMatrix type="matrix" values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"/><feComponentTransfer><feFuncR type="discrete" tableValues="0 0 1 1"/><feFuncG type="discrete" tableValues="0 0 1 1"/><feFuncB type="discrete" tableValues="0 0 1 1"/></feComponentTransfer></filter><mask id="logo-cut" x="0" y="0" width="1536" height="1024" maskUnits="userSpaceOnUse" style="mask-type:luminance"><image href="./assets/brand-board.png" width="1536" height="1024" filter="url(#logo-invert)"/></mask></defs><rect x="34" y="20" width="24" height="29" fill="currentColor" mask="url(#logo-cut)"/></svg><span class="brand-word">Reditus<span>labs</span></span>`;
const services = [
 ['AI & Intelligent<br>Systems','Custom AI features, assistants, and decision-support tools, built to fit your workflows and data instead of bolted on as a gimmick.'],
 ['SaaS & Product<br>Engineering','From first prototype to production platform. We shape the product, build the architecture, and scale it as your users grow.'],
 ['Web & Applications','Fast, accessible websites and applications across web and mobile, built on maintainable foundations.'],
 ['Automation &<br>Integrations','We connect your tools, remove repetitive work, and turn manual processes into reliable, automated systems.'],
 ['Software<br>Engineering','Clean, tested, well-documented code. Backend services, APIs, and infrastructure our team can own and extend.'],
 ['UI/UX & Digital<br>Experiences','Research-led interface and interaction design that makes complex products feel simple.']
];
const steps = [ ['Discover','Understand the problem, users, and constraints.'], ['Design','Shape the experience and the system together.'], ['Engineer','Build in tight, visible iterations.'], ['Evolve','Measure, learn, and keep improving after launch.'] ];
export const page = `
<a class="skip-link" href="#main">Skip to content</a>
<main id="main">
 <section id="home" class="paper hero" aria-labelledby="hero-heading">
  <header class="site-header">
   <a href="#home" aria-label="Redituslabs home" class="brand">${brand}</a>
   <button id="menu-toggle" class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="main-nav">Menu <span aria-hidden="true">+</span></button>
   <nav id="main-nav" aria-label="Main navigation"><a href="#about" data-nav-link>The Lab</a><a href="#services" data-nav-link>Capabilities</a><a href="#process" data-nav-link>Process</a><a href="#contact" data-nav-link>Contact</a></nav>
   <a class="button header-cta" href="#contact">Let’s talk ${arrow}</a>
  </header>
  <div class="hero-art" data-hero-art aria-hidden="true"><div class="hero-sun"></div><div class="mountain-layer mountain-back"></div><div class="mountain-layer mountain-summit"></div><div class="mountain-layer mountain-front"></div><canvas id="hero-webgl" aria-hidden="true"></canvas></div>
  <div class="hero-copy reveal"><h1 id="hero-heading">From ideas.<br><span>To meaningful</span><br>possibilities.</h1><p>We design and engineer digital products,<br class="desktop-break"> intelligent systems, and experiences<br class="desktop-break"> that move ideas forward.</p><a href="#about" class="text-link">Explore the lab <span aria-hidden="true">↓</span></a></div>
  <aside class="hero-invite reveal"><h2>Let’s build what’s next.</h2><p>From the first question to the next iteration.</p><a href="#contact" class="button">Start a conversation ${arrow}</a></aside>
  ${folio('01','Home','Creative engineering lab')}
 </section>
 <section id="about" class="paper about" aria-labelledby="about-heading">
  ${marker('02','About')}
  <div class="about-intro reveal"><h2 id="about-heading">A creative<br>engineering lab.</h2><p>Reditus Labs is a creative engineering lab focused on<br class="desktop-break"> building digital products, intelligent systems, and<br class="desktop-break"> technology experiences.</p></div>
  <div class="about-mountain" aria-hidden="true"></div><p class="margin-note mono about-note">Ideas<br>Products<br>Systems<br>Real impact</p>
  <div class="about-layout"><div class="about-art collage" role="img" aria-label="Mountains and engineering drawings woven into a human profile">${[0,1,2,3].map(i=>`<div class="collage-piece collage-piece-${i}" aria-hidden="true">${art('collage-texture',512,0,512,512,'')}</div>`).join('')}</div><div class="capabilities reveal"><h3>What we do.</h3><ol>${['Intelligent systems','Digital products','Software engineering','Interface design'].map((s,i)=>`<li><span class="mono">0${i+1}</span>${s}</li>`).join('')}</ol></div></div>
  ${folio('02','About','Ideas to reality')}
 </section>
 <section id="mission" class="paper mission" aria-labelledby="mission-heading">
  ${marker('03','Mission')}
  <h2 id="mission-heading" class="reveal">Purpose drives<br>progress.</h2><div class="orange-stroke" aria-hidden="true"></div>
  <div class="mission-grid reveal"><article><h3>Our mission</h3><p>To design, engineer, and evolve digital products and intelligent systems that solve real problems. We combine creative thinking with rigorous engineering to turn ideas into technology people trust and enjoy using.</p></article><article><h3>Our vision</h3><p>To be a lab where emerging technology becomes practical, well-crafted, and human-centered, and where every product we ship keeps evolving with the people and businesses that use it.</p></article></div>
  <div class="lab-dna reveal"><div><h3>The lab DNA</h3><p>Our team brings together a rare mix of disciplines.<br class="desktop-break"> We bridge the gap between technology, design, and human insight to create digital experiences that are both ambitious and grounded in real-world impact.</p></div>${art('mission-art',1024,0,512,512,'An eye rendered as an engineering collage')}</div>
  <div class="principles-grid reveal"><article><h4>Craft over speed</h4><p>We build things that last, not just things that ship.</p></article><article><h4>Curiosity first</h4><p>We explore emerging technology before it becomes obvious.</p></article><article><h4>Design and engineering</h4><p>Great experiences need strong systems underneath.</p></article><article><h4>Built to evolve</h4><p>Our products grow, adapt, and improve after launch.</p></article></div>
  ${folio('03','Mission','People &nbsp; ideas &nbsp; technology &nbsp; real impact')}
 </section>
 <section id="services" class="paper services" aria-labelledby="services-heading">
  ${marker('04','Services')}<h2 id="services-heading" class="reveal">What we build.</h2>
  <div class="services-grid">${services.map((s,i)=>`<article class="service-item reveal"><div class="service-heading">${art('service-art',[17,170,327,17,172,328][i],[548,548,548,694,694,694][i],158,139,s[0].replace('<br>',' ')+' collage')}<h3>${s[0]}</h3></div><p>${s[1]}</p></article>`).join('')}</div>
  <article class="research reveal"><div><h3>Research & Emerging Technology</h3><p>Prototypes and feasibility studies that test new technology against real problems before you commit to building.</p></div>${art('research-art',17,837,253,143,'An abstract mountain collage')}</article>
  ${folio('04','Services','Ideas &nbsp; products &nbsp; systems &nbsp; real impact')}
 </section>
 <section id="process" class="paper process" aria-labelledby="process-heading"><div class="process-stage">
  ${marker('05','Process')}<h2 id="process-heading" class="reveal">From a question.<br><span>To what’s next.</span></h2>
  <p class="margin-note mono process-note">Discover<br>Design<br>Engineer<br>Evolve</p>
  <div class="process-grid">${steps.map((s,i)=>`<article class="process-step reveal"><div class="step-track"><span class="mono">0${i+1}</span><i aria-hidden="true"></i></div><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join('')}</div>
  <div class="road-wrap"><div class="road-scene">${art('process-art',512,512,512,512,'One explorer centered on a winding mountain road')}<svg class="journey-overlay" viewBox="0 0 512 512" aria-hidden="true"><defs><mask id="road-person-gap"><rect width="512" height="512" fill="white"/><rect x="335" y="269" width="30" height="82" rx="12" fill="black"/></mask></defs><path mask="url(#road-person-gap)" id="journey-path" d="M100 500 C175 460 365 405 380 352 C410 300 209 275 195 241 C165 206 347 195 331 168 C320 142 186 142 218 121 C245 101 313 101 298 89" fill="none" stroke="#ed501b" stroke-width="2" stroke-dasharray="4 5"/><circle class="journey-marker" mask="url(#road-person-gap)" cx="100" cy="500" r="5" fill="#ed501b" stroke="#f5f1e5" stroke-width="2"/></svg></div><p class="mono road-left">From<br>ideas<br>to<br>reality<span class="short-rule"></span></p><p class="mono road-right">Same team<br>beyond<br>launch<span class="short-rule"></span></p></div>
  </div>${folio('05','Process','Discover &nbsp; design &nbsp; engineer &nbsp; evolve')}
 </section>
 <section id="contact" class="paper contact" aria-labelledby="contact-heading">
  ${marker('06','Contact')}<h2 id="contact-heading" class="reveal">Great things start<br>with a conversation.</h2><div class="orange-stroke" aria-hidden="true"></div><p class="contact-intro reveal">Tell us what you have in mind. Let’s build what comes next.</p>
  <div class="contact-body"><form id="project-form" class="reveal"><label>Your name<input name="name" autocomplete="name" required></label><label>Email address<input name="email" type="email" autocomplete="email" required></label><label>Tell us about your project<textarea name="message" rows="3" required></textarea></label><button type="submit" class="button">Open email draft ${arrow}</button><p class="form-note">Opens your email app. Send your inquiry from there.</p><a class="contact-email" href="mailto:redtiduslabs@gmail.com">redtiduslabs@gmail.com</a><p id="form-status" role="status" aria-live="polite"></p></form>${art('contact-art',1024,512,512,512,'A mountain peak silhouetted against an orange sun')}</div>
 <footer class="site-footer"><div><a href="#home" class="brand" aria-label="Redituslabs home">${brand.replaceAll("logo-invert","footer-logo-invert").replaceAll("logo-cut","footer-logo-cut")}</a><p>Creative engineering. Real impact.</p></div><div class="footer-links"><nav aria-label="Footer navigation"><a href="#about">The Lab</a><a href="#services">Capabilities</a><a href="#process">Process</a><a href="#contact">Contact</a></nav><div><p>© ${new Date().getFullYear()} Redituslabs</p><a href="#home">Back to top <span aria-hidden="true">↑</span></a></div></div></footer>
 </section>
</main>`;
