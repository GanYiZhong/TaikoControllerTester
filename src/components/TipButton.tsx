import React from 'react';
import { Coffee, Globe } from 'lucide-react';

export function TipButton() {
  return (
    <div className="flex gap-2">
      <a
        href="https://taiko.ac"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors text-sm font-medium"
      >
        <Globe className="w-4 h-4" />
        ZhongTaiko
      </a>
      <a
        href="https://paypal.me/taikozhong"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors text-sm font-medium"
      >
        <Coffee className="w-4 h-4" />
        Tip Me
      </a>
    </div>
  );
}