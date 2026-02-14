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
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group px-4 sm:px-0"
            >
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-slate-800 border border-slate-800">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-bold uppercase tracking-widest text-xs">Back to Directory</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 sm:px-0">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header Card */}
                    <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-${colors.primary}/10 blur-[100px] -mr-32 -mt-32`}></div>

                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                                <div className="flex items-center gap-6">
                                    <div className={`p-5 bg-${colors.secondary} border border-${colors.border} rounded-2xl shadow-lg`}>
                                        <IconComponent size={48} className={`text-${colors.text}`} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">{tool.name}</h1>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-${colors.primary}/20 text-${colors.text} border border-${colors.border}`}>
                                                <CategoryIcon size={14} /> {tool.category}
                                            </span>
                                            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg border ${pricingColor}`}>
                                                {tool.pricing}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={onToggleFavorite}
                                        className={`p-4 rounded-2xl transition-all duration-300 border ${isFavorite ? 'bg-pink-500/10 border-pink-500/30 text-pink-500 shadow-lg shadow-pink-500/5' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-pink-400 hover:border-pink-500/30'}`}
                                    >
                                        <Heart size={24} className={isFavorite ? 'fill-pink-500' : ''} />
                                    </button>
                                    <button className="p-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-slate-400 hover:text-white transition-all">
                                        <Share2 size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">About the Tool</h3>
                                    <p className="text-xl text-slate-300 leading-relaxed font-medium">
                                        {tool.description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Tags & Capabilities</h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        {tool.tags.map(tag => (
                                            <span key={tag} className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-sm font-bold text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-all cursor-default">
                                                <Tag size={14} className="opacity-50" /> {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-10 border-t border-slate-800/50 flex flex-col sm:flex-row gap-4">
                                <a
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 inline-flex justify-center items-center gap-3 py-5 px-8 bg-${colors.primary} hover:scale-[1.02] active:scale-[0.98] text-white rounded-2xl transition-all text-lg font-black shadow-xl shadow-${colors.primary}/20`}
                                >
                                    Visit Official Website <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Features / Content (Placeholder for more data) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Calendar size={18} className="text-indigo-400" /> Key Features
                            </h3>
                            <ul className="space-y-3 text-slate-400 text-sm font-medium">
                                <li className="flex items-start gap-2">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                    High-performance AI model architecture
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                    Real-time processing and generation
                                </li>
                                <li className="flex items-start gap-2">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                    Seamless workflow integration
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-6">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Globe size={18} className="text-indigo-400" /> Compatibility
                            </h3>
                            <ul className="space-y-3 text-slate-400 text-sm font-medium">
                                <li className="flex items-start gap-2 text-indigo-200/60 bg-indigo-500/5 px-2 py-1 rounded">Web Browser Support</li>
                                <li className="flex items-start gap-2 text-indigo-200/60 bg-indigo-500/5 px-2 py-1 rounded">API Access Available</li>
                                <li className="flex items-start gap-2 text-indigo-200/60 bg-indigo-500/5 px-2 py-1 rounded">Mobile Responsive</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    {/* Resources & Socials */}
                    <div className="bg-slate-900/60 border border-slate-800/50 rounded-3xl p-8 sticky top-28 shadow-xl">
                        <h2 className="text-xl font-black text-white mb-8 border-b border-slate-800 pb-4 tracking-tight uppercase">External Resources</h2>

                        <div className="space-y-4">
                            {tool.links && tool.links.length > 0 ? (
                                tool.links.map((link, idx) => {
                                    const platformConfig: Record<string, { label: string, icon: React.ReactNode, color: string, border: string, bg: string }> = {
                                        instagram: {
                                            label: 'Instagram',
                                            icon: <Instagram size={20} className="text-white" />,
                                            color: 'from-purple-500 to-pink-500',
                                            border: 'border-pink-500/20',
                                            bg: 'bg-gradient-to-r from-purple-600/10 to-pink-600/10'
                                        },
                                        twitter: {
                                            label: 'X / Twitter',
                                            icon: <Twitter size={20} className="text-white" />,
                                            color: 'bg-blue-500',
                                            border: 'border-blue-500/20',
                                            bg: 'bg-blue-600/10'
                                        },
                                        podcast: {
                                            label: 'Podcast',
                                            icon: <Mic2 size={20} className="text-white" />,
                                            color: 'bg-emerald-500',
                                            border: 'border-emerald-500/20',
                                            bg: 'bg-emerald-600/10'
                                        },
                                        article: {
                                            label: 'Article/Review',
                                            icon: <FileText size={20} className="text-white" />,
                                            color: 'bg-indigo-500',
                                            border: 'border-indigo-500/20',
                                            bg: 'bg-indigo-600/10'
                                        },
                                        youtube: {
                                            label: 'YouTube',
                                            icon: <Globe size={20} className="text-white" />,
                                            color: 'bg-red-500',
                                            border: 'border-red-500/20',
                                            bg: 'bg-red-600/10'
                                        }
                                    };

                                    const config = platformConfig[link.platform.toLowerCase()] || {
                                        label: link.platform,
                                        icon: <Share2 size={20} className="text-white" />,
                                        color: 'bg-slate-500',
                                        border: 'border-slate-500/20',
                                        bg: 'bg-slate-600/10'
                                    };

                                    return (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex items-center justify-between p-4 ${config.bg} border ${config.border} rounded-2xl hover:scale-[1.03] transition-all group`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2.5 ${config.color} rounded-xl shadow-lg`}>
                                                    {config.icon}
                                                </div>
                                                <span className="font-bold text-slate-200">{config.label}</span>
                                            </div>
                                            <ExternalLink size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                                        </a>
                                    );
                                })
                            ) : (
                                <div className="text-center py-10 px-4 bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                                    <p className="text-slate-500 text-sm font-medium italic">No external resource links found for this tool.</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-10 p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl">
                            <p className="text-xs text-indigo-300 font-bold leading-relaxed">
                                <span className="text-indigo-400 uppercase tracking-widest block mb-1">Disclaimer</span>
                                AIverse is an independent directory. Links provided are for informational purposes only.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
