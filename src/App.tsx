import React, { useEffect, useState, useCallback } from 'react';
import { Drum } from 'lucide-react';
import { DrumKey } from './components/DrumKey';
import { TrackVisualizer } from './components/TrackVisualizer';
import { KeyCounter } from './components/KeyCounter';
import { VolumeControl } from './components/VolumeControl';
import { TipButton } from './components/TipButton';
import { KeyBindDialog } from './components/KeyBindDialog';
import { useKeyBindings } from './contexts/KeyBindingsContext';
import { useSound } from './hooks/useSound';
import type { DrumHit, KeyCount } from './types';

function App() {
  const { bindings } = useKeyBindings();
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [trackHits, setTrackHits] = useState<Record<number, DrumHit[]>>({
    0: [], // Left Ka track
    1: [], // Left Don track
    2: [], // Right Don track
    3: [], // Right Ka track
  });
  const [keyCounts, setKeyCounts] = useState<KeyCount>({});
  const [lastHitTime, setLastHitTime] = useState<number>(Date.now());
  const [volume, setVolume] = useState(0.5);
  const { playSound } = useSound(volume);
  const [totalHits, setTotalHits] = useState(0);

  // Initialize keyCounts with current bindings
  useEffect(() => {
    setKeyCounts(Object.values(bindings).reduce((acc, key) => ({
      ...acc,
      [key]: 0
    }), {}));
  }, [bindings]);

  const resetCounters = useCallback(() => {
    setKeyCounts(Object.values(bindings).reduce((acc, key) => ({
      ...acc,
      [key]: 0
    }), {}));
    setTrackHits({ 0: [], 1: [], 2: [], 3: [] });
    setTotalHits(0);
  }, [bindings]);

  useEffect(() => {
    const checkReset = () => {
      const now = Date.now();
      if (now - lastHitTime > 5000) {
        resetCounters();
      }
    };

    const interval = setInterval(checkReset, 100);
    return () => clearInterval(interval);
  }, [lastHitTime, resetCounters]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!Object.values(bindings).includes(key)) return;
      if (activeKeys.has(key)) return;

      const newKeys = new Set(activeKeys);
      newKeys.add(key);
      setActiveKeys(newKeys);
      setLastHitTime(Date.now());
      setTotalHits(prev => prev + 1);

      const bindingEntry = Object.entries(bindings).find(([_, k]) => k === key);
      if (!bindingEntry) return;

      const [type] = bindingEntry;
      playSound(type.includes('ka') ? 'ka' : 'don');

      setKeyCounts(prev => ({
        ...prev,
        [key]: (prev[key] || 0) + 1
      }));

      const track = Object.values(bindings).indexOf(key);
      const hit: DrumHit = {
        key,
        timestamp: Date.now(),
        type: type as DrumHit['type'],
        track,
        hitNumber: totalHits + 1
      };

      setTrackHits(prev => {
        const allHits = Object.values(prev).flat().concat(hit);
        const sortedHits = allHits.sort((a, b) => a.timestamp - b.timestamp).slice(-30);
        
        const newTracks: Record<number, DrumHit[]> = { 0: [], 1: [], 2: [], 3: [] };
        sortedHits.forEach(h => {
          newTracks[h.track].push(h);
        });
        
        return newTracks;
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!Object.values(bindings).includes(key)) return;
      
      const newKeys = new Set(activeKeys);
      newKeys.delete(key);
      setActiveKeys(newKeys);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeKeys, bindings, resetCounters, playSound, totalHits]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Drum className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Taiko Controller Tester</h1>
          </div>
          <p className="text-gray-400">Test your Taiko drum controller inputs</p>
          <p className="text-sm text-gray-500 mt-2">Counters reset after 5 seconds of inactivity</p>
          <div className="flex justify-between items-center mt-4 px-4">
            <div className="flex items-center gap-2">
              <TipButton />
              <KeyBindDialog />
            </div>
            <VolumeControl volume={volume} onChange={setVolume} />
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm shadow-xl">
          <KeyCounter counts={keyCounts} lastHitTime={lastHitTime} bindings={bindings} />

          <div className="grid grid-cols-4 gap-8 mb-12">
            {Object.entries(bindings).map(([type, key]) => (
              <DrumKey
                key={type}
                type={type}
                keyLabel={key.toUpperCase()}
                name={type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                isActive={activeKeys.has(key)}
              />
            ))}
          </div>

          <TrackVisualizer trackHits={trackHits} totalHits={totalHits} bindings={bindings} />
        </div>
      </div>
    </div>
  );
}

export default App;