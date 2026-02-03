'use client';

import { useLanguage } from '../lib/LanguageContext';

interface QuestionProps {
  question: string;
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}

export default function Question({ question, options, onSelect }: QuestionProps) {
  const { language } = useLanguage();
  const isRtl = language === 'ar';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 sm:px-6 lg:px-8">
      <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-8 sm:mb-12 text-center tracking-tight max-w-3xl ${isRtl ? 'rtl' : ''}`}>
        {question}
      </h2>
      
      <div className="flex flex-col gap-3 w-full max-w-md">
        {options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className="px-6 py-4 sm:px-8 sm:py-5 border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 ease-out text-base sm:text-lg font-light tracking-wide focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 active:scale-95 hover:scale-105 hover:shadow-lg transform animate-slideInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
