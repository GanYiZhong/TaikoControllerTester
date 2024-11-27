import { useCallback, useRef } from 'react';

export function useSound(volume: number = 0.5) {
  const audioContext = useRef<AudioContext | null>(null);

  const playSound = useCallback((type: 'ka' | 'don') => {
    if (!audioContext.current) {
      audioContext.current = new AudioContext();
    }

    const ctx = audioContext.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Ka sound: higher pitch, shorter duration
    if (type === 'ka') {
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.3 * volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    }
    // Don sound: lower pitch, slightly longer duration
    else {
      oscillator.frequency.setValueAtTime(300, ctx.currentTime);
      gainNode.gain.setValueAtTime(0.5 * volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    }

    // Clean up
    setTimeout(() => {
      gainNode.disconnect();
      oscillator.disconnect();
    }, (type === 'ka' ? 150 : 200));
    
  }, [volume]);

  return { playSound };
}