import React from 'react';
import { MemeStyle, MemeRequest } from '../types';
import { MEME_STYLES } from '../constants';
import { Settings2, Type, Hash, Wand2 } from 'lucide-react';

interface ControlsProps {
  request: MemeRequest;
  onChange: (newRequest: MemeRequest) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({ request, onChange, onGenerate, isLoading }) => {
  
  const handleChange = (field: keyof MemeRequest, value: any) => {
    onChange({ ...request, [field]: value });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-xl flex flex-col gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
            <Hash size={16} className="text-yellow-400" />
            Topic
          </label>
          <input
            type="text"
            value={request.topic}
            onChange={(e) => handleChange('topic', e.target.value)}
            placeholder="e.g., Pizza, coding bugs, cats, Monday morning"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition outline-none"
          />
        </div>

        <div>
          <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
            <Type size={16} className="text-yellow-400" />
            Custom Caption <span className="text-slate-500 font-normal text-xs">(Optional - AI will write one if empty)</span>
          </label>
          <input
            type="text"
            value={request.customCaption || ''}
            onChange={(e) => handleChange('customCaption', e.target.value)}
            placeholder="e.g., When the code works on the first try..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
              <Wand2 size={16} className="text-yellow-400" />
              Style
            </label>
            <div className="relative">
              <select
                value={request.style}
                onChange={(e) => handleChange('style', e.target.value as MemeStyle)}
                className="w-full appearance-none bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition outline-none"
              >
                {MEME_STYLES.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
              <Settings2 size={16} className="text-yellow-400" />
              Creativity (Temp): {request.temperature}
            </label>
            <input
              type="range"
              min="0.0"
              max="2.0"
              step="0.1"
              value={request.temperature}
              onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Predictable</span>
              <span>Chaotic</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !request.topic.trim()}
        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
          isLoading || !request.topic.trim()
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 hover:shadow-yellow-400/20'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cooking up meme...
          </span>
        ) : (
          'Generate Meme'
        )}
      </button>
    </div>
  );
};

export default Controls;