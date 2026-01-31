import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES } from './constants';
import { Tool, Category, RecommendationResult } from './types';
import { ToolCard } from './components/ToolCard';
import { AIRecommender } from './components/AIRecommender';
import { SubmitToolForm } from './components/SubmitToolForm';
// Removed Gemini import
import { Cpu, Github, ArrowUpDown, Tag as TagIcon, X, Heart, LayoutGrid, Bookmark, Loader2 } from 'lucide-react';

type SortOption = 'default' | 'name' | 'category' | 'pricing';
type View = 'home' | 'favorites' | 'submit';

const App: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [view, setView] = useState<View>('home');
    const [activeCategory, setActiveCategory] = useState<Category>('All');
    const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('default');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Fetch tools from API
    useEffect(() => {
        const fetchTools = async () => {
            try {
                const response = await fetch('/api/tools');
                if (!response.ok) throw new Error('Failed to fetch tools');
                const data = await response.json();
                setTools(data);
            } catch (err) {
                console.error("Error fetching tools:", err);
                setError("Failed to load tools. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTools();
    }, []);

    // Favorites State
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('aiverse-favorites');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to load favorites", e);
            return [];
        }
    });

    const toggleFavorite = (id: string) => {
        setFavorites(prev => {
            const newFavorites = prev.includes(id)
                ? prev.filter(favId => favId !== id)
                : [...prev, id];

            localStorage.setItem('aiverse-favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    // Compute unique tags sorted by frequency
    const popularTags = useMemo(() => {
        const counts: Record<string, number> = {};
        tools.forEach(t => t.tags.forEach(tag => counts[tag] = (counts[tag] || 0) + 1));
        return Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    }, [tools]);

    // Derived state for tools to display
    const displayedTools = useMemo(() => {
        let result: { tool: Tool, reason?: string }[] = [];

        if (view === 'favorites') {
            // Favorites View: Show only favorites
            const favTools = tools.filter(t => favorites.includes(t.id));
            result = favTools.map(t => ({ tool: t, reason: undefined }));
        } else {
            // Home View: Standard logic
            if (searchQuery.length > 0) {
                // Local Search Logic
                const lowerQuery = searchQuery.toLowerCase();
                const matchedTools = tools.filter(t =>
                    t.name.toLowerCase().includes(lowerQuery) ||
                    t.description.toLowerCase().includes(lowerQuery) ||
                    t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
                    t.category.toLowerCase().includes(lowerQuery)
                );

                result = matchedTools.map(t => ({ tool: t, reason: 'Matched via search' }));
            } else {
                let filtered = tools;
                if (activeCategory !== 'All') {
                    filtered = filtered.filter(t => t.category === activeCategory);
                }
                result = filtered.map(t => ({ tool: t, reason: undefined }));
            }
        }

        // Common: Filter by Selected Tags
        if (selectedTags.length > 0) {
            result = result.filter(item =>
                selectedTags.every(tag => item.tool.tags.includes(tag))
            );
        }

        // Common: Sort
        return [...result].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.tool.name.localeCompare(b.tool.name);
                case 'category':
                    return a.tool.category.localeCompare(b.tool.category);
                case 'pricing':
                    const weights = { 'Free': 0, 'Freemium': 1, 'Paid': 2 };
                    return weights[a.tool.pricing] - weights[b.tool.pricing];
                default:
                    return 0;
            }
        });
    }, [view, activeCategory, recommendations, sortBy, selectedTags, favorites, tools]);

    const handleAISearch = async (query: string) => {
        setSearchQuery(query);
        setActiveCategory('All');
        setSortBy('default');
        setSelectedTags([]);

        // Automatically switch to home view if searching
        if (view !== 'home') setView('home');
    };

    const resetFilters = () => {
        setRecommendations([]);
        setSearchQuery('');
        setSortBy('default');
        setSelectedTags([]);
        setActiveCategory('All');
        if (view !== 'home') setView('home');
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    // Check if any filters are active (Home view only)
    const hasActiveFilters = useMemo(() => {
        if (view !== 'home') return false;
        return searchQuery.length > 0 || activeCategory !== 'All' || selectedTags.length > 0;
    }, [view, searchQuery, activeCategory, selectedTags]);

    // View Navigation
    const goHome = () => {
        setView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goFavorites = () => {
        setView('favorites');
        setSortBy('default');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goSubmit = () => {
        setView('submit');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-lg border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={goHome}
                            className="flex items-center gap-2 focus:outline-none hover:opacity-80 transition-opacity"
                        >
                            <div className="bg-indigo-600 p-1.5 rounded-lg">
                                <Cpu size={24} className="text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight">AI<span className="text-indigo-400">verse</span></span>
                        </button>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button
                                onClick={goHome}
                                className={`text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${view === 'home' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                            >
                                <LayoutGrid size={18} />
                                <span className="hidden sm:inline">Directory</span>
                            </button>

                            <button
                                onClick={goFavorites}
                                className={`text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${view === 'favorites' ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : 'text-slate-400 hover:text-pink-300 hover:bg-slate-800/50'}`}
                            >
                                <Heart size={18} className={view === 'favorites' ? "fill-pink-500/20" : ""} />
                                <span className="hidden sm:inline">Favorites</span>
                                {favorites.length > 0 && (
                                    <span className="bg-pink-500 text-white text-[10px] font-bold px-1.5 rounded-full min-w-[18px] text-center">
                                        {favorites.length}
                                    </span>
                                )}
                            </button>

                            <div className="h-6 w-px bg-slate-700 mx-1 hidden sm:block"></div>

                            <button
                                onClick={goSubmit}
                                className={`text-sm px-2 py-1 hover:text-white transition-colors ${view === 'submit' ? 'text-white font-medium' : 'text-slate-400'}`}
                            >
                                Submit Tool
                            </button>

                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center pt-12 px-4 pb-20">

                {view === 'submit' ? (
                    <SubmitToolForm onBack={goHome} />
                ) : (
                    <>
                        {view === 'home' ? (
                            <>
                                {/* Hero Section */}
                                <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
                                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-200 mb-6">
                                        Find the Perfect AI Tool <br /> for Any Task
                                    </h1>
                                    <p className="text-lg text-slate-400 mb-8">
                                        Navigate the expanding universe of Artificial Intelligence.
                                        Search for the best tools to enhance your workflow.
                                    </p>
                                </div>

                                {/* AI Search */}
                                <div className="animate-fade-in animation-delay-100 w-full flex justify-center">
                                    <AIRecommender
                                        onSearch={handleAISearch}
                                        isSearching={false}
                                        onClear={resetFilters}
                                        hasResults={searchQuery.length > 0}
                                    />
                                </div>
                            </>
                        ) : (
                            /* Favorites Header */
                            <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
                                <div className="inline-flex items-center justify-center p-3 bg-pink-500/10 rounded-full mb-4">
                                    <Heart size={32} className="text-pink-500 fill-pink-500/20" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    My Saved Tools
                                </h1>
                                <p className="text-slate-400">
                                    Your personal collection of {favorites.length} AI resources.
                                </p>
                            </div>
                        )}

                        {/* Section Divider / Filters */}
                        <div className="w-full max-w-7xl mb-8 animate-fade-in">

                            {/* Loading & Error States */}
                            {isLoading ? (
                                <div className="flex flex-col items-center py-20 text-slate-400">
                                    <Loader2 size={40} className="animate-spin text-indigo-500 mb-4" />
                                    <p>Loading tools...</p>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center py-20 text-red-400">
                                    <p>{error}</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="mt-4 px-4 py-2 bg-slate-800 rounded-lg text-white hover:bg-slate-700 transition-colors"
                                    >
                                        Retry
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Filters are only shown on Home view OR if we are in favorites but have items */}
                                    {(view === 'home' || (view === 'favorites' && displayedTools.length > 0)) && (
                                        <>
                                            {/* Header for Search Results */}
                                            {view === 'home' && recommendations.length > 0 && (
                                                <div className="flex items-center justify-between mb-6">
                                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                                        Search Results for "{searchQuery}"
                                                    </h2>
                                                    <button
                                                        onClick={resetFilters}
                                                        className="text-sm text-slate-400 hover:text-white underline"
                                                    >
                                                        Back to Directory
                                                    </button>
                                                </div>
                                            )}

                                            {/* Category Filters (Only on Home when not searching) */}
                                            {view === 'home' && searchQuery.length === 0 && (
                                                <div className="flex flex-col items-center gap-6 mb-10">
                                                    {/* Category Filters */}
                                                    <div className="flex flex-wrap justify-center gap-3">
                                                        {CATEGORIES.map((cat) => (
                                                            <button
                                                                key={cat}
                                                                onClick={() => setActiveCategory(cat)}
                                                                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out transform flex items-center gap-2 active:scale-95 ${activeCategory === cat
                                                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105 ring-1 ring-indigo-400'
                                                                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10 border border-slate-700/50'
                                                                    }`}
                                                            >
                                                                {cat}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    {/* Tag Filters */}
                                                    <div className="w-full max-w-3xl">
                                                        <div className="flex flex-wrap justify-center gap-2">
                                                            {popularTags.slice(0, 15).map(tag => (
                                                                <button
                                                                    key={tag}
                                                                    onClick={() => toggleTag(tag)}
                                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ease-in-out transform active:scale-95 ${selectedTags.includes(tag)
                                                                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 hover:bg-indigo-500/30 scale-105 shadow-sm shadow-indigo-500/20'
                                                                        : 'bg-slate-800/50 text-slate-400 border-slate-700/50 hover:border-slate-600 hover:text-slate-300 hover:scale-105'
                                                                        }`}
                                                                >
                                                                    <TagIcon size={10} className={`transition-colors duration-200 ${selectedTags.includes(tag) ? 'text-indigo-400' : 'text-slate-500'}`} />
                                                                    {tag}
                                                                </button>
                                                            ))}
                                                        </div>
                                                        {selectedTags.length > 0 && (
                                                            <div className="flex justify-center mt-3">
                                                                <button
                                                                    onClick={() => setSelectedTags([])}
                                                                    className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                                                                >
                                                                    <X size={12} /> Clear all tags
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Controls Bar: Clear Filters & Sorting */}
                                    {displayedTools.length > 0 && (
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

                                            {/* Clear Filters (Left aligned on desktop) */}
                                            <div className="flex-1">
                                                {hasActiveFilters && (
                                                    <button
                                                        onClick={resetFilters}
                                                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-700/50 group"
                                                    >
                                                        <X size={14} className="group-hover:rotate-90 transition-transform" />
                                                        <span>Clear All Filters</span>
                                                    </button>
                                                )}
                                            </div>

                                            {/* Sort (Right aligned) */}
                                            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 shadow-sm transition-colors hover:border-slate-600 self-end sm:self-auto">
                                                <ArrowUpDown size={14} className="text-slate-400" />
                                                <span className="text-xs text-slate-500 font-medium mr-1">Sort by:</span>
                                                <select
                                                    value={sortBy}
                                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                                    className="bg-transparent text-sm text-slate-200 font-medium focus:outline-none cursor-pointer"
                                                >
                                                    <option value="default" className="bg-slate-800">Default</option>
                                                    <option value="name" className="bg-slate-800">Name (A-Z)</option>
                                                    <option value="category" className="bg-slate-800">Category</option>
                                                    <option value="pricing" className="bg-slate-800">Pricing (Free First)</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}

                                    {/* Grid */}
                                    {displayedTools.length === 0 ? (
                                        <div className="text-center py-20 bg-slate-800/30 rounded-2xl border border-slate-800 border-dashed">
                                            {view === 'favorites' ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="p-4 bg-slate-700/30 rounded-full mb-4">
                                                        <Bookmark size={32} className="text-slate-500" />
                                                    </div>
                                                    <h3 className="text-xl font-medium text-white mb-2">No favorites yet</h3>
                                                    <p className="text-slate-500 max-w-sm mb-6">
                                                        Click the heart icon on any tool to save it to your personal collection for quick access.
                                                    </p>
                                                    <button
                                                        onClick={goHome}
                                                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium"
                                                    >
                                                        Browse Tools
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="text-slate-500 text-lg">No tools found matching your criteria.</p>
                                                    <button onClick={resetFilters} className="mt-4 text-indigo-400 hover:text-indigo-300">Clear all filters</button>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {displayedTools.map((item) => (
                                                <ToolCard
                                                    key={item.tool.id}
                                                    tool={item.tool}
                                                    recommendationReason={item.reason}
                                                    isFavorite={favorites.includes(item.tool.id)}
                                                    onToggleFavorite={() => toggleFavorite(item.tool.id)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-slate-500 mb-4">Powered by Neon Postgres</p>
                    <p className="text-slate-600 text-sm">
                        © {new Date().getFullYear()} AIverse Directory. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;