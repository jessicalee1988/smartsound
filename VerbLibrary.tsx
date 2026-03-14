
import React, { useState } from 'react';
import { VERBS } from '../constants';
import { speak } from '../services/geminiService';
import { EndingType } from '../types';

const VerbLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<EndingType | 'all'>('all');

  const filteredVerbs = VERBS.filter(v => {
    const matchesSearch = v.modified.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.base.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || v.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search for a verb..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-300 focus:bg-white transition-all outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setFilterType('all')}
            className={`px-5 py-2 rounded-full whitespace-nowrap font-bold text-sm transition-all ${
              filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            All Verbs
          </button>
          <button
            onClick={() => setFilterType('s-es')}
            className={`px-5 py-2 rounded-full whitespace-nowrap font-bold text-sm transition-all ${
              filterType === 's-es' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            -s / -es
          </button>
          <button
            onClick={() => setFilterType('ed')}
            className={`px-5 py-2 rounded-full whitespace-nowrap font-bold text-sm transition-all ${
              filterType === 'ed' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
            }`}
          >
            -ed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVerbs.map(verb => (
          <div key={verb.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-blue-500 uppercase tracking-wide">{verb.base}</span>
                <span className="text-2xl font-bold text-gray-800">{verb.modified}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-lg text-xs font-black text-gray-600">{verb.category}</span>
                <button
                  onClick={() => speak(verb.modified)}
                  className="w-10 h-10 bg-blue-50 rounded-xl text-blue-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                >
                  <i className="fas fa-volume-up"></i>
                </button>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm italic mb-4 bg-blue-50/50 p-3 rounded-xl border border-blue-50">
              "{verb.example}"
            </p>
            
            <button
              onClick={() => speak(verb.example)}
              className="text-xs font-bold text-blue-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              <i className="fas fa-play-circle"></i> Listen to sentence
            </button>
          </div>
        ))}
      </div>
      
      {filteredVerbs.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-400">No verbs found matching your search.</h3>
        </div>
      )}
    </div>
  );
};

export default VerbLibrary;
