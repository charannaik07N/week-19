'use client';

import { useState, useEffect } from 'react';
import { CommandPalette } from '@/shared/components/ui/CommandPalette';

export default function CommandPaletteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      {children}
      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
