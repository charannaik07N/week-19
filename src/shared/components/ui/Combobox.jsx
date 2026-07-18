'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import clsx from 'clsx';

export function Combobox({ options = [], value, onChange, placeholder = "Select an option...", className, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const filteredOptions = query === '' 
    ? options 
    : options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      );

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
    setQuery('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className={clsx("relative w-full", className)} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        className={clsx(
          "flex items-center justify-between w-full px-3 py-2 text-sm text-left bg-white dark:bg-gray-900 border rounded-md shadow-sm transition-colors",
          disabled ? "bg-gray-50 dark:bg-gray-800 text-gray-500 cursor-not-allowed border-gray-200 dark:border-gray-800" : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          isOpen && "ring-2 ring-blue-500 border-blue-500"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={clsx("truncate", !selectedOption && "text-gray-500 dark:text-gray-400")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="flex items-center gap-1">
          {selectedOption && !disabled && (
            <div 
              onClick={handleClear}
              className="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-3.5 h-3.5" />
            </div>
          )}
          <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center px-3 py-2 border-b border-gray-100 dark:border-gray-800">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              className="w-full px-2 py-1 text-sm bg-transparent border-0 outline-none dark:text-white placeholder:text-gray-400 focus:ring-0"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className="max-h-60 overflow-auto py-1 focus:outline-none scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">
                No options found.
              </li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={clsx(
                    "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors",
                    value === option.value 
                      ? "text-blue-700 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-900/20" 
                      : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <span className="truncate">{option.label}</span>
                  {value === option.value && <Check className="w-4 h-4 shrink-0" />}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
