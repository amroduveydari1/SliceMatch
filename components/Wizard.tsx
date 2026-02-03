'use client';

import { useState } from 'react';
import { UserChoices, Mode, HungerLevel, Mood, Style, Recommendation } from '@/lib/types';
import { getRecommendation } from '@/lib/recommender';
import { useLanguage } from '../lib/LanguageContext';
import { translations } from '../lib/translations';
import Question from './Question';
import Result from './Result';

type Step = 0 | 1 | 2 | 3 | 4;

export default function Wizard() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [step, setStep] = useState<Step>(0);
  const [choices, setChoices] = useState<UserChoices>({
    mode: null,
    hungerLevel: null,
    mood: null,
    style: null,
    dietaryFilter: [],
  });
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const handleModeSelect = (value: string) => {
    setChoices({ ...choices, mode: value as Mode });
    setStep(1);
  };

  const handleHungerSelect = (value: string) => {
    setChoices({ ...choices, hungerLevel: value as HungerLevel });
    setStep(2);
  };

  const handleMoodSelect = (value: string) => {
    setChoices({ ...choices, mood: value as Mood });
    setStep(3);
  };

  const handleStyleSelect = (value: string) => {
    const updatedChoices = { ...choices, style: value as Style };
    setChoices(updatedChoices);
    
    const result = getRecommendation(updatedChoices);
    setRecommendation(result);
    setStep(4);
  };

  const handleTryAgain = () => {
    setStep(0);
    setChoices({
      mode: null,
      hungerLevel: null,
      mood: null,
      style: null,
      dietaryFilter: [],
    });
    setRecommendation(null);
  };

  const handleSwitchMode = () => {
    const newMode = choices.mode === 'pizza' ? 'cafe' : 'pizza';
    setChoices({
      mode: newMode,
      hungerLevel: null,
      mood: null,
      style: null,
      dietaryFilter: [],
    });
    setRecommendation(null);
    setStep(1);
  };

  return (
    <div className="animate-fadeIn">
      {step === 0 && (
        <Question
          question={t.questions.mode}
          options={[
            { value: 'pizza', label: t.options.pizza },
            { value: 'cafe', label: t.options.cafe },
          ]}
          onSelect={handleModeSelect}
        />
      )}

      {step === 1 && (
        <Question
          question={t.questions.hunger}
          options={[
            { value: 'snack', label: t.options.snack },
            { value: 'normal', label: t.options.normal },
            { value: 'starving', label: t.options.starving },
          ]}
          onSelect={handleHungerSelect}
        />
      )}

      {step === 2 && (
        <Question
          question={t.questions.mood}
          options={[
            { value: 'comfort', label: t.options.comfort },
            { value: 'light', label: t.options.light },
            { value: 'spicy', label: t.options.spicy },
          ]}
          onSelect={handleMoodSelect}
        />
      )}

      {step === 3 && (
        <Question
          question={t.questions.style}
          options={[
            { value: 'classic', label: t.options.classic },
            { value: 'adventurous', label: t.options.adventurous },
          ]}
          onSelect={handleStyleSelect}
        />
      )}

      {step === 4 && recommendation && (
        <Result
          recommendation={recommendation}
          onTryAgain={handleTryAgain}
          onSwitchMode={handleSwitchMode}
        />
      )}
    </div>
  );
}
