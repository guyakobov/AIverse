import React from 'react';
import { ArrowLeft, Scale, ShieldCheck, FileText, Accessibility } from 'lucide-react';
import { LEGAL_CONTENT } from '../constants';

interface LegalPageProps {
    type: 'terms' | 'privacy' | 'disclaimer' | 'accessibility';
    onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
    const data = LEGAL_CONTENT[type];

    const icons = {
        terms: <Scale size={32} className="text-indigo-400" />,
        privacy: <ShieldCheck size={32} className="text-emerald-400" />,
        disclaimer: <FileText size={32} className="text-amber-400" />,
        accessibility: <Accessibility size={32} className="text-fuchsia-400" />
    };

    return (
        <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 animate-fade-in">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
            >
                <div className="p-2 bg-slate-900 rounded-lg group-hover:bg-slate-800 border border-slate-800">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </div>
                <span className="font-bold uppercase tracking-widest text-xs">Back to Directory</span>
            </button>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] -mr-32 -mt-32"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-10">
                        <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-2xl shadow-lg">
                            {icons[type]}
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-5xl font-black text-white mb-2 tracking-tight">{data.title}</h1>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                Last Updated: {data.lastUpdated}
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-slate max-w-none">
                        <div className="text-slate-300 leading-relaxed text-lg space-y-6 whitespace-pre-wrap font-medium">
                            {data.content.split('\n\n').map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <p className="text-sm text-slate-500 font-medium">
                        &copy; 2026 AIverse. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/30 rounded-full border border-slate-700/50">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Verified Legal Document</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
