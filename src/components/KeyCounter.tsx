import React from 'react';
import { KeyCount, KeyBindings } from '../types';

interface KeyCounterProps {
  counts: KeyCount;
  lastHitTime: number;
  bindings: KeyBindings;
}

export function KeyCounter({ counts, lastHitTime, bindings }: KeyCounterProps) {
  const timeLeft = Math.max(0, Math.ceil(5 - (Date.now() - lastHitTime) / 1000));
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="grid grid-cols-5 gap-8 mb-8 bg-gray-900/50 rounded-lg p-6 relative">
      {Object.entries(bindings).map(([type, key]) => (
        <div key={type} className="text-center">
          <div className="text-3xl font-bold mb-2">
            <span className={type.includes('ka') ? 'text-blue-500' : 'text-red-500'}>
              {counts[key] || 0}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </div>
          <div className="text-xs text-gray-500 mt-1">({key.toUpperCase()})</div>
        </div>
      ))}
      <div className="text-center border-l border-gray-700 pl-8">
        <div className="text-3xl font-bold mb-2">
          <span className="text-purple-500">{total}</span>
        </div>
        <div className="text-sm text-gray-400">Total Hits</div>
      </div>
      {timeLeft < 5 && (
        <div className="absolute top-2 right-2 text-sm text-gray-500">
          Reset in {timeLeft}s
        </div>
      )}
    </div>
  );
}