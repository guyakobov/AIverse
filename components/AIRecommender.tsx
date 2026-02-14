import React, { useState, useCallback } from 'react';
import { Sparkles, ArrowRight, Loader2, X } from 'lucide-react';

interface AIRecommenderProps {
  onSearch: (query: string) => Promise<void>;
  isSearching: boolean;
  onClear: () => void;
  hasResults: boolean;
}

export const AIRecommender: React.FC<AIRecommenderProps> = ({ onSearch, isSearching, onClear, hasResults }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  }

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 sm:mb-12 px-2 sm:px-0">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse"></div>
        <div className="relative bg-slate-900 rounded-2xl border border-slate-700/50 shadow-2xl p-1">
          <form onSubmit={handleSubmit} className="flex items-center gap-1 sm:gap-2">
            <div className="pl-3 sm:pl-4 text-indigo-400">
              {isSearching ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} className="sm:w-6 sm:h-6" />}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your task..."
              className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 focus:outline-none py-3 sm:py-4 px-1 sm:px-2 text-sm sm:text-lg w-full"
              disabled={isSearching}
            />

            {hasResults && !isSearching && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 sm:p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            )}

            <button
              type="submit"
              disabled={!query.trim() || isSearching}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all flex items-center gap-2 m-1 text-xs sm:text-base whitespace-nowrap"
            >
              {isSearching ? '...' : (
                <>
                  <span className="hidden sm:inline">Find Tools</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-4 text-xs text-slate-500">
        <span>Try: "Help me write SEO blog posts"</span>
        <span>•</span>
        <span>"Generate realistic cat images"</span>
        <span>•</span>
        <span>"Debug my React code"</span>
      </div>
    </div>
  );
};