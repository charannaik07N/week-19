'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/shared/utils';

export default function SearchBar({
  value = '',
  onChange,
  placeholder = 'Search…',
  className,
  debounceMs = 300,
}) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debouncedOnChange = useCallback(
    (val) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange?.(val);
      }, debounceMs);
    },
    [onChange, debounceMs]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    debouncedOnChange(val);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange?.('');
    inputRef.current?.focus();
  };

  return (
    <div className={cn('relative', className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          'w-full h-9 pl-9 pr-9 rounded-lg text-sm',
          'bg-slate-100 text-slate-900 placeholder:text-slate-400',
          'dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500',
          'border border-slate-200 dark:border-slate-700',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-colors duration-150'
        )}
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2',
            'p-0.5 rounded text-slate-400 hover:text-slate-600',
            'dark:text-slate-500 dark:hover:text-slate-300',
            'transition-colors duration-150'
          )}
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
