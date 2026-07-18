'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Users, Truck, X } from 'lucide-react';
import clsx from 'clsx';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the modal is rendered before focusing
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const mockData = [
    { type: 'Tickets', icon: FileText, title: 'TKT-1002: Delay at Warehouse' },
    { type: 'Tickets', icon: FileText, title: 'TKT-1003: Engine Maintenance' },
    { type: 'Customers', icon: Users, title: 'Acme Corp' },
    { type: 'Customers', icon: Users, title: 'Global Logistics' },
    { type: 'Trucks', icon: Truck, title: 'TRK-Alpha' },
    { type: 'Trucks', icon: Truck, title: 'TRK-Beta' },
  ];

  const filtered = query 
    ? mockData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    : mockData;

  const grouped = filtered.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl mx-4 overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
          >
            <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                className="w-full px-3 py-2 text-sm text-gray-900 bg-transparent border-0 outline-none dark:text-gray-100 placeholder:text-gray-400 focus:ring-0"
                placeholder="Search tickets, customers, trucks... (Ctrl+K)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 rounded-md outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {Object.keys(grouped).length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  No results found.
                </div>
              )}
              {Object.entries(grouped).map(([type, items]) => (
                <div key={type} className="mb-4 last:mb-0">
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {type}
                  </div>
                  <div className="mt-1 space-y-1">
                    {items.map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={idx}
                          className="flex items-center w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:bg-gray-100 dark:focus:bg-gray-800 focus:outline-none transition-colors"
                          onClick={() => {
                            // Handle selection logic here
                            setIsOpen(false);
                          }}
                        >
                          <Icon className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                          {item.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
