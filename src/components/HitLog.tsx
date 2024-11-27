import React from 'react';
import { DrumHit } from '../types';

interface HitLogProps {
  hit: DrumHit;
  index: number;
}

export function HitLog({ hit, index }: HitLogProps) {
  const hitColor = hit.type.includes('ka') ? 'text-red-500' : 'text-blue-500';

  return (
    <div 
      className="flex items-center gap-4 text-sm animate-fade-in"
      style={{
        animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`
      }}
    >
      <span className="text-gray-400 w-32">
        {new Date(hit.timestamp).toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          fractionalSecondDigits: 3
        })}
      </span>
      <span className={`uppercase font-mono ${hitColor}`}>
        {hit.type}
      </span>
      <span className="text-gray-500">Key: {hit.key.toUpperCase()}</span>
    </div>
  );
}