import React from 'react';
import { Download, Share2, Sparkles } from 'lucide-react';
import { GeneratedMeme } from '../types';

interface MemeDisplayProps {
  meme: GeneratedMeme | null;
  isLoading: boolean;
  error: string | null;
}

const MemeDisplay: React.FC<MemeDisplayProps> = ({ meme, isLoading, error }) => {
  const handleDownload = () => {
    if (meme) {
      const link = document.createElement('a');
      link.href = meme.imageUrl;
      link.download = `nanomeme-${meme.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (error) {
    return (
      <div className="w-full aspect-square bg-slate-800/50 backdrop-blur rounded-2xl border border-red-500/30 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-4xl mb-4">💀</div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Generation Failed</h3>
          <p className="text-slate-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full aspect-square bg-slate-800/30 rounded-2xl border border-slate-700 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 to-purple-500/10 animate-pulse"></div>
        <div className="z-10 text-center">
            <Sparkles className="w-12 h-12 text-yellow-400 animate-bounce mx-auto mb-4" />
            <p className="text-slate-300 font-medium">AI is crafting your masterpiece...</p>
            <p className="text-slate-500 text-sm mt-2">Connecting to Nano Banana Model</p>
        </div>
      </div>
    );
  }

  if (!meme) {
    return (
      <div className="w-full aspect-square bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
           <span className="text-3xl">🍌</span>
        </div>
        <p className="font-medium">Ready to Generate</p>
        <p className="text-sm mt-1">Enter a topic to get started</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 animate-in fade-in zoom-in duration-500">
      <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
        <img 
          src={meme.imageUrl} 
          alt="Generated Meme" 
          className="w-full h-auto object-contain bg-black"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
           <button 
             onClick={handleDownload}
             className="bg-white text-slate-900 p-3 rounded-full hover:bg-yellow-400 transition transform hover:scale-110"
             title="Download"
           >
             <Download size={24} />
           </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-slate-400 px-2">
         <span>Generated with Gemini Nano Banana</span>
         <span className="bg-slate-800 px-2 py-1 rounded text-xs border border-slate-700">{meme.request.style}</span>
      </div>
    </div>
  );
};

export default MemeDisplay;