
import React, { useState, useEffect } from 'react';
import { RULES } from '../constants';
import { speak, generateMouthDiagram } from '../services/geminiService';
import { EndingType, Rule } from '../types';

const RuleCard: React.FC<{ rule: Rule }> = ({ rule }) => {
  const [diagramUrl, setDiagramUrl] = useState<string | null>(null);
  const [isLoadingDiagram, setIsLoadingDiagram] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);

  // Check for cached version on mount (handled inside geminiService, but we need to trigger it)
  const handleShowDiagram = async () => {
    if (showDiagram) {
      setShowDiagram(false);
      return;
    }

    setIsLoadingDiagram(true);
    try {
      const url = await generateMouthDiagram(rule.sound);
      setDiagramUrl(url);
      setShowDiagram(true);
    } catch (err) {
      console.error("Failed to load diagram", err);
    } finally {
      setIsLoadingDiagram(false);
    }
  };

  const isVoiced = rule.sound.includes('z') || rule.sound.includes('d') || rule.sound.includes('ɪ');

  return (
    <div className="bg-white rounded-[40px] border-2 border-gray-100 p-6 md:p-8 shadow-sm hover:border-blue-200 transition-all overflow-hidden relative group">
      <div className="flex items-start justify-between mb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className={`${rule.color} text-white text-2xl font-black px-6 py-2 rounded-2xl inline-block shadow-md transform -rotate-2 group-hover:rotate-0 transition-transform`}>
              {rule.sound}
            </span>
          </div>
          <p className="text-gray-700 font-bold leading-tight text-xl max-w-[80%]">
            {rule.description}
          </p>
        </div>
        <button 
          onClick={() => speak(`The sound is ${rule.sound}`)}
          className="w-16 h-16 rounded-[24px] bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95 flex-shrink-0"
        >
          <i className="fas fa-volume-up text-2xl"></i>
        </button>
      </div>

      <div className="bg-blue-50/50 rounded-3xl p-6 mb-8 border border-blue-100">
        <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Practice these words</p>
        <div className="flex flex-wrap gap-3">
          {rule.examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => speak(ex)}
              className="bg-white px-5 py-3 rounded-2xl border-2 border-transparent hover:border-blue-400 text-gray-800 font-black text-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-1 active:translate-y-0"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handleShowDiagram}
          disabled={isLoadingDiagram}
          className={`w-full py-5 px-8 rounded-3xl font-black text-lg flex items-center justify-center gap-4 transition-all border-4 shadow-sm ${
            showDiagram 
              ? 'bg-blue-600 text-white border-blue-700' 
              : 'bg-white border-blue-100 text-blue-600 hover:bg-blue-50 active:scale-[0.98]'
          }`}
        >
          {isLoadingDiagram ? (
            <>
              <div className="w-6 h-6 border-4 border-blue-200 border-t-white rounded-full animate-spin"></div>
              <span>Drawing Mouth Guide...</span>
            </>
          ) : (
            <>
              <i className={`fas ${showDiagram ? 'fa-eye-slash' : 'fa-face-laugh-beam'}`}></i>
              <span>{showDiagram ? 'Hide Mouth Guide' : 'Show Mouth Guide'}</span>
            </>
          )}
        </button>

        {showDiagram && diagramUrl && (
          <div className="relative overflow-hidden rounded-[40px] border-4 border-blue-100 shadow-xl bg-white animate-popIn">
            <div className={`p-8 bg-white transition-all duration-500 ${isVoiced ? 'animate-vibrate' : 'animate-float'}`}>
              <img 
                src={diagramUrl} 
                alt={`Articulation diagram for ${rule.sound}`} 
                className="w-full aspect-square object-contain drop-shadow-lg"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-blue-100 transform transition-transform group-hover:translate-y-[-4px]">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isVoiced ? 'bg-green-500 animate-pulse' : 'bg-blue-400'}`}></div>
                <p className="text-xs font-black text-blue-900 uppercase tracking-widest">
                  Mouth Position for <span className="text-blue-600">{rule.sound}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center gap-5 bg-yellow-50 p-6 rounded-[32px] border-2 border-yellow-100 shadow-sm overflow-hidden relative">
         <div className="absolute -right-4 -top-4 text-yellow-100 opacity-50 transform rotate-12 pointer-events-none">
            <i className="fas fa-lightbulb text-6xl"></i>
         </div>
         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl border-2 border-yellow-200 shadow-inner flex-shrink-0 animate-bounce-slow">
            👅
         </div>
         <div className="relative z-10">
            <h4 className="font-black text-yellow-900 text-lg mb-1">Teacher's Secret!</h4>
            <p className="text-base text-yellow-800 font-bold leading-tight">
              Say {rule.sound} and touch your throat. <br/>
              <span className="text-yellow-600">
                {isVoiced 
                  ? "It's a VOICED sound. Feel it vibrate like a bee! 🐝" 
                  : "It's a VOICELESS sound. Quiet as a whisper... 🤫"}
              </span>
            </p>
         </div>
      </div>
    </div>
  );
};

const RuleSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<EndingType>('s-es');

  const filteredRules = RULES.filter(rule => rule.type === activeCategory);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex bg-white/90 backdrop-blur-xl p-2 rounded-[24px] w-full sticky top-[72px] z-20 shadow-lg border border-gray-100">
        <button
          onClick={() => setActiveCategory('s-es')}
          className={`flex-1 py-4 px-6 rounded-2xl font-black transition-all text-sm md:text-lg ${
            activeCategory === 's-es' ? 'bg-blue-600 text-white shadow-lg translate-y-[-2px]' : 'text-gray-400 hover:text-blue-500'
          }`}
        >
          <i className="fas fa-comment-dots mr-2"></i>
          -s / -es
        </button>
        <button
          onClick={() => setActiveCategory('ed')}
          className={`flex-1 py-4 px-6 rounded-2xl font-black transition-all text-sm md:text-lg ${
            activeCategory === 'ed' ? 'bg-blue-600 text-white shadow-lg translate-y-[-2px]' : 'text-gray-400 hover:text-blue-500'
          }`}
        >
          <i className="fas fa-history mr-2"></i>
          -ed
        </button>
      </div>

      <div className="grid gap-10">
        {filteredRules.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>
      
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes vibrate {
          0%, 100% { transform: translate(0,0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(1px, -1px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-popIn {
          animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-vibrate {
          animation: vibrate 0.15s linear infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default RuleSection;
