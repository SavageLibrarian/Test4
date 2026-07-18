import React, { useState } from 'react';
import { Search, Award, Calendar, BookOpen, Clock, Heart, Users, MapPin, ChevronRight, Check, ExternalLink, Wrench, Database, PenTool, Compass, GraduationCap, MessageSquare } from 'lucide-react';
import { Book, LibraryEvent, BorrowedBook } from '../types';
import { BOOKS, EVENTS } from '../data';

interface HomeProps {
  setCurrentPage: (page: string) => void;
  setSearchQuery: (query: string) => void;
  setFormatFilter: (format: string) => void;
  onOpenCardModal: () => void;
  libraryCard: any;
  borrowedBooks: BorrowedBook[];
  onBorrowBook: (book: Book) => void;
  registeredEvents: string[];
  onRSVPEvent: (event: LibraryEvent) => void;
}

export default function Home({
  setCurrentPage,
  setSearchQuery,
  setFormatFilter,
  onOpenCardModal,
  libraryCard,
  borrowedBooks,
  onBorrowBook,
  registeredEvents,
  onRSVPEvent
}: HomeProps) {
  const [heroSearch, setHeroSearch] = useState('');
  const [activeBookTab, setActiveBookTab] = useState<'new' | 'trending' | 'picks'>('new');

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      window.open(`https://www.perlego.com/search?query=${encodeURIComponent(heroSearch.trim())}`, '_blank');
    } else {
      window.open('https://www.perlego.com/home', '_blank');
    }
  };

  const handleQuickCategoryClick = (category: string) => {
    if (category === 'eBooks') {
      setFormatFilter('eBook');
    } else if (category === 'Audiobooks') {
      setFormatFilter('Audiobook');
    } else {
      setFormatFilter('All');
    }
    setCurrentPage('explore');
  };

  // Tabbed book filtering
  const getTabbedBooks = (): Book[] => {
    switch (activeBookTab) {
      case 'new':
        return BOOKS.filter(b => b.publishYear >= 2023).slice(0, 4);
      case 'trending':
        return BOOKS.filter(b => b.rating >= 4.7 && b.copiesAvailable < b.totalCopies).slice(0, 4);
      case 'picks':
        return BOOKS.filter(b => b.rating >= 4.8).slice(0, 4);
      default:
        return BOOKS.slice(0, 4);
    }
  };

  // Get next 3 upcoming events
  const upcomingEvents = EVENTS.slice(0, 3);

  return (
    <div className="font-sans" id="home-page-container">
      
      {/* 1. Hero Section */}
      <section className="relative bg-[#1e3e62] text-white py-20 sm:py-24" id="home-hero-banner">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-3">
            <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-normal text-white leading-tight">
              Find your next discovery.
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Search the City College Dublin Library eBook catalogue via Perlego.
            </p>
          </div>

          {/* Catalog Search Bar */}
          <form 
            onSubmit={handleHeroSearchSubmit}
            className="max-w-xl mx-auto bg-white p-1.5 rounded-xl shadow-lg flex items-center border border-slate-200"
            id="hero-catalog-search-form"
          >
            <div className="grow relative flex items-center pl-3">
              <Search aria-hidden="true" className="w-5 h-5 text-slate-500 absolute left-3 shrink-0" />
              <input
                id="hero-search-input"
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                aria-label="Search library catalogue"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="w-full bg-transparent text-slate-900 pl-8 pr-3 py-2.5 text-sm sm:text-base outline-none font-medium"
              />
              {!heroSearch && (
                <span 
                  aria-hidden="true"
                  className="absolute left-11 text-slate-500 text-sm sm:text-base pointer-events-none font-medium select-none"
                >
                  Search library catalogue...
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#1e3e62] hover:bg-[#152d47] text-white font-semibold px-6 py-2.5 rounded-lg transition-all cursor-pointer text-sm"
              aria-label="Search"
            >
              Search
            </button>
          </form>

          {/* Popular search terms */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-200">
            <span className="font-medium text-white">Popular:</span>
            {[
              { name: 'Business', url: 'https://www.perlego.com/browse/business' },
              { name: 'Cyber Security', url: 'https://www.perlego.com/browse/computer-science/cyber-security' },
              { name: 'Computer Science', url: 'https://www.perlego.com/browse/computer-science' },
              { name: 'Social Science', url: 'https://www.perlego.com/browse/social-sciences' },
              { name: 'Psychology', url: 'https://www.perlego.com/browse/psychology' }
            ].map((item) => (
              <a 
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-slate-800/40 hover:bg-slate-800 text-slate-300 rounded-md border border-slate-700/50 cursor-pointer transition-colors"
              >
                <span>{item.name}</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Quick Access Section */}
      <section className="bg-slate-50 border-b border-slate-200 py-16" id="home-quick-access">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl text-slate-900 mb-8 tracking-tight">
            Quick access
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Box 1: Library Catalogue */}
            <a 
              href="https://www.perlego.com/home"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left group cursor-pointer bg-white p-6 rounded-xl border border-slate-200/80 hover:border-blue-600 hover:shadow-sm transition-all duration-200 flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus:outline-none"
            >
              <div>
                <div aria-hidden="true" className="w-12 h-12 rounded-xl bg-blue-50 text-[#1e3e62] flex items-center justify-center mb-4 group-hover:bg-[#1e3e62] group-hover:text-white transition-colors duration-300">
                  <ExternalLink className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-950 mb-2">
                  Library Catalogue
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  Search books and e-books via Perlego.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-700 group-hover:text-blue-900 flex items-center space-x-1">
                <span>Go to library catalogue (Perlego)</span>
                <span className="sr-only"> (opens in a new tab)</span>
                <span>&gt;</span>
              </div>
            </a>

            {/* Box 2: Databases */}
            <button 
              onClick={() => setCurrentPage('services')}
              className="w-full text-left group cursor-pointer bg-white p-6 rounded-xl border border-slate-200/80 hover:border-blue-600 hover:shadow-sm transition-all duration-200 flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus:outline-none"
            >
              <div>
                <div aria-hidden="true" className="w-12 h-12 rounded-xl bg-blue-50 text-[#1e3e62] flex items-center justify-center mb-4 group-hover:bg-[#1e3e62] group-hover:text-white transition-colors duration-300">
                  <Database className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-950 mb-2">
                  Databases
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  Access academic journals, articles, and collections.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-700 group-hover:text-blue-900 flex items-center">
                <span>Go to databases &gt;</span>
              </div>
            </button>

            {/* Box 3: Writing & Research Supports */}
            <button 
              onClick={() => setCurrentPage('writing-supports')}
              className="w-full text-left group cursor-pointer bg-white p-6 rounded-xl border border-slate-200/80 hover:border-blue-600 hover:shadow-sm transition-all duration-200 flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus:outline-none"
            >
              <div>
                <div aria-hidden="true" className="w-12 h-12 rounded-xl bg-blue-50 text-[#1e3e62] flex items-center justify-center mb-4 group-hover:bg-[#1e3e62] group-hover:text-white transition-colors duration-300">
                  <PenTool className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-950 mb-2">
                  Writing & Research Supports
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  Academic writing templates, referencing guidelines, and research helpers.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-700 group-hover:text-blue-900 flex items-center">
                <span>Go to writing & research supports &gt;</span>
              </div>
            </button>

            {/* Box 4: Subject Guides */}
            <button 
              onClick={() => setCurrentPage('locations')}
              className="w-full text-left group cursor-pointer bg-white p-6 rounded-xl border border-slate-200/80 hover:border-blue-600 hover:shadow-sm transition-all duration-200 flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus:outline-none"
            >
              <div>
                <div aria-hidden="true" className="w-12 h-12 rounded-xl bg-blue-50 text-[#1e3e62] flex items-center justify-center mb-4 group-hover:bg-[#1e3e62] group-hover:text-white transition-colors duration-300">
                  <Compass className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-950 mb-2">
                  Subject Guides
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  Interactive Padlet boards curated for your course modules.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-700 group-hover:text-blue-900 flex items-center">
                <span>Go to subject guides &gt;</span>
              </div>
            </button>

            {/* Box 5: Library Workshops */}
            <button 
              onClick={() => setCurrentPage('workshops')}
              className="w-full text-left group cursor-pointer bg-white p-6 rounded-xl border border-slate-200/80 hover:border-blue-600 hover:shadow-sm transition-all duration-200 flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus:outline-none"
            >
              <div>
                <div aria-hidden="true" className="w-12 h-12 rounded-xl bg-blue-50 text-[#1e3e62] flex items-center justify-center mb-4 group-hover:bg-[#1e3e62] group-hover:text-white transition-colors duration-300">
                  <GraduationCap className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-950 mb-2">
                  Library Workshops
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  Recorded workshops on referencing, study skills, and research tools.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-700 group-hover:text-blue-900 flex items-center">
                <span>Go to library workshops &gt;</span>
              </div>
            </button>

            {/* Box 6: Ask a Librarian */}
            <button 
              onClick={() => setCurrentPage('account')}
              className="w-full text-left group cursor-pointer bg-white p-6 rounded-xl border border-slate-200/80 hover:border-blue-600 hover:shadow-sm transition-all duration-200 flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus:outline-none"
            >
              <div>
                <div aria-hidden="true" className="w-12 h-12 rounded-xl bg-blue-50 text-[#1e3e62] flex items-center justify-center mb-4 group-hover:bg-[#1e3e62] group-hover:text-white transition-colors duration-300">
                  <MessageSquare className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-950 mb-2">
                  Ask a Librarian
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  Chat, email, or book a one-to-one consultation.
                </p>
              </div>
              <div className="text-xs font-bold text-blue-700 group-hover:text-blue-900 flex items-center">
                <span>Go to ask a librarian &gt;</span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 3. News & Events + Opening Hours Section */}
      <section className="bg-white border-b border-slate-200 py-16" id="home-news-hours">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Column 1: Opening Hours */}
            <div 
              id="opening-hours-section"
              role="region"
              aria-labelledby="opening-hours-heading"
              className="bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200 space-y-6 focus-visible:ring-2 focus-visible:ring-[#1e3e62] focus-visible:ring-offset-2 focus:outline-none"
              tabIndex={0}
            >
              <h2 id="opening-hours-heading" className="font-display font-bold text-xl text-slate-950 tracking-tight border-b border-slate-200 pb-3">
                Opening hours
              </h2>

              <div className="space-y-1.5" aria-label="Library Weekly Opening Hours">
                {[
                  { day: 'Monday', hours: '09:00 - 17:00' },
                  { day: 'Tuesday', hours: '09:00 - 17:00' },
                  { day: 'Wednesday', hours: '09:00 - 17:00' },
                  { day: 'Thursday', hours: '09:00 - 17:00' },
                  { day: 'Friday', hours: '09:00 - 17:00' },
                  { day: 'Saturday', hours: 'Closed', isClosed: true },
                  { day: 'Sunday', hours: 'Closed', isClosed: true },
                ].map((item) => (
                  <div
                    key={item.day}
                    tabIndex={0}
                    className="flex justify-between items-center h-10 border-b border-slate-100 last:border-b-0 focus-visible:ring-2 focus-visible:ring-[#1e3e62] focus-visible:ring-offset-1 focus:outline-none rounded px-1 transition-colors"
                    aria-label={`${item.day}: ${item.hours}`}
                  >
                    <span className="text-left text-slate-800 font-semibold font-sans">{item.day}</span>
                    <span className={`text-right font-bold font-sans ${item.isClosed ? 'text-slate-600' : 'text-slate-900'}`}>{item.hours}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-slate-700 leading-relaxed bg-white/60 p-3.5 rounded-lg border border-slate-200/50">
                <p className="font-semibold text-slate-800">Please note:</p>
                <p className="mt-0.5 font-medium">Special holiday arrangements and exam schedule adjustments will be announced on our news channels.</p>
              </div>
            </div>

            {/* Column 2 & 3: Latest News & Events */}
            <div 
              role="region" 
              aria-labelledby="latest-news-heading" 
              className="lg:col-span-2 space-y-6"
            >
              <h2 id="latest-news-heading" className="font-display font-bold text-2xl text-slate-950 tracking-tight">
                Latest news & events
              </h2>

              <div 
                tabIndex={0}
                aria-label="Renovation Announcement: LRC Renovation Notice. The Learning Resource Centre is currently undergoing renovations - stay tuned for more details!"
                className="bg-[#f0f7ff]/70 border border-blue-100 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 shadow-2xs focus-visible:ring-2 focus-visible:ring-[#1e3e62] focus-visible:ring-offset-2 focus:outline-none cursor-text"
              >
                <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center border border-blue-200 shrink-0">
                  <Wrench aria-hidden="true" className="w-6 h-6 text-blue-700" />
                </div>
                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="font-display font-bold text-base text-slate-900">
                    LRC Renovation Notice
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    The Learning Resource Centre is currently undergoing renovations - stay tuned for more details!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
