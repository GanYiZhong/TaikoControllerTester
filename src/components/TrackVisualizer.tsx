import React, { useState, useEffect, useRef } from 'react';
import { DrumHit, KeyBindings } from '../types';

interface TrackVisualizerProps {
  trackHits: Record<number, DrumHit[]>;
  totalHits: number;
  bindings: KeyBindings;
}

export function TrackVisualizer({ trackHits, totalHits, bindings }: TrackVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blockCount, setBlockCount] = useState(20);

  useEffect(() => {
    const updateBlockCount = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth - 80; // Padding + label width
      const blockWidth = 40; // 32px block + 8px gap
      const newBlockCount = Math.floor(containerWidth / blockWidth);
      setBlockCount(Math.max(5, Math.min(30, newBlockCount))); // Min 5, max 30 blocks
    };

    updateBlockCount();
    window.addEventListener('resize', updateBlockCount);
    const resizeObserver = new ResizeObserver(updateBlockCount);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateBlockCount);
      resizeObserver.disconnect();
    };
  }, []);

  const allHits = Object.values(trackHits)
    .flat()
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-blockCount);

  return (
    <div ref={containerRef} className="bg-gray-900/50 rounded-lg p-6 w-full overflow-hidden">
      <h2 className="text-xl font-semibold mb-6">Visual Timeline</h2>
      <div className="grid grid-rows-4 gap-4">
        {Object.entries(bindings).map(([type, key], trackIndex) => (
          <div key={trackIndex} className="flex items-center gap-4">
            <div className="w-8 shrink-0 text-center text-gray-500">
              {key.toUpperCase()}
            </div>
            <div className="flex gap-2 overflow-hidden">
              {Array.from({ length: blockCount }).map((_, position) => {
                const hit = allHits.find(h => h.track === trackIndex && 
                  allHits.indexOf(h) === position);
                const isKa = type.includes('ka');
                
                return (
                  <div
                    key={position}
                    className={`h-8 w-8 shrink-0 rounded-sm flex items-center justify-center text-xs font-mono
                      ${hit ? (isKa ? 'bg-blue-500 text-blue-100' : 'bg-red-500 text-red-100') : 'bg-gray-800/50'}
                      ${hit ? 'animate-pop' : ''}
                      transition-all duration-150
                    `}
                  >
                    {hit && hit.hitNumber}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}