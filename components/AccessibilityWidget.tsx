import React, { useState, useEffect } from 'react';
import { Accessibility, X, Plus, Minus, Volume2, Ear, Mic, Moon, Eye, RefreshCw, FileText, MessageSquare } from 'lucide-react';

type AccessibilityState = {
    monochrome: boolean;
    highContrast: boolean;
    textToSpeech: boolean;
    screenReader: boolean;
    voiceCommands: boolean;
    textSize: number; // 0 is default, >0 is larger
};

const initialState: AccessibilityState = {
    monochrome: false,
    highContrast: false,
    textToSpeech: false,
    screenReader: false,
    voiceCommands: false,
    textSize: 0,
};

export const AccessibilityWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<AccessibilityState>(() => {
        try {
            const saved = localStorage.getItem('aiverse-accessibility');
            return saved ? JSON.parse(saved) : initialState;
        } catch {
            return initialState;
        }
    });

    useEffect(() => {
        localStorage.setItem('aiverse-accessibility', JSON.stringify(state));

        // Apply monochrome
        if (state.monochrome) {
            document.documentElement.classList.add('accessibility-monochrome');
        } else {
            document.documentElement.classList.remove('accessibility-monochrome');
        }

        // Apply high contrast
        if (state.highContrast) {
            document.documentElement.classList.add('accessibility-high-contrast');
        } else {
            document.documentElement.classList.remove('accessibility-high-contrast');
        }

        // Apply text size
        document.documentElement.style.setProperty('--a11y-zoom', `${1 + (state.textSize * 0.1)}`);
        if (state.textSize > 0) {
            document.documentElement.classList.add('accessibility-text-zoom');
        } else {
            document.documentElement.classList.remove('accessibility-text-zoom');
        }

    }, [state]);

    const toggle = (key: keyof typeof state) => {
        if (typeof state[key] === 'boolean') {
            setState(prev => ({ ...prev, [key]: !prev[key] }));
        }
    };

    const changeTextSize = (delta: number) => {
        setState(prev => {
            const newSize = Math.max(0, Math.min(prev.textSize + delta, 5));
            return { ...prev, textSize: newSize };
        });
    };

    const reset = () => {
        setState(initialState);
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-1/2 left-0 -translate-y-1/2 z-[9999] bg-black text-white p-3 rounded-r-xl shadow-2xl transition-transform border border-l-0 border-white/20 ${isOpen ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
                aria-label="Toggle Accessibility Menu"
                aria-expanded={isOpen}
            >
                <div className="bg-white rounded-full p-2 mb-1">
                    <Accessibility size={24} className="text-black" />
                </div>
                <div className="text-[10px] font-bold tracking-widest uppercase writing-vertical-rl relative mx-auto left-1">נגישות</div>
            </button>

            {/* Widget Modal */}
            {isOpen && (
                <div dir="rtl" className="fixed top-0 left-0 h-full w-full sm:w-[380px] bg-white text-black z-[10000] shadow-2xl flex flex-col font-sans overflow-hidden animate-fade-in border-r border-slate-200">

                    {/* Header */}
                    <div className="bg-black text-white p-4 flex justify-between items-center shrink-0">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Close Accessibility Menu"
                        >
                            <X size={24} />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="text-white text-xs font-bold border border-white/30 px-2 py-0.5 rounded flex items-center gap-1">
                                <img src="https://flagcdn.com/w20/il.png" alt="Hebrew" className="w-4 h-3 object-cover" /> עברית
                            </div>
                            <div className="p-1 hover:bg-white/20 rounded-full cursor-pointer transition-colors" title="Hide Button (Not Implemented Here)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Title Banner */}
                    <div className="bg-black px-4 pb-6 relative shrink-0">
                        <div className="bg-black border border-white/20 text-white font-bold text-center py-2.5 rounded-xl text-lg relative z-10 mx-4">
                            נגישות
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-white rounded-t-[2.5rem] z-0 block"></div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">

                        {/* Profiles */}
                        <div className="mb-6">
                            <h3 className="font-bold text-lg mb-4 flex justify-between items-center text-right">
                                פרופילי נגישות
                                <div className="flex flex-col gap-1">
                                    <button onClick={() => changeTextSize(1)} className="bg-black text-white rounded p-1" aria-label="Increase text size"><Plus size={16} /></button>
                                    <button onClick={() => changeTextSize(-1)} className="bg-black text-white rounded p-1" aria-label="Decrease text size"><Minus size={16} /></button>
                                </div>
                            </h3>
                        </div>

                        {/* Navigation Adjustments */}
                        <div className="mb-8">
                            <h3 className="font-bold text-lg mb-4 flex items-center justify-between text-right">
                                התאמות ניווט
                                <div className="bg-black text-white rounded p-1" aria-hidden="true"><Minus size={16} /></div>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <AccessButton
                                    active={state.textToSpeech}
                                    onClick={() => toggle('textToSpeech')}
                                    icon={<Volume2 size={32} strokeWidth={1.5} />}
                                    label="הקראת טקסט"
                                />
                                <AccessButton
                                    active={state.screenReader}
                                    onClick={() => toggle('screenReader')}
                                    icon={<Ear size={32} strokeWidth={1.5} />}
                                    label="התאמה לקורא-מסך"
                                />
                                <AccessButton
                                    active={state.voiceCommands}
                                    onClick={() => toggle('voiceCommands')}
                                    icon={<Mic size={32} strokeWidth={1.5} />}
                                    label="פקודות קוליות"
                                />
                            </div>
                        </div>

                        {/* Contrast Adjustments */}
                        <div className="mb-8">
                            <h3 className="font-bold text-lg mb-4 flex items-center justify-between text-right">
                                התאמות ניגודיות
                                <div className="bg-black text-white rounded p-1" aria-hidden="true"><Minus size={16} /></div>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <AccessButton
                                    active={state.highContrast}
                                    onClick={() => toggle('highContrast')}
                                    icon={<Moon size={32} strokeWidth={1.5} className="fill-current" />}
                                    label="ניגודיות כהה"
                                />
                                <AccessButton
                                    active={state.monochrome}
                                    onClick={() => toggle('monochrome')}
                                    icon={<Eye size={32} strokeWidth={1.5} />}
                                    label="מונוכרום"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="bg-black text-white p-4 shrink-0">
                        <div className="flex justify-center gap-6 mb-6 text-sm">
                            <button onClick={reset} className="hover:text-indigo-400 transition-colors">בטל נגישות</button>
                            <a href="#legal/accessibility" onClick={() => setIsOpen(false)} className="hover:text-indigo-400 transition-colors">הצהרת נגישות</a>
                            <button className="hover:text-indigo-400 transition-colors">שלח משוב</button>
                        </div>
                        <div className="text-center text-xs text-white/50 border-t border-white/20 pt-4">
                            Powered by תוסף נגישות
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const AccessButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${active ? 'border-black bg-black text-white' : 'border-slate-200 bg-white text-black hover:border-black/50'}
            `}
            aria-pressed={active}
        >
            <div className={`mb-3 ${active ? 'text-white' : 'text-black'}`}>
                {icon}
            </div>
            <span className="font-bold text-[15px]">{label}</span>
        </button>
    );
};
