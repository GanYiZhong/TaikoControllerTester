import React from 'react';
import { DrumHit } from '../types';

interface HitBlockProps {
  hit: DrumHit;
  position: number;
}

export function HitBlock({ hit, position }: HitBlockProps) {
  const isKa = hit.type.includes('ka');
  
  const blockStyle = `
    h-8 w-6 rounded-sm flex items-center justify-center text-xs font-mono
    ${isKa ? 'bg-blue-500 text-blue-100' : 'bg-red-500 text-red-100'}
    animate-slide-in
  `;

  return (
    <div 
      className={blockStyle}
      title={`${hit.type.toUpperCase()} - ${hit.key.toUpperCase()}`}
      style={{
        animation: `slideIn 0.2s ease-out both`
      }}
    >
      {position}
    </div>
  );
}