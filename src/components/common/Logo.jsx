import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <svg
      viewBox="0 0 300 120"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer', height: '60px' }}
      onClick={handleClick}
    >
      <defs>
        <linearGradient id="heroTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#7ea6e8', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#94a3b8', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#e2e8f0', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="heroSymbolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ecedee', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#c6d3e8', stopOpacity: 1 }} />
        </linearGradient>
        <filter id="heroGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="heroShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(59, 130, 246, 0.3)" />
        </filter>
      </defs>
      <g transform="translate(45, 50)" filter="url(#heroGlow)">
        <polygon points="-24,-16 24,-16 0,24" fill="none" stroke="url(#heroSymbolGradient)" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="-16" cy="-11" r="2.5" fill="url(#heroSymbolGradient)" />
        <circle cx="16" cy="-11" r="2.5" fill="url(#heroSymbolGradient)" />
        <circle cx="0" cy="16" r="2.5" fill="url(#heroSymbolGradient)" />
        <circle cx="0" cy="-4" r="2" fill="url(#heroSymbolGradient)" />
        <line x1="-16" y1="-11" x2="0" y2="-4" stroke="url(#heroSymbolGradient)" strokeWidth="1.2" opacity="0.7" />
        <line x1="16" y1="-11" x2="0" y2="-4" stroke="url(#heroSymbolGradient)" strokeWidth="1.2" opacity="0.7" />
        <line x1="0" y1="-4" x2="0.0001" y2="16" stroke="url(#heroSymbolGradient)" strokeWidth="1.2" opacity="0.7" />
      </g>
      <text x="95" y="50" fontFamily="Inter, Arial, sans-serif" fontSize="28" fontWeight="800" fill="url(#heroTextGradient)" filter="url(#heroShadow)">
        NorseAI
      </text>
      <text x="95" y="75" fontFamily="Inter, Arial, sans-serif" fontSize="14" fontWeight="600" fill="#94a3b8" letterSpacing="2px">
        TEACHER
      </text>
      <line x1="95" y1="82" x2="200" y2="82" stroke="url(#heroTextGradient)" strokeWidth="2" opacity="0.6" />
      <circle cx="210" cy="45" r="2" fill="#3b82f6" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="220" cy="40" r="1.5" fill="#3b82f6" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="215" cy="55" r="1" fill="#3b82f6" opacity="0.5">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default Logo;
