import React from 'react';

export default function FreightAlertsWidget() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-slate-500">Freight Alerts</h3>
          <div className="text-3xl font-bold text-slate-900 mt-1">3</div>
        </div>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div className="text-sm text-slate-500">
        2 delays, 1 re-route
      </div>
    </div>
  );
}
