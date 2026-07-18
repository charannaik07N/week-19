'use client';

import TopNav from './TopNav';
import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-secondary dark:bg-slate-950">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden flex flex-col relative">
          {children}
        </main>
      </div>
    </div>
  );
}
