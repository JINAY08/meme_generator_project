import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Actually we don't have uuid package, let's use a simple random string
import Controls from './components/Controls';
import MemeDisplay from './components/MemeDisplay';
import History from './components/History';
import { MemeRequest, GeneratedMeme, GenerationState, MemeStyle } from './types';
import { DEFAULT_TEMPERATURE } from './constants';
import { generateMemeImage } from './services/gemini';
import { Zap } from 'lucide-react';

const App: React.FC = () => {
  const [request, setRequest] = useState<MemeRequest>({
    topic: '',
    style: MemeStyle.MODERN,
    temperature: DEFAULT_TEMPERATURE,
    customCaption: ''
  });

  const [currentMeme, setCurrentMeme] = useState<GeneratedMeme | null>(null);
  
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    error: null,
  });

  const [history, setHistory] = useState<GeneratedMeme[]>([]);

  // Simple ID generator since we can't import external uuid easily
  const generateId = () => Math.random().toString(36).substring(2, 15);

  const handleGenerate = async () => {
    setState({ isLoading: true, error: null });
    
    try {
      const imageUrl = await generateMemeImage(request);
      
      const newMeme: GeneratedMeme = {
        id: generateId(),
        imageUrl,
        timestamp: Date.now(),
        request: { ...request } // copy request
      };

      setCurrentMeme(newMeme);
      setHistory(prev => [newMeme, ...prev].slice(0, 20)); // Keep last 20
      setState({ isLoading: false, error: null });

    } catch (err: any) {
      setState({ 
        isLoading: false, 
        error: err.message || "Something went wrong while generating the meme." 
      });
    }
  };

  const handleSelectHistory = (meme: GeneratedMeme) => {
    setCurrentMeme(meme);
    setRequest(meme.request);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] text-slate-200 pb-20">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-400 p-1.5 rounded-lg rotate-3">
                 <span className="text-xl">🍌</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white italic">
                Nano<span className="text-yellow-400">Meme</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
               <span className="flex items-center gap-1">
                 <Zap size={12} className="text-yellow-400" />
                 Powered by Gemini Nano Banana
               </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white mb-2">Create Viral Memes</h2>
              <p className="text-slate-400">
                Enter a topic, choose a style, and let the <strong>Nano Banana</strong> model generate a captioned masterpiece for you.
              </p>
            </div>
            
            <Controls 
              request={request} 
              onChange={setRequest} 
              onGenerate={handleGenerate} 
              isLoading={state.isLoading} 
            />
            
            <div className="bg-slate-800/30 rounded-lg p-4 text-xs text-slate-500 border border-slate-800">
              <p className="font-semibold text-slate-400 mb-1">💡 Pro Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Try "Deep Fried" style for chaotic humor.</li>
                <li>Higher temperature (1.2+) creates weirder images.</li>
                <li>The AI will write the caption automatically if you leave it blank.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Display */}
          <div className="lg:col-span-7">
            <MemeDisplay 
              meme={currentMeme} 
              isLoading={state.isLoading} 
              error={state.error} 
            />
          </div>
        </div>

        {/* History Section */}
        <History 
          memes={history} 
          onSelect={handleSelectHistory} 
          onClear={handleClearHistory}
        />
      </main>
    </div>
  );
};

export default App;