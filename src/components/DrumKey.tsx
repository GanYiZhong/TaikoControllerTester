import React from 'react';

interface DrumKeyProps {
  keyLabel: string;
  name: string;
  isActive: boolean;
  type: string;
}

export function DrumKey({ keyLabel, name, isActive, type }: DrumKeyProps) {
  const baseStyle = "w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-75";
  const isKa = type.includes('ka');
  
  const style = `${baseStyle} ${
    isKa
      ? isActive 
        ? 'bg-blue-500 text-white scale-95' 
        : 'bg-blue-200 text-blue-700 hover:bg-blue-300'
      : isActive 
        ? 'bg-red-500 text-white scale-95' 
        : 'bg-red-200 text-red-700 hover:bg-red-300'
  }`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={style}>{keyLabel}</div>
      <span className="text-gray-400">{name}</span>
    </div>
  );
}