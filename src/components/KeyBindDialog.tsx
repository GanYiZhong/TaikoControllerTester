import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard } from 'lucide-react';
import { useKeyBindings } from '../contexts/KeyBindingsContext';
import type { KeyBindings } from '../types';

export function KeyBindDialog() {
  const { bindings, updateBindings } = useKeyBindings();
  const [isOpen, setIsOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<keyof KeyBindings | null>(null);
  const [tempBindings, setTempBindings] = useState<KeyBindings>(bindings);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!activeInput || !isOpen) return;
    e.preventDefault();
    
    const key = e.key.toLowerCase();
    if (key === 'escape') {
      setActiveInput(null);
      return;
    }

    if (key.length === 1) {
      setTempBindings(prev => ({
        ...prev,
        [activeInput]: key
      }));
      setActiveInput(null);
    }
  }, [activeInput, isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSave = () => {
    updateBindings(tempBindings);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        title="Customize key bindings"
      >
        <Keyboard className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96 shadow-xl">
        <h3 className="text-xl font-bold mb-4">Key Bindings</h3>
        <div className="space-y-4">
          {(Object.entries(tempBindings) as [keyof KeyBindings, string][]).map(([bind, key]) => (
            <div key={bind} className="flex items-center justify-between">
              <span className="text-gray-300 capitalize">
                {bind.replace('-', ' ')}
              </span>
              <button
                onClick={() => setActiveInput(bind)}
                className={`w-12 h-8 rounded border ${
                  activeInput === bind
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-gray-600 bg-gray-700'
                } flex items-center justify-center uppercase`}
              >
                {activeInput === bind ? '...' : key}
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}