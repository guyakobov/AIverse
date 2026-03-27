import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS } from './constants';
import { Tool, Category, RecommendationResult } from './types';
import { ToolCard } from './components/ToolCard';
import { AIRecommender } from './components/AIRecommender';
import { SubmitToolForm } from './components/SubmitToolForm';
import { ToolDetails } from './components/ToolDetails';
import { LegalPage } from './components/LegalPage';
import { CookieConsent } from './components/CookieConsent';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { Cpu, ArrowUpDown, Tag as TagIcon, X, Heart, LayoutGrid, Bookmark, Loader2, ChevronRight, Linkedin, Twitter, Github, Mail } from 'lucide-react';

type SortOption = 'default' | 'name' | 'category' | 'pricing';
type View = 'home' | 'favorites' | 'submit' | 'tool-details' | 'legal';
type LegalType = 'terms' | 'privacy' | 'disclaimer' | 'accessibility' | 'dmca' | 'cookies' | 'imprint' | 'contact' | 'editorial' | 'disclosure';

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
    const [selectedToolId, setSelectedToolId] = useState<number | null>(null);
    const [legalType, setLegalType] = useState<LegalType | null>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Dynamic Page Title & Hash routing
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            let title = 'AIverse - Best AI Tools Directory';

            if (hash.startsWith('#tool/')) {
                const idString = hash.replace('#tool/', '');
                const id = parseInt(idString, 10);
                if (!isNaN(id)) {
                    setSelectedToolId(id);
                    setView('tool-details');
                }
                // Title will be updated in ToolDetails or after tool fetch
            } else if (hash.startsWith('#legal/')) {
                const type = hash.replace('#legal/', '') as LegalType;
                setLegalType(type);
                setView('legal');
                title = `${type.charAt(0).toUpperCase() + type.slice(1)} - AIverse`;
            } else if (hash === '#favorites') {
                setView('favorites');
                title = 'My Favorites - AIverse';
            } else if (hash === '#submit') {
                setView('submit');
                title = 'Submit a Tool - AIverse';
            } else {
                setView('home');
            }
            document.title = title;
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // Initial check

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Update title when tool is selected
    useEffect(() => {
        if (view === 'tool-details' && selectedToolId) {
            const tool = tools.find(t => t.id === selectedToolId);
            if (tool) {
                document.title = `${tool.name} - AIverse Executive Directory`;
            }
        }
    }, [view, selectedToolId, tools]);

    const fetchTools = async (search?: string) => {
        setIsLoading(true);
        try {
            const url = search ? `/api/tools?q=${encodeURIComponent(search)}` : '/api/tools';
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch tools');
            const data = await response.json();
            setTools(data);
        } catch (err) {
            console.error("Error fetching tools:", err);
            setError('Failed to load tools. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTools();
    }, []);

    // Favorites State
    const [favorites, setFavorites] = useState<number[]>(() => {
        try {
            const saved = localStorage.getItem('aiverse-favorites');
            return saved ? JSON.parse(saved).map((id: any) => typeof id === 'string' ? parseInt(id, 10) : id).filter((id: any) => !isNaN(id)) : [];
        } catch (e) {
            console.error("Failed to load favorites", e);
            return [];
        }
    });

    const toggleFavorite = (id: number) => {
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
            const favTools = tools.filter(t => favorites.includes(t.id));
            result = favTools.map(t => ({ tool: t, reason: undefined }));
        } else {
            if (searchQuery.length > 0) {
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

        if (selectedTags.length > 0) {
            result = result.filter(item =>
                selectedTags.every(tag => item.tool.tags.includes(tag))
            );
        }

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

    // Grouping tools by category for the "All" view
    const groupedTools = useMemo<Record<string, { tool: Tool, reason?: string }[]> | null>(() => {
        if (activeCategory !== 'All' || searchQuery.length > 0 || view !== 'home') return null;

        const groups: Record<string, { tool: Tool, reason?: string }[]> = {};
        CATEGORIES.filter(c => c !== 'All').forEach(cat => {
            const catTools = displayedTools.filter(item => item.tool.category === cat);
            if (catTools.length > 0) {
                groups[cat] = catTools;
            }
        });
        return Object.keys(groups).length > 0 ? groups : null;
    }, [displayedTools, activeCategory, searchQuery, view]);

    const handleAISearch = async (query: string) => {
        setSearchQuery(query);
        setActiveCategory('All');
        setSortBy('default');
        setSelectedTags([]);
        if (view !== 'home') setView('home');

        // Debounce search
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            fetchTools(query);
        }, 300); // 300ms debounce
    };

    const resetFilters = () => {
        setRecommendations([]);
        setSearchQuery('');
        setSortBy('default');
        setSelectedTags([]);
        setActiveCategory('All');
        if (view !== 'home') setView('home');
        fetchTools();
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const hasActiveFilters = useMemo(() => {
        if (view !== 'home') return false;
        return searchQuery.length > 0 || activeCategory !== 'All' || selectedTags.length > 0;
    }, [view, searchQuery, activeCategory, selectedTags]);

    const goHome = () => {
        window.location.hash = '';
        setView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goFavorites = () => {
        window.location.hash = 'favorites';
        setView('favorites');
        setSortBy('default');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goSubmit = () => {
        window.location.hash = 'submit';
        setView('submit');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const openToolDetails = (id: number) => {
        window.location.hash = `tool/${id}`;
        setSelectedToolId(id);
        setView('tool-details');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openLegalPage = (type: LegalType) => {
        window.location.hash = `legal/${type}`;
        setLegalType(type);
        setView('legal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const FooterLink = ({ type, label }: { type: LegalType, label: string }) => (
        <li>
            <button
                onClick={() => openLegalPage(type)}
                className="text-slate-500 hover:text-indigo-400 text-sm transition-colors font-medium border-none bg-transparent cursor-pointer"
            >
                {label}
            </button>
        </li>
    );

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans">
            <a href="#main-content" className="skip-link">
                Skip to content
            </a>
            <CookieConsent />
            <AccessibilityWidget />
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
                    <div className="flex items-center justify-between h-20">
                        <button
                            onClick={goHome}
                            className="flex items-center gap-3 focus:outline-none group"
                        >
                            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
                                <Cpu size={24} className="text-white" />
                            </div>
                            <span className="font-extrabold text-2xl tracking-tight text-white">AI<span className="text-indigo-400">verse</span></span>
                        </button>
                        <div className="flex items-center gap-2 sm:gap-6">
                            <button
                                onClick={goHome}
                                className={`text-sm font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${view === 'home' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                            >
                                <LayoutGrid size={18} />
                                <span className="hidden sm:inline">Directory</span>
                            </button>

                            <button
                                onClick={goFavorites}
                                className={`text-sm font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2.5 ${view === 'favorites' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20 shadow-lg shadow-pink-500/10' : 'text-slate-400 hover:text-pink-400 hover:bg-pink-500/5'}`}
                            >
                                <Heart size={18} className={view === 'favorites' ? "fill-pink-500" : ""} />
                                <span className="hidden sm:inline">Favorites</span>
                                {favorites.length > 0 && (
                                    <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] shadow-sm">
                                        {favorites.length}
                                    </span>
                                )}
                            </button>

                            <div className="h-8 w-px bg-slate-800 mx-2 hidden sm:block"></div>

                            <button
                                onClick={goSubmit}
                                className={`text-sm font-bold px-4 py-2.5 rounded-xl border transition-all ${view === 'submit' ? 'border-indigo-500 text-white' : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'}`}
                            >
                                Submit Tool
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main id="main-content" className="flex-grow flex flex-col items-center pt-8 px-4 pb-20 max-w-7xl mx-auto w-full" tabIndex={-1}>

                {view === 'tool-details' && selectedToolId ? (
                    (() => {
                        const tool = tools.find(t => t.id === selectedToolId);
                        return tool ? (
                            <ToolDetails
                                tool={tool}
                                onBack={goHome}
                                isFavorite={favorites.includes(tool.id)}
                                onToggleFavorite={() => toggleFavorite(tool.id)}
                            />
                        ) : (
                            <div className="py-32 text-center">
                                <h2 className="text-2xl font-bold text-white mb-4">Tool not found</h2>
                                <button onClick={goHome} className="text-indigo-400 font-bold">Back to Home</button>
                            </div>
                        );
                    })()
                ) : view === 'legal' && legalType ? (
                    <LegalPage type={legalType} onBack={goHome} />
                ) : view === 'submit' ? (
                    <SubmitToolForm onBack={goHome} />
                ) : (
                    <>
                        {view === 'home' ? (
                            <>
                                {/* Hero Section */}
                                <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 mt-4 sm:mt-8 animate-fade-in px-4">
                                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 sm:mb-8 tracking-tight leading-tight sm:leading-tight">
                                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">Expanding Universe</span> of AI Tools
                                    </h1>
                                    <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 leading-relaxed font-medium">
                                        Your curated directory for the most powerful AI software on the planet. Search, discover, and build your perfect workflow.
                                    </p>

                                    {/* AI Search */}
                                    <div className="w-full flex justify-center">
                                        <AIRecommender
                                            onSearch={handleAISearch}
                                            isSearching={false}
                                            onClear={resetFilters}
                                            hasResults={searchQuery.length > 0}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* Favorites Header */
                            <div className="text-center max-w-2xl mx-auto mb-16 mt-8 animate-fade-in">
                                <div className="inline-flex items-center justify-center p-5 bg-pink-500/10 rounded-2xl mb-6 border border-pink-500/20 shadow-xl shadow-pink-500/5">
                                    <Heart size={44} className="text-pink-500 fill-pink-500/20" />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                                    My Saved Tools
                                </h2>
                                <p className="text-lg text-slate-400 font-medium">
                                    Your personal collection of <span className="text-pink-400 font-bold">{favorites.length}</span> high-performance tools.
                                </p>
                            </div>
                        )}

                        <div className="w-full mb-12 animate-fade-in px-4">
                            {isLoading ? (
                                <div className="flex flex-col items-center py-32 text-slate-500">
                                    <Loader2 size={48} className="animate-spin text-indigo-500 mb-6" />
                                    <p className="text-lg font-medium">Initializing AI directory...</p>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center py-32 text-red-500">
                                    <p className="text-xl font-bold mb-6">{error}</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="px-8 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold"
                                    >
                                        Retry Connection
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {(view === 'home' || (view === 'favorites' && displayedTools.length > 0)) && (
                                        <>
                                            {view === 'home' && searchQuery.length > 0 && recommendations.length > 0 && (
                                                <div className="flex items-center justify-between mb-10 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
                                                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                                        Results for <span className="text-indigo-400 italic">"{searchQuery}"</span>
                                                    </h2>
                                                    <button
                                                        onClick={resetFilters}
                                                        className="text-sm font-bold text-slate-400 hover:text-white transition-colors bg-slate-800/80 px-4 py-2 rounded-lg"
                                                    >
                                                        Directory Root
                                                    </button>
                                                </div>
                                            )}

                                            {view === 'home' && searchQuery.length === 0 && (
                                                <div className="flex flex-col items-center gap-8 mb-16">
                                                    {/* Category Tabs */}
                                                        <div
                                                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full max-w-5xl bg-slate-900/30 p-2 rounded-2xl border border-slate-800/50 backdrop-blur-sm"
                                                        role="tablist"
                                                        aria-label="Filter by Tool Category"
                                                    >
                                                        {CATEGORIES.map((cat) => {
                                                            const colorSet = CATEGORY_COLORS[cat] || CATEGORY_COLORS['All'];
                                                            const CatIcon = CATEGORY_ICONS[cat] || LayoutGrid;
                                                            return (
                                                                <button
                                                                    key={cat}
                                                                    onClick={() => setActiveCategory(cat)}
                                                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 w-full ${activeCategory === cat
                                                                        ? `bg-${colorSet.primary} text-white shadow-lg shadow-${colorSet.primary}/30`
                                                                        : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
                                                                        }`}
                                                                    role="tab"
                                                                    aria-selected={activeCategory === cat}
                                                                    aria-pressed={activeCategory === cat}
                                                                    aria-controls={`category-panel-${cat}`}
                                                                >
                                                                    <CatIcon size={16} />
                                                                    {cat}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}


                                    {/* Grid Layout */}
                                    {displayedTools.length === 0 ? (
                                        <div className="text-center py-32 bg-slate-900/20 rounded-3xl border border-slate-800/50 border-dashed backdrop-blur-sm">
                                            {view === 'favorites' ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="p-6 bg-slate-800/50 rounded-3xl mb-6 shadow-xl border border-slate-700/50">
                                                        <Bookmark size={48} className="text-slate-600" />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-white mb-3">Your library is empty</h3>
                                                    <p className="text-slate-500 max-w-sm mb-10 font-medium">
                                                        Heart your favorite tools to building your custom AI toolkit for high-performance work.
                                                    </p>
                                                    <button
                                                        onClick={goHome}
                                                        className="px-10 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl transition-all font-bold shadow-lg shadow-indigo-500/25"
                                                    >
                                                        Explore the Directory
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <div className="p-6 bg-slate-800/50 rounded-3xl mb-6 shadow-xl border border-slate-700/50">
                                                        <X size={48} className="text-red-500/50" />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-white mb-3">No tools found</h3>
                                                    <p className="text-slate-500 mb-8 font-medium">Try adjusting your filters or search query.</p>
                                                    <button onClick={resetFilters} className="px-8 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-all font-bold">Clear all filters</button>
                                                </div>
                                            )}
                                        </div>
                                    ) : (groupedTools && Object.keys(groupedTools).length > 0) ? (
                                        /* Grouped View (Category sections) */
                                        <div className="space-y-20">
                                            {(Object.entries(groupedTools) as [string, { tool: Tool, reason?: string }[]][]).map(([cat, toolsInCategory]) => {
                                                if (toolsInCategory.length === 0) return null;
                                                const colorSet = CATEGORY_COLORS[cat as Category] || CATEGORY_COLORS['All'];
                                                const CatIcon = CATEGORY_ICONS[cat as Category] || LayoutGrid;
                                                return (
                                                    <section key={cat} className="animate-fade-in">
                                                        <div className="flex items-center gap-4 mb-8">
                                                            <div className={`p-3 rounded-2xl bg-${colorSet.primary}/10 border border-${colorSet.primary}/20 shadow-sm shadow-${colorSet.primary}/5`}>
                                                                <CatIcon size={28} className={`text-${colorSet.text}`} />
                                                            </div>
                                                            <div>
                                                                <h2 className="text-3xl font-black text-white leading-none mb-1">{cat}</h2>
                                                                <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.2em]">{toolsInCategory.length} Available Tools</p>
                                                            </div>
                                                            <div className="flex-grow h-px bg-slate-800/50 ml-4"></div>
                                                            <button
                                                                onClick={() => setActiveCategory(cat as Category)}
                                                                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-all uppercase tracking-widest group"
                                                            >
                                                                View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                            </button>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                            {toolsInCategory.map((item) => (
                                                                <ToolCard
                                                                    key={item.tool.id}
                                                                    tool={item.tool}
                                                                    recommendationReason={item.reason}
                                                                    isFavorite={favorites.includes(item.tool.id)}
                                                                    onToggleFavorite={() => toggleFavorite(item.tool.id)}
                                                                    onClick={() => openToolDetails(item.tool.id)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </section>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        /* Standard Grid View */
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {displayedTools.map((item) => (
                                                <ToolCard
                                                    key={item.tool.id}
                                                    tool={item.tool}
                                                    recommendationReason={item.reason}
                                                    isFavorite={favorites.includes(item.tool.id)}
                                                    onToggleFavorite={() => toggleFavorite(item.tool.id)}
                                                    onClick={() => openToolDetails(item.tool.id)}
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
            <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-1.5 rounded-lg">
                                    <Cpu size={20} className="text-white" />
                                </div>
                                <span className="font-extrabold text-xl tracking-tight text-white">AI<span className="text-indigo-400">verse</span></span>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium mb-8">
                                <span className="text-slate-300 font-bold block mb-2 underline decoration-indigo-500/30 underline-offset-4">Advertiser Disclosure</span>
                                AIverse is committed to rigorous editorial standards for world-class technology. To keep our high-performance directory free, we may receive compensation when you click some links on our site.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-indigo-600 transition-all group" aria-label="LinkedIn">
                                    <Linkedin size={18} className="text-slate-400 group-hover:text-white" />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-sky-500 transition-all group" aria-label="X (Twitter)">
                                    <Twitter size={18} className="text-slate-400 group-hover:text-white" />
                                </a>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-slate-700 transition-all group" aria-label="GitHub">
                                    <Github size={18} className="text-slate-400 group-hover:text-white" />
                                </a>
                                <button onClick={() => openLegalPage('contact')} className="p-2 bg-slate-900 rounded-lg hover:bg-emerald-600 transition-all group" aria-label="Contact Email">
                                    <Mail size={18} className="text-slate-400 group-hover:text-white" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8 opacity-50">Directories</h4>
                            <ul className="space-y-4">
                                {CATEGORIES.slice(1, 4).map(cat => (
                                    <li key={cat}>
                                        <button 
                                            onClick={() => { setActiveCategory(cat); goHome(); }}
                                            className="text-slate-400 hover:text-indigo-400 text-sm transition-colors font-semibold flex items-center gap-2 group"
                                        >
                                            <div className="w-1 h-1 bg-slate-800 rounded-full group-hover:bg-indigo-500 transition-colors"></div>
                                            {cat} Solutions
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button 
                                        onClick={() => { setActiveCategory('Vibe Coding'); goHome(); }}
                                        className="text-slate-400 hover:text-fuchsia-400 text-sm transition-colors font-semibold flex items-center gap-2 group"
                                    >
                                        <div className="w-1 h-1 bg-slate-800 rounded-full group-hover:bg-fuchsia-500 transition-colors"></div>
                                        Vibe Coding Hub
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8 opacity-50">Ecosystem</h4>
                            <ul className="space-y-4">
                                <li><button onClick={goHome} className="text-slate-400 hover:text-white text-sm transition-colors font-semibold">Directory Home</button></li>
                                <li><button onClick={goFavorites} className="text-slate-400 hover:text-white text-sm transition-colors font-semibold">My Saved Stack</button></li>
                                <li><button onClick={goSubmit} className="text-slate-400 hover:text-white text-sm transition-colors font-semibold">Submit a Tool</button></li>
                                <li><button onClick={() => openLegalPage('contact')} className="text-indigo-400/80 hover:text-indigo-300 text-sm transition-colors font-bold italic">Update Existing Tool</button></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-8 opacity-50">Governance</h4>
                            <ul className="space-y-4">
                                <FooterLink type="editorial" label="Editorial Standards" />
                                <FooterLink type="disclosure" label="Advertiser Disclosure" />
                                <FooterLink type="terms" label="Terms of Service" />
                                <FooterLink type="privacy" label="Privacy & Data" />
                                <FooterLink type="imprint" label="Imprint / Legal" />
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
                                Optimized with Neon
                            </div>
                            <div className="h-4 w-px bg-slate-900"></div>
                            <div className="text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
                                Verified Directory
                            </div>
                        </div>
                        <p className="text-slate-600 text-[11px] font-medium tracking-wide">
                            © 2026 AIverse Executive Directory. Built with precision for the modern enterprise.
                        </p>
                    </div>
                </div>
            </footer>
        </div >
    );
};

export default App;