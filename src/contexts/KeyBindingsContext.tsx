import React, { createContext, useContext, useState } from 'react';
import type { KeyBindings } from '../types';

interface KeyBindingsContextType {
  bindings: KeyBindings;
  updateBindings: (newBindings: KeyBindings) => void;
}

const KeyBindingsContext = createContext<KeyBindingsContextType | null>(null);

export function KeyBindingsProvider({ children }: { children: React.ReactNode }) {
  const [bindings, setBindings] = useState<KeyBindings>({
    'ka-left': 'd',
    'don-left': 'f',
    'don-right': 'j',
    'ka-right': 'k'
  });

  const updateBindings = (newBindings: KeyBindings) => {
    setBindings(newBindings);
    localStorage.setItem('taiko-keybindings', JSON.stringify(newBindings));
  };

  return (
    <KeyBindingsContext.Provider value={{ bindings, updateBindings }}>
      {children}
    </KeyBindingsContext.Provider>
  );
}

export function useKeyBindings() {
  const context = useContext(KeyBindingsContext);
  if (!context) {
    throw new Error('useKeyBindings must be used within a KeyBindingsProvider');
  }
  return context;
}