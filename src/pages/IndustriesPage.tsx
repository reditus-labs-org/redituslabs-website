import React from 'react';
import { Industries } from '../components/Industries/Industries';
import { RealSolutions } from '../components/RealSolutions/RealSolutions';
import { Insights } from '../components/Insights/Insights';
import { Contact } from '../components/Contact/Contact';
import { Footer } from '../components/Footer/Footer';

interface IndustriesPageProps {
  onNavigate?: (page: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate }) => {
  return (
    <div className="page-view industries-page-view">
      <Industries />
      <RealSolutions />
      <Insights />
      <Contact />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
