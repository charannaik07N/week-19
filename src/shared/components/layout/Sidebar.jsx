'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/shared/store/uiStore';
import { useAgentStore } from '@/shared/store/agentStore';
import { SIDEBAR_ITEMS } from '@/shared/constants/routes';
import Avatar from '@/shared/components/ui/Avatar';
import { cn } from '@/shared/utils';
import { 
  LayoutDashboard, 
  Ticket, 
  BarChart3, 
  Activity, 
  Users, 
  Settings,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Briefcase,
  X
} from 'lucide-react';

const iconMap = {
  LayoutDashboard, Ticket, BarChart3, Activity, Users, Settings
};

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar, isMobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const currentAgent = useAgentStore((s) => s.currentAgent);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 md:relative h-full bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-220 ease-[cubic-bezier(0.2,0,0,1)]',
          sidebarCollapsed ? 'md:w-[72px]' : 'md:w-[260px]',
          isMobileSidebarOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full md:translate-x-0 w-[280px] md:w-auto'
        )}
      >
        {/* Workspace Switcher */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3 w-full p-1.5 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-colors duration-150 group">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            {(!sidebarCollapsed || isMobileSidebarOpen) && (
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[13px] font-semibold text-slate-900 dark:text-slate-100 truncate">RapidDispatch</span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">Enterprise Live Ops</span>
              </div>
            )}
          </div>
          {isMobileSidebarOpen && (
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden flex items-center justify-center w-11 h-11 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <X size={24} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1 sm:gap-0.5">
          {(!sidebarCollapsed || isMobileSidebarOpen) && <div className="px-3 mb-2 mt-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider">MENU</div>}
          {SIDEBAR_ITEMS.slice(0,4).map(item => renderNavItem(item, pathname, sidebarCollapsed, isMobileSidebarOpen, setMobileSidebarOpen))}
          
          <div className="my-4 border-t border-slate-200 dark:border-slate-800/60 mx-3"></div>
          
          {(!sidebarCollapsed || isMobileSidebarOpen) && <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider">SETTINGS</div>}
          {SIDEBAR_ITEMS.slice(4).map(item => renderNavItem(item, pathname, sidebarCollapsed, isMobileSidebarOpen, setMobileSidebarOpen))}
        </div>

        {/* Collapse Toggle (Desktop only) */}
        <div className="hidden md:flex px-4 py-2 border-t border-slate-200 dark:border-slate-800 justify-end">
          <button onClick={toggleSidebar} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-md transition-colors duration-150 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[44px]">
            {sidebarCollapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
          </button>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
          <div className={cn('flex items-center gap-3', (sidebarCollapsed && !isMobileSidebarOpen) ? 'justify-center' : '')}>
            <Avatar name={currentAgent?.name} size="md" showPresence presenceStatus={currentAgent?.status} />
            {(!sidebarCollapsed || isMobileSidebarOpen) && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[13px] font-semibold truncate text-slate-900 dark:text-slate-100">{currentAgent?.name}</span>
                <span className="text-[12px] text-slate-500 dark:text-slate-400 truncate capitalize">{currentAgent?.role?.replace('_', ' ')}</span>
              </div>
            )}
            {(!sidebarCollapsed || isMobileSidebarOpen) && (
               <button className="flex items-center justify-center w-11 h-11 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors duration-150 shrink-0 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                 <LogOut size={20} />
               </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

function renderNavItem(item, pathname, sidebarCollapsed, isMobileSidebarOpen, setMobileSidebarOpen) {
  const Icon = iconMap[item.icon];
  const isActive = pathname === item.href;
  const isLabelVisible = !sidebarCollapsed || isMobileSidebarOpen;
  
  return (
    <Link
      key={item.href}
      href={item.href}
      onClick={() => setMobileSidebarOpen(false)}
      className={cn(
        'group flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 relative outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[44px]',
        isActive 
          ? 'bg-white dark:bg-slate-800/60 text-slate-900 dark:text-white font-medium shadow-sm border border-slate-200/60 dark:border-slate-700/50' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent'
      )}
      title={sidebarCollapsed && !isMobileSidebarOpen ? item.label : undefined}
    >
      {isActive && isLabelVisible && (
        <div className="absolute -left-3 top-2 bottom-2 w-[3px] bg-blue-600 rounded-r-full" />
      )}
      <Icon size={20} className={cn('shrink-0 transition-colors duration-150', isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300')} />
      {isLabelVisible && <span className="text-[15px] sm:text-[14px] truncate tracking-tight">{item.label}</span>}
      
      {item.href === '/tickets' && isLabelVisible && (
        <span className="ml-auto bg-blue-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-xs">
          14
        </span>
      )}
    </Link>
  );
}
