import React from 'react';
import { GeneratedMeme } from '../types';
import { Clock, Trash2 } from 'lucide-react';

interface HistoryProps {
  memes: GeneratedMeme[];
  onSelect: (meme: GeneratedMeme) => void;
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ memes, onSelect, onClear }) => {
  if (memes.length === 0) return null;

  return (
    <div className="mt-12 border-t border-slate-800 pt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock size={20} className="text-slate-400" />
          Recent Memes
        </h2>
        <button 
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 hover:bg-red-400/10 px-2 py-1 rounded transition"
        >
          <Trash2 size={12} /> Clear History
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {memes.map((meme) => (
          <div 
            key={meme.id}
            onClick={() => onSelect(meme)}
            className="group cursor-pointer relative aspect-square rounded-xl overflow-hidden border border-slate-700 hover:border-yellow-400 transition-colors"
          >
            <img 
              src={meme.imageUrl} 
              alt={meme.request.topic} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <p className="text-white text-xs truncate w-full font-medium">{meme.request.topic}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;