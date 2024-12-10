export interface DrumHit {
  key: string;
  timestamp: number;
  type: 'ka-left' | 'don-left' | 'don-right' | 'ka-right';
  track: number;
  hitNumber: number;
}

export interface KeyCount {
  [key: string]: number;
}

export interface KeySpeed {
  current: number;
  max: number;
}

export interface KeyBindings {
  'ka-left': string;
  'don-left': string;
  'don-right': string;
  'ka-right': string;
}