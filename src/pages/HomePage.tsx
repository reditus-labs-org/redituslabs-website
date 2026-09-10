import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { TrustedBar } from '../components/TrustedBar/TrustedBar';
import { Capabilities } from '../components/Capabilities/Capabilities';
import { TechAgnostic } from '../components/TechAgnostic/TechAgnostic';
import { RealImpact } from '../components/RealImpact/RealImpact';
import { QuoteBanner } from '../components/QuoteBanner/QuoteBanner';
import { PreFooterCTA } from '../components/PreFooterCTA/PreFooterCTA';
import { HomeFooter } from '../components/Footer/HomeFooter';

interface HomePageProps {
  onNavigate?: (page: string) => void;
  onOpenConversation?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenConversation }) => {
  return (
    <div className="page-view home-page-view">
      <Hero onOpenConversation={onOpenConversation} onNavigate={onNavigate} />
      <TrustedBar />
      <Capabilities />
      <TechAgnostic />
      <RealImpact />
      <QuoteBanner />
      <PreFooterCTA onStartConversation={onOpenConversation} />
      <HomeFooter onNavigate={onNavigate} />
    </div>
  );
};
