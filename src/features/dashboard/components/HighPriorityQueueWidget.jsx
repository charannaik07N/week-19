import React from 'react';

export default function HighPriorityQueueWidget() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-500">High Priority Queue</h3>
          <div className="text-3xl font-bold text-amber-600 mt-1">15</div>
        </div>
        <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
          </svg>
        </div>
      </div>
      <div className="text-sm text-amber-600 font-medium">
        Trending upward
      </div>
    </div>
  );
}
