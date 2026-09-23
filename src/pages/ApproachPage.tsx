import React from 'react';
import { Approach } from '../components/Approach/Approach';
import { ArchitectureLab } from '../components/ArchitectureLab/ArchitectureLab';
import { CaseStudies } from '../components/CaseStudies/CaseStudies';
import { TransitionRidge } from '../components/TransitionRidge/TransitionRidge';
import { HomeFooter } from '../components/Footer/HomeFooter';

interface ApproachPageProps {
  onNavigate?: (page: string) => void;
}

export const ApproachPage: React.FC<ApproachPageProps> = ({ onNavigate }) => {
  return (
    <div className="page-view approach-page-view">
      <Approach />
      <ArchitectureLab />
      <CaseStudies />
      <TransitionRidge />
      <HomeFooter onNavigate={onNavigate} />
    </div>
  );
};
