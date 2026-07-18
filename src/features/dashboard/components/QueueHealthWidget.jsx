import React from 'react';

export default function QueueHealthWidget() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-500">Queue Health</h3>
          <div className="text-3xl font-bold text-emerald-600 mt-1">94%</div>
        </div>
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div className="text-sm text-slate-500">
        Average wait time: 2m 14s
      </div>
    </div>
  );
}
