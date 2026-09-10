import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Navbar } from '../components/Navigation/Navbar';
import { HomePage } from '../pages/HomePage';
import { ApproachPage } from '../pages/ApproachPage';
import { IndustriesPage } from '../pages/IndustriesPage';
import { ContentPage } from '../pages/ContentPage';
import { initLenis, destroyLenis, getLenis } from '../animation/lenis';
import { ScrollTrigger } from '../animation/gsap';
import '../styles/globals.css';
import '../styles/finishing.css';
const readRoute = () => window.location.hash.slice(1) || 'home';
const sections: Record<string, string> = { capabilities: 'home', solutions: 'home', contact: 'industries', insights: 'industries', cases: 'approach', architectures: 'approach' };
export const App: React.FC = () => {
  const [route, setRoute] = useState(readRoute);
  const currentPage = sections[route] || route;
  const scrollToRoute = () => {
    const target = sections[route] ? document.getElementById(route === 'solutions' ? 'capabilities' : route) : null;
    getLenis()?.resize();
    if (getLenis()) getLenis()!.scrollTo(target || 0, { immediate: true, offset: 0, force: true });
    else window.scrollTo(0, target ? target.getBoundingClientRect().top + window.scrollY - 88 : 0);
    ScrollTrigger.refresh();
  };
  useEffect(() => {
    initLenis();
    const handleHash = () => setRoute(readRoute());
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    return () => { destroyLenis(); window.removeEventListener('hashchange', handleHash); window.removeEventListener('popstate', handleHash); };
  }, []);
  useLayoutEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(scrollToRoute);
    Promise.all([document.fonts.ready, ...Array.from(document.images).map(img => img.decode().catch(() => undefined))]).then(() => {
      if (!cancelled) scrollToRoute();
    });
    document.title = route.split('/').pop()!.replace(/-/g, ' ') + ' | REDITUS';
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [route]);
  const navigate = (target: string) => {
    if (target === route) scrollToRoute();
    else { window.history.pushState(null, '', '#' + target); setRoute(target); }
  };
  return <div className="app-root" onClick={event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element).closest('a[href^="#"]');
    if (!anchor || anchor.getAttribute('target') === '_blank') return;
    event.preventDefault();
    navigate(anchor.getAttribute('href')!.slice(1));
  }}>
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
    <Navbar currentPage={currentPage} onNavigate={navigate} />
    <main id="main-content" tabIndex={-1} className="main-content">
      {currentPage === 'home' ? <HomePage onNavigate={navigate} onOpenConversation={() => navigate('contact')} />
        : currentPage === 'approach' ? <ApproachPage onNavigate={navigate} />
        : currentPage === 'industries' ? <IndustriesPage onNavigate={navigate} />
        : currentPage === 'all' ? <><HomePage onNavigate={navigate} onOpenConversation={() => navigate('contact')} /><ApproachPage onNavigate={navigate} /><IndustriesPage onNavigate={navigate} /></>
        : <ContentPage key={route} route={route} />}
    </main>
  </div>;
};
