import React from 'react';
import { Rocket, GraduationCap, HeartPulse, ShoppingBag, Landmark, UtensilsCrossed, Cog } from 'lucide-react';
import './TrustedBar.css';

const industries = [
  { icon: Rocket, label: 'Startups' },
  { icon: GraduationCap, label: 'Education' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: ShoppingBag, label: 'Retail' },
  { icon: Landmark, label: 'Finance' },
  { icon: UtensilsCrossed, label: 'Hospitality' },
  { icon: Cog, label: 'Manufacturing' },
];

export const TrustedBar: React.FC = () => {
  return (
    <section className="trusted-bar">
      <div className="container">
        <div className="trusted-title">
          <span className="text-light">TRUSTED ACROSS </span>
          <span className="text-bold">INDUSTRIES</span>
        </div>
        <div className="trusted-grid">
          {industries.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="trusted-item">
                <div className="trusted-icon-box">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <span className="trusted-label">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
