
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden w-full">
      {/* Header - Full Width */}
      <header className="bg-white border-b border-sky-100 px-6 py-4 sticky top-0 z-50 w-full shadow-sm">
        <div className="flex items-center justify-between max-w-[1920px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-sky-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden bg-yellow-50 flex items-center justify-center text-4xl">
                <span>🌻</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-sky-900 tracking-tight leading-none">
                Smart Sounds
              </h1>
              <div className="flex items-center gap-2 mt-1">
                 <span className="text-xs font-black text-yellow-600 uppercase tracking-widest">Jessica's Academy</span>
                 <span className="h-1 w-1 bg-sky-200 rounded-full"></span>
                 <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Widescreen Edition</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 bg-sky-50 px-6 py-3 rounded-2xl text-sky-700 text-sm font-black shadow-sm border border-sky-100">
              <i className="fas fa-sun text-yellow-500 animate-spin-slow"></i>
              <span>Stand Strong, Follow the Sun!</span>
            </div>
          </div>

          <button 
            onClick={() => setActiveTab('home')}
            className="md:hidden w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-inner"
          >
            <i className="fas fa-home text-xl"></i>
          </button>
        </div>
      </header>

      {/* Main Content - Expanded */}
      <main className="flex-1 overflow-y-auto w-full px-6 md:px-12 py-8">
        <div className="max-w-[1920px] mx-auto">
          {children}
        </div>
      </main>

      {/* Navigation Footer - Full Width */}
      <nav className="bg-white/80 backdrop-blur-md border-t border-gray-100 p-3 md:p-6 sticky bottom-0 z-50 w-full">
        <div className="max-w-4xl mx-auto grid grid-cols-5 gap-3 md:gap-6">
          {[
            { id: 'home', icon: 'fa-house', label: 'Home' },
            { id: 'theory', icon: 'fa-book-open', label: 'Rules' },
            { id: 'verbs', icon: 'fa-list', label: 'Verbs' },
            { id: 'practice', icon: 'fa-gamepad', label: 'Games' },
            { id: 'test', icon: 'fa-file-signature', label: 'Tests' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-[24px] transition-all group ${
                activeTab === tab.id 
                  ? 'bg-sky-600 text-white shadow-xl scale-110 -translate-y-2' 
                  : 'text-gray-400 hover:text-sky-400 hover:bg-sky-50'
              }`}
            >
              <i className={`fas ${tab.icon} text-xl md:text-2xl mb-1 group-hover:bounce-sm`}></i>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-sm {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .group:hover .group-hover\:bounce-sm {
          animation: bounce-sm 0.6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Layout;
