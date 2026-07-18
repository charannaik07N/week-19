'use client';

import { useMemo, useState } from 'react';
import { useTicketStore } from '@/features/tickets/store/ticketStore';
import { MOCK_TICKETS } from '@/shared/constants/mockData';
import TicketCard from './TicketCard';
import FilterChip from '@/shared/components/ui/FilterChip';
import SearchBar from '@/shared/components/ui/SearchBar';
import Button from '@/shared/components/ui/Button';
import { Filter, SortDesc, SortAsc, CheckSquare, Trash2, Tag } from 'lucide-react';

export default function TicketQueue() {
  const { filters, setFilter, sortBy, sortOrder, setSortOrder, currentPage, pageSize, setPage } = useTicketStore();
  const [selectedTicketIds, setSelectedTicketIds] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const filteredTickets = useMemo(() => {
    return MOCK_TICKETS.filter(t => {
      if (filters.status && t.status !== filters.status) return false;
      if (filters.priority && t.priority !== filters.priority) return false;
      if (filters.search && !t.issue.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      const dateA = new Date(a[sortBy] || a.created_at).getTime();
      const dateB = new Date(b[sortBy] || b.created_at).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [filters, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / pageSize));
  
  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTickets.slice(start, start + pageSize);
  }, [filteredTickets, currentPage, pageSize]);

  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const handleSelect = (id, checked) => {
    if (checked) {
      setSelectedTicketIds(prev => [...prev, id]);
    } else {
      setSelectedTicketIds(prev => prev.filter(tid => tid !== id));
    }
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedTicketIds([]);
  };

  return (
    <div className="w-full flex-shrink-0 bg-white dark:bg-slate-900 shadow-sm flex flex-col h-full overflow-hidden">
      
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-3 bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            Live Tickets
            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-0.5 px-2 rounded-full text-xs">
              {filteredTickets.length}
            </span>
          </h2>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className={`min-h-[44px] min-w-[44px] h-[44px] w-[44px] flex items-center justify-center ${isSelectionMode ? 'text-blue-600 bg-blue-50' : ''}`} onClick={toggleSelectionMode}>
              <CheckSquare size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px] h-[44px] w-[44px] flex items-center justify-center" onClick={toggleSort}>
              {sortOrder === 'desc' ? <SortDesc size={20} /> : <SortAsc size={20} />}
            </Button>
            <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px] h-[44px] w-[44px] flex items-center justify-center md:hidden" onClick={() => setShowMobileFilters(true)}>
              <Filter size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px] h-[44px] w-[44px] items-center justify-center hidden md:flex">
              <Filter size={20} />
            </Button>
          </div>
        </div>

        <div className="min-h-[44px]">
          <SearchBar 
            placeholder="Search tickets..." 
            value={filters.search || ''} 
            onChange={(v) => setFilter('search', v)} 
          />
        </div>
      </div>

      <div className="hidden md:flex px-4 py-3 border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto scrollbar-hide shrink-0">
        <FilterChip 
          label="All" 
          selected={!filters.status} 
          onClick={() => setFilter('status', null)} 
        />
        <FilterChip 
          label="New" 
          selected={filters.status === 'new'} 
          onClick={() => setFilter('status', 'new')} 
        />
        <FilterChip 
          label="Critical" 
          selected={filters.priority === 'critical'} 
          onClick={() => setFilter('priority', filters.priority === 'critical' ? null : 'critical')} 
        />
        <FilterChip 
          label="My Tickets" 
          selected={filters.assignedAgent === 'me'} 
          onClick={() => setFilter('assignedAgent', filters.assignedAgent === 'me' ? null : 'me')} 
        />
      </div>

      {isSelectionMode && selectedTicketIds.length > 0 && (
        <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800/50 flex justify-between items-center shrink-0 min-h-[56px]">
          <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
            {selectedTicketIds.length} selected
          </span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="min-h-[44px] px-4" icon={Tag}>Assign</Button>
            <Button variant="danger" size="sm" className="min-h-[44px] px-4" icon={Trash2}>Close</Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 bg-slate-50/30 dark:bg-slate-950/30">
        {paginatedTickets.length > 0 ? (
          paginatedTickets.map(ticket => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              selectionMode={isSelectionMode}
              isSelected={selectedTicketIds.includes(ticket.id)}
              onSelectChange={(checked) => handleSelect(ticket.id, checked)}
            />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <p className="text-sm">No tickets found</p>
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0 min-h-[64px]">
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Filters Bottom Sheet */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/50 md:hidden" onClick={() => setShowMobileFilters(false)}>
          <div className="bg-white dark:bg-slate-900 w-full rounded-t-2xl p-4 flex flex-col gap-4 pb-8 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg">Filters</h3>
              <button 
                onClick={() => setShowMobileFilters(false)} 
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 min-h-[44px] min-w-[44px] flex items-center justify-center font-medium"
              >
                Done
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center min-h-[44px]">
                <FilterChip 
                  label="All" 
                  selected={!filters.status} 
                  onClick={() => setFilter('status', null)} 
                />
              </div>
              <div className="flex items-center min-h-[44px]">
                <FilterChip 
                  label="New" 
                  selected={filters.status === 'new'} 
                  onClick={() => setFilter('status', 'new')} 
                />
              </div>
              <div className="flex items-center min-h-[44px]">
                <FilterChip 
                  label="Critical" 
                  selected={filters.priority === 'critical'} 
                  onClick={() => setFilter('priority', filters.priority === 'critical' ? null : 'critical')} 
                />
              </div>
              <div className="flex items-center min-h-[44px]">
                <FilterChip 
                  label="My Tickets" 
                  selected={filters.assignedAgent === 'me'} 
                  onClick={() => setFilter('assignedAgent', filters.assignedAgent === 'me' ? null : 'me')} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
