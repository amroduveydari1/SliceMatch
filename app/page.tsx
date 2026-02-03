'use client';

import { useState } from 'react';
import Wizard from '@/components/Wizard';
import { useLanguage } from '@/lib/LanguageContext';
import { translations, Language } from '@/lib/translations';

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [resetKey, setResetKey] = useState(0);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'tr', label: 'TR' },
    { code: 'ar', label: 'ع' },
  ];

  const handleLogoClick = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <button
            onClick={handleLogoClick}
            className="group flex flex-col items-start focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
          >
            <img 
              src="/logo.svg" 
              alt="SliceMatch Logo" 
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto mb-2 group-hover:opacity-60 transition-opacity"
            />
            <p className="text-xs sm:text-sm text-black/60 tracking-wide font-light group-hover:text-black/80 transition-colors">
              {t.subtitle}
            </p>
          </button>
          
          {/* Language Switcher */}
          <div className="flex gap-1.5 sm:gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-light tracking-wide transition-colors ${
                  language === lang.code
                    ? 'bg-black text-white'
                    : 'border border-black text-black hover:bg-black hover:text-white'
                } focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <Wizard key={resetKey} />
      </div>
    </main>
  );
}
