
import React, { useState } from 'react';
import Layout from './components/Layout';
import RuleSection from './components/RuleSection';
import VerbLibrary from './components/VerbLibrary';
import Games from './components/Games';
import MiniTest from './components/MiniTest';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-12 py-4">
            {/* Sky Blue Sunflower Banner - Expanded for Widescreen */}
            <div className="relative rounded-[60px] overflow-hidden shadow-2xl animate-fadeIn group h-[500px] md:h-[650px]">
              {/* Sky Blue Background with soft clouds effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 z-10">
                <div className="absolute top-[15%] left-[10%] w-64 h-32 bg-white/20 rounded-full blur-3xl animate-float-slow"></div>
                <div className="absolute bottom-[25%] right-[15%] w-96 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-[40%] right-[30%] w-48 h-24 bg-white/15 rounded-full blur-2xl animate-float-slow delay-1000"></div>
              </div>
              
              {/* Sun Flare */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-200/30 rounded-full blur-[150px] translate-x-1/4 -translate-y-1/4 z-20 animate-pulse"></div>

              {/* Banner Content Container */}
              <div className="absolute inset-0 z-30 flex flex-col md:flex-row items-center justify-around p-8 md:p-24">
                {/* Left: Large Sunflower */}
                <div className="relative mb-8 md:mb-0 transform hover:scale-110 transition-transform duration-700">
                  <div className="absolute -inset-16 bg-white/20 backdrop-blur-2xl rounded-full blur-[80px]"></div>
                  <div className="relative w-56 h-56 md:w-96 md:h-96 flex items-center justify-center text-[150px] md:text-[280px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-float">
                    🌻
                  </div>
                  {/* Decorative floaters */}
                  <span className="absolute -top-10 right-10 text-6xl animate-bounce pointer-events-none">🌻</span>
                  <span className="absolute bottom-10 -left-10 text-5xl animate-pulse delay-500 pointer-events-none">🌻</span>
                </div>

                {/* Right: Text & Actions */}
                <div className="flex-1 md:pl-20 text-center md:text-left space-y-8 max-w-2xl">
                  <div className="space-y-3">
                    <p className="text-white/80 font-black uppercase tracking-[0.4em] text-sm md:text-base drop-shadow-sm">Welcome to the Academy</p>
                    <h2 className="text-white font-black italic text-3xl md:text-5xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] font-serif leading-tight">
                      "Be a sunflower! Stand strong!"
                    </h2>
                    <h2 className="text-yellow-100 font-black italic text-4xl md:text-6xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] font-serif">
                      Follow the Sun!
                    </h2>
                  </div>
                  
                  <div className="pt-6 border-l-4 border-yellow-300/50 pl-8">
                    <h3 className="text-6xl md:text-8xl font-black text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] tracking-tighter">
                      Jessica <span className="text-yellow-300">Lee</span>
                    </h3>
                    <p className="text-2xl md:text-3xl text-sky-900/40 font-black mt-4">
                      Smart Sounds Academy
                    </p>
                  </div>

                  <div className="pt-10 flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                    <button 
                      onClick={() => setActiveTab('theory')}
                      className="bg-yellow-400 text-yellow-900 px-12 py-6 rounded-[32px] font-black text-2xl shadow-2xl hover:bg-yellow-300 hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-4 border-b-8 border-yellow-600"
                    >
                      <i className="fas fa-play-circle text-3xl"></i>
                      Let's Learn!
                    </button>
                    <button 
                      onClick={() => setActiveTab('test')}
                      className="bg-white/20 backdrop-blur-xl text-white border-2 border-white/50 px-12 py-6 rounded-[32px] font-black text-2xl hover:bg-white/40 transition-all flex items-center justify-center gap-4 shadow-xl"
                    >
                      <i className="fas fa-award text-3xl text-yellow-200"></i>
                      Take a Quiz
                    </button>
                  </div>
                </div>
              </div>

              {/* Subtle Texture Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cloudy-day.png')] z-15 pointer-events-none"></div>
            </div>

            {/* Quick Actions Grid - Responsive for Widescreen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { tab: 'theory', icon: 'fa-book-open', color: 'bg-sky-500', title: 'Rules', desc: 'Simple S, ES & ED tricks' },
                { tab: 'verbs', icon: 'fa-spell-check', color: 'bg-yellow-500', title: 'Vocabulary', desc: 'Explore 200+ A1 Verbs' },
                { tab: 'practice', icon: 'fa-gamepad', color: 'bg-emerald-500', title: 'Games', desc: 'Fun Odd One Out puzzles' },
                { tab: 'test', icon: 'fa-award', color: 'bg-orange-500', title: 'Tests', desc: 'Earn diamonds & badges' }
              ].map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTab(item.tab)}
                  className="bg-white p-10 rounded-[48px] border-4 border-gray-50 hover:border-sky-300 hover:shadow-2xl transition-all group text-center relative overflow-hidden"
                >
                  <div className="absolute -right-6 -bottom-6 text-gray-100 opacity-20 transform group-hover:scale-150 transition-transform duration-700">
                    <i className={`fas ${item.icon} text-9xl`}></i>
                  </div>
                  <div className={`w-20 h-20 ${item.color} text-white rounded-[28px] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-xl relative z-10`}>
                    <i className={`fas ${item.icon} text-3xl`}></i>
                  </div>
                  <h3 className="text-3xl font-black text-gray-800 relative z-10">{item.title}</h3>
                  <p className="text-gray-400 font-bold text-sm mt-3 uppercase tracking-[0.15em] relative z-10">{item.desc}</p>
                </button>
              ))}
            </div>
            
            {/* Expanded Quote / Tip Section */}
            <div className="bg-gradient-to-br from-sky-50 to-yellow-50 rounded-[60px] p-12 md:p-20 border-4 border-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                  <i className="fas fa-sun text-[20rem] text-yellow-600"></i>
               </div>
               <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
                 <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center text-8xl shadow-inner border-8 border-yellow-100 flex-shrink-0 animate-pulse">
                    🌻
                 </div>
                 <div className="text-center lg:text-left space-y-6 max-w-4xl">
                    <h4 className="text-4xl font-black text-sky-900">Teacher Jessica's Motivation</h4>
                    <p className="text-sky-800 leading-relaxed font-bold text-2xl md:text-3xl opacity-80 italic font-serif">
                      "Just like a sunflower follows the sun to grow tall and strong, if you follow your passion for learning, you will shine brighter every single day! Keep practicing your sounds, my little linguist!"
                    </p>
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                      <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>
                      <p className="text-yellow-600 font-black tracking-[0.3em] uppercase text-lg">Jessica Lee</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        );
      case 'theory':
        return (
          <div className="py-4">
            <h2 className="text-5xl font-black text-sky-900 mb-10 flex items-center gap-6">
               <i className="fas fa-graduation-cap text-yellow-500"></i>
               Sound Rules Library
            </h2>
            <RuleSection />
          </div>
        );
      case 'verbs':
        return (
          <div className="py-4">
            <h2 className="text-5xl font-black text-sky-900 mb-10 flex items-center gap-6">
               <i className="fas fa-spell-check text-sky-500"></i>
               A1 Verb Collection
            </h2>
            <VerbLibrary />
          </div>
        );
      case 'practice':
        return (
          <div className="py-4">
            <h2 className="text-5xl font-black text-sky-900 mb-10 flex items-center gap-6">
               <i className="fas fa-trophy text-yellow-400"></i>
               Fun Activities
            </h2>
            <Games />
          </div>
        );
      case 'test':
        return (
          <div className="py-4">
            <MiniTest />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(40px) translateY(-10px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-popIn {
          animation: popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
      `}</style>
    </Layout>
  );
};

export default App;
