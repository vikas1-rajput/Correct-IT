import React from 'react';
import { Copy, RefreshCcw, Check, ArrowRight } from 'lucide-react';
import { ToneType } from '../types';

interface ResultCardProps {
  originalText: string;
  resultText: string;
  tone: ToneType;
  isLoading: boolean;
  onApply: () => void;
  onDiscard: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ 
  originalText, 
  resultText, 
  tone, 
  isLoading,
  onApply,
  onDiscard
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 mt-4 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!resultText) return null;

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-purple-100 dark:border-gray-700 overflow-hidden mt-6 transition-all duration-300 ease-out transform translate-y-0 opacity-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 px-5 py-3 border-b border-indigo-100 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 bg-white dark:bg-gray-900 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-gray-600 shadow-sm">
            {tone}
          </span>
          <span className="text-xs text-indigo-400 dark:text-indigo-300">Suggestion</span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors flex items-center gap-1 text-xs font-medium"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-col gap-4">
          <div className="relative group">
            <div className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed font-medium">
              {resultText}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={onDiscard}
            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onApply}
            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200 dark:shadow-none"
          >
            <Check className="w-4 h-4" />
            Replace
          </button>
        </div>
      </div>
    </div>
  );
};
