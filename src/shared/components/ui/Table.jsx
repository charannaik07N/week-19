'use client';
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export function Table({ columns, data = [], className }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage) || 1;
  const currentData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className={clsx("w-full min-w-0 flex flex-col border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm", className)}>
      <div className="w-full overflow-x-auto flex-1">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className={clsx(
                    "px-4 py-2 font-medium whitespace-nowrap", 
                    col.sortable && "cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
                  )}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortConfig.key === col.key && (
                      sortConfig.direction === 'asc' 
                        ? <ChevronUp className="w-4 h-4 text-blue-600" /> 
                        : <ChevronDown className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {currentData.length > 0 ? (
              currentData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Showing <span className="font-medium text-slate-900 dark:text-slate-100">{Math.min((currentPage - 1) * rowsPerPage + 1, sortedData.length)}</span> to <span className="font-medium text-slate-900 dark:text-slate-100">{Math.min(currentPage * rowsPerPage, sortedData.length)}</span> of <span className="font-medium text-slate-900 dark:text-slate-100">{sortedData.length}</span> entries
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 px-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
