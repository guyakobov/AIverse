import React from 'react';
import { Tool } from '../types';
import { ICON_MAP } from '../constants';
import { ExternalLink, Tag, Heart } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  recommendationReason?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, recommendationReason, isFavorite, onToggleFavorite }) => {
  const IconComponent = ICON_MAP[tool.icon] || ICON_MAP['Cpu'];
  
  // Pricing badge color logic
  const pricingColor = {
    'Free': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Freemium': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Paid': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  }[tool.pricing];

  return (
    <div className={`relative group flex flex-col h-full bg-slate-800/50 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 ${recommendationReason ? 'border-indigo-500 ring-1 ring-indigo-500/50' : 'border-slate-700 hover:border-slate-600'}`}>
      
      {recommendationReason && (
        <div className="bg-indigo-600/20 border-b border-indigo-500/30 px-4 py-2">
            <p className="text-xs font-semibold text-indigo-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                AI Reason: {recommendationReason}
            </p>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-slate-700/50 rounded-lg group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
            <IconComponent size={24} />
          </div>
          
          <div className="flex items-center gap-3">
             <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${pricingColor}`}>
               {tool.pricing}
             </span>
             <button 
               onClick={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 onToggleFavorite();
               }}
               className="p-1.5 hover:bg-slate-700 rounded-full transition-colors focus:outline-none group/fav"
               title={isFavorite ? "Remove from favorites" : "Add to favorites"}
             >
               <Heart 
                 size={20} 
                 className={`transition-all duration-300 ${
                    isFavorite 
                      ? 'fill-pink-500 text-pink-500 scale-110' 
                      : 'text-slate-500 group-hover/fav:text-pink-400'
                 }`} 
               />
             </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">{tool.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded flex items-center gap-1">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-auto w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 bg-slate-700 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-lg transition-colors text-sm font-medium"
        >
          Visit Tool <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};