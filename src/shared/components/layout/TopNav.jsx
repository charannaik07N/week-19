'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useUIStore } from '@/shared/store/uiStore';
import { useAgentStore } from '@/shared/store/agentStore';
import ConnectionIndicator from '@/shared/components/ui/ConnectionIndicator';
import Avatar from '@/shared/components/ui/Avatar';
import { Bell, Sun, Moon, Search, Menu, X } from 'lucide-react';
import { cn } from '@/shared/utils';

export default function TopNav() {
  const pathname = usePathname();
  const { toggleMobileSidebar } = useUIStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const currentAgent = useAgentStore((s) => s.currentAgent);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple breadcrumb logic based on pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumb = pathSegments.length > 0 
    ? pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1)
    : 'Dashboard';

  return (
    <>
      <header className="sticky top-0 z-40 h-[56px] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-2 sm:px-6 shadow-sm w-full">
        <div className="flex items-center gap-1 sm:gap-3">
          <button 
            onClick={toggleMobileSidebar}
            className="md:hidden flex items-center justify-center w-11 h-11 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <Menu size={24} />
          </button>
          <nav className="flex items-center text-[15px] sm:text-[13px] font-semibold sm:font-medium text-slate-900 dark:text-slate-100 sm:text-slate-500 sm:dark:text-slate-400 pl-1 sm:pl-0">
            <span className="hidden sm:inline hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer transition-colors duration-150">RapidDispatch</span>
            <span className="hidden sm:inline mx-2 text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-900 dark:text-slate-100 font-semibold">{breadcrumb}</span>
          </nav>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 sm:mx-6 justify-center lg:justify-start">
          <button className="flex items-center w-full max-w-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-md px-3 py-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group min-h-[44px]">
            <Search size={16} className="mr-2 shrink-0" />
            <span className="text-[13px] flex-1 text-left truncate">Search or type a command...</span>
            <div className="flex items-center gap-1">
              <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-semibold text-slate-500 dark:text-slate-400 shadow-[0_1px_0_rgba(0,0,0,0.05)]">Ctrl</kbd>
              <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-semibold text-slate-500 dark:text-slate-400 shadow-[0_1px_0_rgba(0,0,0,0.05)]">K</kbd>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          {/* Mobile Search Icon */}
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden flex items-center justify-center w-11 h-11 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <Search size={24} />
          </button>

          <div className="hidden sm:flex items-center">
            <ConnectionIndicator />
          </div>
          
          <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 dark:border-slate-800 pl-3">
            <button className="relative flex items-center justify-center w-11 h-11 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </button>
            
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex items-center justify-center w-11 h-11 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button className="ml-1 sm:ml-2 rounded-full ring-2 ring-transparent hover:ring-slate-200 dark:hover:ring-slate-700 transition-all duration-150 outline-none focus-visible:ring-blue-500 w-11 h-11 flex items-center justify-center">
            <Avatar name={currentAgent?.name} size="sm" showPresence presenceStatus={currentAgent?.status} />
          </button>
        </div>
      </header>

      {/* Full-Screen Search Overlay for Mobile */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col md:hidden">
          <div className="flex items-center px-2 h-[56px] border-b border-slate-200 dark:border-slate-800">
            <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-800 rounded-md px-3 py-2 mx-2">
              <Search size={20} className="text-slate-500 dark:text-slate-400 mr-2" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search..." 
                className="flex-1 bg-transparent border-none outline-none text-base text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              />
            </div>
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="flex items-center justify-center w-11 h-11 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">Start typing to search...</p>
          </div>
        </div>
      )}
    </>
  );
}
