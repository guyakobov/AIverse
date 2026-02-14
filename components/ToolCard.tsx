import React from 'react';
import { Tool } from '../types';
import { ICON_MAP, CATEGORY_COLORS } from '../constants';
import { ExternalLink, Tag, Heart } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  recommendationReason?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, recommendationReason, isFavorite, onToggleFavorite }) => {
  const IconComponent = ICON_MAP[tool.icon] || ICON_MAP['Cpu'];
  const colors = CATEGORY_COLORS[tool.category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS['All'];

  // Pricing badge color logic
  const pricingColor = {
    'Free': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Freemium': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    'Paid': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  }[tool.pricing];

  return (
    <div className={`relative group flex flex-col h-full bg-slate-800/40 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${recommendationReason ? `border-${colors.text} ring-1 ring-${colors.text}/50` : 'border-slate-700/50 hover:border-slate-500'}`}
      style={{
        boxShadow: isFavorite ? '0 0 20px -5px rgba(236, 72, 153, 0.2)' : 'none'
      }}>

      {recommendationReason && (
        <div className={`bg-${colors.primary}/20 border-b border-${colors.primary}/30 px-4 py-2`}>
          <p className={`text-xs font-semibold text-${colors.text} flex items-center gap-2`}>
            <span className={`w-2 h-2 rounded-full bg-${colors.text} animate-pulse`}></span>
            AI Recommended: {recommendationReason}
          </p>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-5">
          <div className={`p-3.5 bg-slate-700/30 rounded-xl group-hover:bg-${colors.secondary} group-hover:text-${colors.text} transition-all duration-300 border border-transparent group-hover:border-${colors.border}`}>
            <IconComponent size={24} strokeWidth={2.5} />
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${pricingColor}`}>
              {tool.pricing}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite();
              }}
              className="p-2 hover:bg-slate-700/50 rounded-full transition-colors focus:outline-none group/fav"
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                size={20}
                className={`transition-all duration-300 ${isFavorite
                    ? 'fill-pink-500 text-pink-500 scale-125 filter drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]'
                    : 'text-slate-400 group-hover/fav:text-pink-400 group-hover/fav:scale-110'
                  }`}
              />
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
          {tool.name}
        </h3>
        <p className="text-slate-400 text-sm mb-5 line-clamp-2 flex-1 leading-relaxed">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] font-medium text-slate-500 bg-slate-900/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-slate-800/50 hover:border-slate-700 transition-colors">
              <Tag size={10} className="opacity-70" /> {tag}
            </span>
          ))}
        </div>

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto w-full inline-flex justify-center items-center gap-2 py-3 px-4 bg-slate-700/50 hover:bg-${colors.primary} text-slate-200 hover:text-white rounded-xl transition-all duration-300 text-sm font-semibold shadow-inner group-hover:shadow-lg group-hover:shadow-${colors.primary}/20`}
        >
          Explore {tool.name} <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};