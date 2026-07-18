'use client';
import { useState } from 'react';
import SearchBar from '@/shared/components/ui/SearchBar';
import Badge from '@/shared/components/ui/Badge';

export function SearchView() {
  const [query, setQuery] = useState('');

  // dummy results
  const allResults = [
    { id: 1, type: 'Agent', title: 'Support Bot', description: 'Handles tier 1 customer support' },
    { id: 2, type: 'Agent', title: 'Sales Assistant', description: 'Lead qualification and outreach' },
    { id: 3, type: 'Workflow', title: 'Daily Report Gen', description: 'Generates daily usage reports at midnight' },
    { id: 4, type: 'Knowledge', title: 'Product Docs', description: 'Company product documentation vector store' },
  ];

  const results = query
    ? allResults.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) || 
        r.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Global Search</h1>
        <div className="max-w-xl mx-auto">
          <SearchBar 
            value={query} 
            onChange={setQuery} 
            placeholder="Search agents, workflows, knowledge bases..." 
            className="w-full text-base"
          />
        </div>
      </div>

      {query && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {results.length} result{results.length !== 1 && 's'} for "{query}"
          </h2>
          
          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((result) => (
                <div key={result.id} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 transition-colors cursor-pointer shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">{result.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{result.description}</p>
                    </div>
                    <Badge>{result.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">No results found for "{query}".</p>
            </div>
          )}
        </div>
      )}
      
      {!query && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
          {['Agents', 'Workflows', 'Tasks', 'Settings'].map((category) => (
            <div key={category} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <p className="font-medium text-slate-700 dark:text-slate-300">{category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
