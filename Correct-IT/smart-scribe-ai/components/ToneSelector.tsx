import React from 'react';
import { ToneType } from '../types';
import { Sparkles, Briefcase, Coffee, Share2, Heart, Smile, MessageCircle } from 'lucide-react';

interface ToneSelectorProps {
  selectedTone: ToneType;
  onSelectTone: (tone: ToneType) => void;
  disabled?: boolean;
}

const tones = [
  { type: ToneType.GRAMMAR, icon: Sparkles, label: 'Grammar', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/40', border: 'border-purple-300 dark:border-purple-700' },
  { type: ToneType.PROFESSIONAL, icon: Briefcase, label: 'Professional', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/40', border: 'border-blue-300 dark:border-blue-700' },
  { type: ToneType.CASUAL, icon: Coffee, label: 'Casual', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-900/40', border: 'border-orange-300 dark:border-orange-700' },
  { type: ToneType.POLITE, icon: Heart, label: 'Polite', color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-100 dark:bg-pink-900/40', border: 'border-pink-300 dark:border-pink-700' },
  { type: ToneType.SOCIAL, icon: Share2, label: 'Social', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/40', border: 'border-indigo-300 dark:border-indigo-700' },
  { type: ToneType.WITTY, icon: Smile, label: 'Witty', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-100 dark:bg-yellow-900/40', border: 'border-yellow-300 dark:border-yellow-700' },
  { type: ToneType.EMOJIFY, icon: MessageCircle, label: 'Emojify', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-900/40', border: 'border-green-300 dark:border-green-700' },
];

export const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onSelectTone, disabled }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-4 pt-2 hide-scrollbar w-full px-1">
      {tones.map((t) => {
        const Icon = t.icon;
        const isSelected = selectedTone === t.type;
        return (
          <button
            key={t.type}
            onClick={() => onSelectTone(t.type)}
            disabled={disabled}
            className={`
              flex flex-col items-center justify-center min-w-[80px] p-3 rounded-2xl transition-all duration-200 border
              ${isSelected 
                ? `${t.bg} ${t.border} ring-2 ring-opacity-50 ring-offset-1 dark:ring-offset-gray-900` 
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
            `}
          >
            <Icon className={`w-6 h-6 mb-1 ${isSelected ? t.color : 'text-gray-500 dark:text-gray-400'}`} />
            <span className={`text-xs font-medium ${isSelected ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
