'use client';

import { Recommendation } from '@/lib/types';
import { useLanguage } from '../lib/LanguageContext';
import { getItemTranslation, getReasonTranslation, translations } from '../lib/translations';

interface ResultProps {
  recommendation: Recommendation;
  onTryAgain: () => void;
  onSwitchMode: () => void;
}

export default function Result({ recommendation, onTryAgain, onSwitchMode }: ResultProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const isRtl = language === 'ar';
  
  const primaryItem = getItemTranslation(recommendation.primary.id, language);
  const translatedReason = getReasonTranslation(recommendation.reason, language);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-3xl">
        {/* Primary Recommendation */}
        <div className="mb-8 sm:mb-12 pb-8 sm:pb-12 border-b border-black">
          <div className={`mb-2 text-xs sm:text-sm tracking-widest uppercase text-black/60 ${isRtl ? 'text-right' : ''}`}>
            {t.result.recommended}
          </div>
          <a
            href={recommendation.primary.searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block"
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-3 sm:mb-4 tracking-tight hover:opacity-60 transition-opacity ${isRtl ? 'text-right' : ''}`}>
              {primaryItem.name}
              <span className={`text-base sm:text-lg text-black/40 group-hover:text-black/70 transition-colors ${isRtl ? 'mr-2' : 'ml-2'}`}>
                ↗
              </span>
            </h2>
          </a>
          <p className={`text-base sm:text-lg md:text-xl text-black/70 mb-4 sm:mb-6 font-light ${isRtl ? 'text-right' : ''}`}>
            {primaryItem.desc}
          </p>
          <p className={`text-sm sm:text-base tracking-wide text-black/60 ${isRtl ? 'text-right' : ''}`}>
            {translatedReason}
          </p>
        </div>

        {/* Alternatives */}
        <div className="mb-8 sm:mb-12">
          <div className={`mb-4 sm:mb-6 text-xs sm:text-sm tracking-widest uppercase text-black/60 ${isRtl ? 'text-right' : ''}`}>
            {t.result.alternatives}
          </div>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {recommendation.alternatives.map((item) => {
              const altItem = getItemTranslation(item.id, language);
              return (
                <div key={item.id} className={`border-black pl-4 sm:pl-6 ${isRtl ? 'border-r-2 pr-4 sm:pr-6 pl-0' : 'border-l-2'}`}>
                  <a
                    href={item.searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-block"
                  >
                    <h3 className={`text-lg sm:text-xl md:text-2xl font-light mb-2 tracking-tight hover:opacity-60 transition-opacity ${isRtl ? 'text-right' : ''}`}>
                      {altItem.name}
                      <span className={`text-sm text-black/40 group-hover:text-black/70 transition-colors ${isRtl ? 'mr-1' : 'ml-1'}`}>
                        ↗
                      </span>
                    </h3>
                  </a>
                  <p className={`text-sm sm:text-base text-black/70 font-light ${isRtl ? 'text-right' : ''}`}>
                    {altItem.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onTryAgain}
            className="flex-1 px-6 py-4 sm:px-8 sm:py-5 bg-black text-white hover:bg-black/80 active:scale-[0.98] transition-all duration-200 text-sm sm:text-base font-light tracking-wide focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {t.result.tryAgain}
          </button>
          <button
            onClick={onSwitchMode}
            className="flex-1 px-6 py-4 sm:px-8 sm:py-5 border border-black bg-white text-black hover:bg-black hover:text-white active:scale-[0.98] transition-all duration-200 text-sm sm:text-base font-light tracking-wide focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            {t.result.switchTo} {recommendation.primary.mode === 'pizza' ? t.options.cafe : t.options.pizza}
          </button>
        </div>
      </div>
    </div>
  );
}
