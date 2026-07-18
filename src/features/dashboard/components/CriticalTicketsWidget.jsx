import React from 'react';

export default function CriticalTicketsWidget() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-500">Critical Tickets</h3>
          <div className="text-3xl font-bold text-red-600 mt-1">12</div>
        </div>
        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>
      <div className="text-sm text-red-600 font-medium">
        +3 from last hour
      </div>
    </div>
  );
}
