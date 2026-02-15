import React, { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('aiverse-cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('aiverse-cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('aiverse-cookie-consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] animate-in fade-in slide-in-from-bottom-8 duration-700"
            role="status"
            aria-live="polite"
        >
            <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl shadow-indigo-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -mr-16 -mt-16" aria-hidden="true"></div>

                <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-5">
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl" aria-hidden="true">
                            <Shield className="text-indigo-400" size={24} />
                        </div>
                        <div className="flex-grow pt-1">
                            <h3 className="text-white font-bold text-lg mb-1" id="cookie-consent-title">Cookie Preferences</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                We use cookies to enhance your experience, analyze site traffic, and remember your favorites.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-slate-500 hover:text-white transition-colors p-1"
                            aria-label="Close cookie banner"
                        >
                            <X size={20} aria-hidden="true" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleAccept}
                            className="flex-grow py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                            aria-label="Accept all cookies"
                        >
                            Accept All
                        </button>
                        <button
                            onClick={handleDecline}
                            className="flex-grow py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-all border border-slate-700"
                            aria-label="Accept only necessary cookies"
                        >
                            Necessary Only
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <a
                            href="#legal/cookies"
                            className="text-[10px] uppercase tracking-widest font-black text-slate-500 hover:text-indigo-400 transition-colors"
                            aria-label="Read our full cookie policy"
                        >
                            Learn more in our Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
