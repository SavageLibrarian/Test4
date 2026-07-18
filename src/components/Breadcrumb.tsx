import React from 'react';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';

interface BreadcrumbProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const BREADCRUMB_LABELS: Record<string, string> = {
  explore: 'Catalogue Search',
  services: 'Databases Center',
  'writing-supports': 'Writing & Research Supports',
  events: 'Library Events Calendar',
  workshops: 'Recorded Workshops',
  locations: 'Subject Guides',
  account: 'My Account Help Desk',
  accessibility: 'Accessibility Statement',
};

export default function Breadcrumb({ currentPage, setCurrentPage }: BreadcrumbProps) {
  const label = BREADCRUMB_LABELS[currentPage] || currentPage;

  const handleHomeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentPage('home');
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="bg-slate-100 border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3"
      id="site-breadcrumbs"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-600 font-medium">
          {/* Home Link */}
          <li className="flex items-center">
            <button
              onClick={handleHomeClick}
              className="inline-flex items-center gap-1.5 text-blue-700 hover:text-blue-900 hover:underline focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 focus:outline-none rounded-md px-1 py-0.5 transition-colors cursor-pointer"
              aria-label="Home page"
            >
              <HomeIcon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Home</span>
            </button>
          </li>

          {/* Separator */}
          <li className="flex items-center" aria-hidden="true">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </li>

          {/* Current Page */}
          <li className="flex items-center min-w-0">
            <span 
              aria-current="page"
              className="text-slate-800 font-bold truncate"
            >
              {label}
            </span>
          </li>
        </ol>
      </div>
    </nav>
  );
}
