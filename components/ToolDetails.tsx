import React from 'react';
import { Tool } from '../types';
import { ICON_MAP, CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';
import {
    ArrowLeft,
    ExternalLink,
    Tag,
    Heart,
    Instagram,
    Twitter,
    Mic2,
    FileText,
    Globe,
    Share2,
    Calendar
} from 'lucide-react';

interface ToolDetailsProps {
    tool: Tool;
    onBack: () => void;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}

export const ToolDetails: React.FC<ToolDetailsProps> = ({ tool, onBack, isFavorite, onToggleFavorite }) => {
    const IconComponent = ICON_MAP[tool.icon] || ICON_MAP['Cpu'];
    const CategoryIcon = CATEGORY_ICONS[tool.category] || ICON_MAP['Layout'];
    const colors = CATEGORY_COLORS[tool.category] || CATEGORY_COLORS['All'];

    const pricingColor = {
        'Free': 'bg-green-500/10 text-green-400 border-green-500/20',
        'Freemium': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
        'Paid': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    }[tool.pricing];

    return (
        <div className="max-w-5xl mx-auto w-full animate-fade-in pb-20">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 sm:mb-8 transition-colors group px-4 sm:px-0"
            >
                <div className="p-1.5 sm:p-2 bg-slate-900 rounded-lg group-hover:bg-slate-800 border border-slate-800">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs">Back to Directory</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-0">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header Card */}
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-${colors.primary}/10 blur-[100px] -mr-32 -mt-32`}></div>

                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <div className={`p-4 sm:p-5 bg-${colors.secondary} border border-${colors.border} rounded-2xl shadow-lg`}>
                                        <IconComponent size={36} className={`sm:w-12 sm:h-12 text-${colors.text}`} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl sm:text-5xl font-black text-white mb-2 tracking-tight">{tool.name}</h1>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-${colors.primary}/20 text-${colors.text} border border-${colors.border}`}>
                                                <CategoryIcon size={12} /> {tool.category}
                                            </span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border ${pricingColor}`}>
                                                {tool.pricing}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={onToggleFavorite}
                                        className={`p-3.5 sm:p-4 rounded-2xl transition-all duration-300 border ${isFavorite ? 'bg-pink-500/10 border-pink-500/30 text-pink-500 shadow-lg shadow-pink-500/5' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-pink-400 hover:border-pink-500/30'}`}
                                    >
                                        <Heart size={20} className={isFavorite ? 'fill-pink-500' : 'sm:w-6 sm:h-6'} />
                                    </button>
                                    <button className="p-3.5 sm:p-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-slate-400 hover:text-white transition-all">
                                        <Share2 size={20} className="sm:w-6 sm:h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">About the Tool</h3>
                                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-medium">
                                        {tool.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Tags & Capabilities</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tool.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/60 border border-slate-800 rounded-xl text-xs sm:text-sm font-bold text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-all cursor-default">
                                                <Tag size={12} className="opacity-50" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-slate-800/50">
                            <a
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full inline-flex justify-center items-center gap-3 py-4 sm:py-5 px-8 bg-${colors.primary} hover:scale-[1.02] active:scale-[0.98] text-white rounded-2xl transition-all text-base sm:text-lg font-black shadow-xl shadow-${colors.primary}/20`}
                            >
                                Visit Official Website <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Key Features */}
                    <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 shadow-xl">
                        <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-${colors.primary}/10 border border-${colors.border}`}>
                                <Calendar size={18} className={`text-${colors.text}`} />
                            </div>
                            Key Features
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "High-performance AI model architecture",
                                "Real-time processing and generation",
                                "Seamless workflow integration"
                            ].map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 group">
                                    <div className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${colors.primary} flex-shrink-0 group-hover:scale-150 transition-transform`}></div>
                                    <span className="text-slate-400 text-sm font-bold leading-tight group-hover:text-slate-200 transition-colors">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Compatibility */}
                    <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-8 shadow-xl">
                        <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-${colors.primary}/10 border border-${colors.border}`}>
                                <Globe size={18} className={`text-${colors.text}`} />
                            </div>
                            Compatibility
                        </h3>
                        <div className="space-y-3">
                            {[
                                "Web Browser Support",
                                "API Access Available",
                                "Mobile Responsive"
                            ].map((item, i) => (
                                <div key={i} className="px-4 py-3 bg-slate-950/50 border border-slate-800/50 rounded-xl text-slate-400 text-xs font-bold leading-none hover:border-slate-700 hover:text-white transition-all">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Tool Talk */}
            <div className="mt-8 px-4 sm:px-0">
                <div className="bg-slate-900/40 border border-slate-800/50 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                Community & Resources
                            </div>
                            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                                Tool <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Talk</span>
                            </h2>
                        </div>
                        <p className="max-w-md text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                            Discover what the community is saying, watch in-depth reviews, and find expert guides across all platforms.
                        </p>
                    </div>

                    {/* Highlights style section for ALL links */}
                    <div className="space-y-12">
                        {tool.links && tool.links.length > 0 ? (
                            <div className="flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-8 sm:gap-y-12 justify-center sm:justify-start">
                                {tool.links.map((link, idx) => {
                                    const platform = link.platform.toLowerCase();

                                    const configs: Record<string, { icon: React.ReactNode, gradient: string, label: string }> = {
                                        instagram: {
                                            icon: <Instagram size={32} className="w-8 h-8 sm:w-8 sm:h-8" />,
                                            gradient: 'from-[#f09433] via-[#e6683c] to-[#bc1888]',
                                            label: `Insider ${idx + 1}`
                                        },
                                        twitter: {
                                            icon: <Twitter size={30} />,
                                            gradient: 'from-blue-400 to-blue-600',
                                            label: 'Thread'
                                        },
                                        youtube: {
                                            icon: <Globe size={30} />,
                                            gradient: 'from-red-500 to-red-700',
                                            label: 'Video'
                                        },
                                        podcast: {
                                            icon: <Mic2 size={30} />,
                                            gradient: 'from-emerald-400 to-teal-600',
                                            label: 'Audio'
                                        },
                                        article: {
                                            icon: <FileText size={30} />,
                                            gradient: 'from-indigo-400 to-purple-600',
                                            label: 'Review'
                                        }
                                    };

                                    const config = configs[platform] || {
                                        icon: <Share2 size={30} />,
                                        gradient: 'from-slate-400 to-slate-600',
                                        label: 'Link'
                                    };

                                    return (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex flex-col items-center gap-2.5 sm:gap-3 w-16 sm:w-20"
                                        >
                                            <div className="relative">
                                                <div className={`absolute -inset-[2px] sm:-inset-[3px] bg-gradient-to-tr ${config.gradient} rounded-full blur-[1px] opacity-70 group-hover:opacity-100 transition-opacity`}></div>
                                                <div className="relative w-14 h-14 sm:w-[70px] sm:h-[70px] bg-slate-950 rounded-full p-[2px] sm:p-[3px] border-2 border-slate-950">
                                                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center group-hover:bg-slate-800 transition-colors overflow-hidden">
                                                        <div className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                                                            {config.icon}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors uppercase tracking-tight text-center truncate w-full">
                                                {platform === 'instagram' ? config.label : (configs[platform]?.label || platform)}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-12 sm:py-16 text-center bg-slate-950/30 rounded-3xl border border-slate-800/50 border-dashed">
                                <Share2 size={32} className="text-slate-700 mx-auto mb-4 opacity-50" />
                                <p className="text-slate-500 font-bold tracking-wide italic">No discussion links curated for this tool yet.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800/30 flex items-center gap-3 sm:gap-4">
                        <div className="p-1.5 sm:p-2 bg-indigo-500/10 rounded-lg">
                            <Globe size={14} className="sm:w-4 sm:h-4 text-indigo-400" />
                        </div>
                        <p className="text-[8px] sm:text-[10px] text-slate-500 font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] leading-tight">
                            <span className="text-slate-400 mr-2">Curation Policy:</span>
                            Links are curated from verified community discussions and expert reviews.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
