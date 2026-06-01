import React from 'react';

interface HeroProps {
  title: string;
  author: string;
  lastUpdated: string;
  brand: string;
}

export const Hero: React.FC<HeroProps> = ({ title, author, lastUpdated, brand }) => {
  return (
    <header className="hero-section" id="hero">
      <div className="hero-brand">{brand}</div>
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">
        How I use AI, automation, reusable systems, and structured workflows to multiply engineering effectiveness.
      </p>
      <div className="hero-meta">
        <span>Architect: <strong>{author}</strong></span>
        <span className="meta-separator">•</span>
        <span>Version: <strong>1.0.0</strong></span>
        <span className="meta-separator">•</span>
        <span>Last Compiled: <strong>{lastUpdated}</strong></span>
      </div>
      <div className="hero-accent-bar"></div>
    </header>
  );
};
