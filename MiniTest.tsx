
import React, { useState, useEffect } from 'react';
import { VERBS, RULES } from '../constants';
import { speak } from '../services/geminiService';
import { Verb, EndingType, SoundCategory } from '../types';

type TestType = EndingType | 'mixed' | 'odd-one-out' | 'voicing' | 'ed-expert';

interface TestConfig {
  id: string;
  title: string;
  description: string;
  type: TestType;
  icon: string;
  color: string;
}

const TESTS: TestConfig[] = [
  { id: 't1', title: 'Past Tense Hero', description: 'Focus on /t/, /d/, and /ɪd/ sounds.', type: 'ed', icon: 'fa-history', color: 'bg-orange-500' },
  { id: 't2', title: 'Present Pro', description: 'Focus on /s/, /z/, and /ɪz/ sounds.', type: 's-es', icon: 'fa-clock', color: 'bg-blue-500' },
  { id: 't4', title: 'Odd One Out Master', description: 'Can you find the sound that doesn\'t fit?', type: 'odd-one-out', icon: 'fa-magnifying-glass', color: 'bg-red-500' },
  { id: 't5', title: 'Voicing Master', description: 'Is it Voiced (Vibrating) or Voiceless (Quiet)?', type: 'voicing', icon: 'fa-wind', color: 'bg-emerald-500' },
  { id: 't6', title: 'Ending Expert', description: 'Master the tricky /t/, /d/, and /ɪd/ difference!', type: 'ed-expert', icon: 'fa-graduation-cap', color: 'bg-indigo-600' },
  { id: 't3', title: 'Mega Mix', description: 'A mix of all verb endings and tasks.', type: 'mixed', icon: 'fa-bolt', color: 'bg-purple-600' },
];

const MiniTest: React.FC = () => {
  const [displayTests, setDisplayTests] = useState<TestConfig[]>([]);
  const [activeTest, setActiveTest] = useState<TestConfig | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Randomize tests on mount
  useEffect(() => {
    setDisplayTests([...TESTS].sort(() => 0.5 - Math.random()));
  }, []);

  const isCategoryVoiced = (cat: SoundCategory): boolean => {
    return cat === '/z/' || cat === '/ɪz/' || cat === '/d/' || cat === '/ɪd/';
  };

  const generateTest = (config: TestConfig) => {
    let availableVerbs = VERBS;
    if (config.type === 'ed' || config.type === 'ed-expert') availableVerbs = VERBS.filter(v => v.type === 'ed');
    if (config.type === 's-es') availableVerbs = VERBS.filter(v => v.type === 's-es');
    
    const shuffled = [...availableVerbs].sort(() => 0.5 - Math.random());
    const selectedVerbs = shuffled.slice(0, 10);

    const testQuestions = selectedVerbs.map(verb => {
      // Logic for Voicing Master
      if (config.type === 'voicing') {
        const isVoiced = isCategoryVoiced(verb.category);
        return {
          type: 'voicing-check',
          verb: verb,
          question: `Is the ending of "${verb.modified}" a Voiced (vibrating) or Voiceless (quiet) sound?`,
          options: ['Voiced (Vibrating)', 'Voiceless (Quiet)'],
          correctAnswer: isVoiced ? 'Voiced (Vibrating)' : 'Voiceless (Quiet)',
          explanation: isVoiced 
            ? `Correct! "${verb.modified}" ends in ${verb.category}, which is a voiced sound. Feel your throat vibrate! 🐝` 
            : `Correct! "${verb.modified}" ends in ${verb.category}, which is a voiceless sound. It's like a quiet whisper. 🤫`
        };
      }

      // Logic for Ending Expert - strictly identification for ed endings
      if (config.type === 'ed-expert') {
        return {
          type: 'identification',
          verb: verb,
          question: `Which -ed sound do you hear at the end of "${verb.modified}"?`,
          options: ['/t/', '/d/', '/ɪd/'],
          correctAnswer: verb.category,
          explanation: `"${verb.modified}" ends with the ${verb.category} sound. Remember: /ɪd/ is only after T or D sounds!`
        };
      }

      const forceOdd = config.type === 'odd-one-out';
      const isOddOneOut = forceOdd || (config.type === 'mixed' && Math.random() > 0.6);
      
      if (isOddOneOut) {
        const sameTypeVerbs = VERBS.filter(v => v.type === verb.type);
        const categories = Array.from(new Set(sameTypeVerbs.map(v => v.category)));
        const mainCat = verb.category;
        const otherCats = categories.filter(c => c !== mainCat);
        const oddCat = otherCats[Math.floor(Math.random() * otherCats.length)];

        const sameWords = sameTypeVerbs
          .filter(v => v.category === mainCat)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        
        const oddWord = VERBS
          .filter(v => v.category === oddCat)
          .sort(() => 0.5 - Math.random())[0];

        const options = [...sameWords, oddWord].sort(() => 0.5 - Math.random());
        
        return {
          type: 'odd-one-out',
          question: 'Find the word with the DIFFERENT ending sound!',
          options: options.map(o => o.modified),
          correctAnswer: oddWord.modified,
          explanation: `"${oddWord.modified}" ends in ${oddWord.category}, but the other words end in ${mainCat}. Great listening!`
        };
      } else {
        const options = RULES.filter(r => r.type === verb.type).map(r => r.sound);
        return {
          type: 'identification',
          verb: verb,
          question: `How do we say the ending of "${verb.modified}"?`,
          options: options,
          correctAnswer: verb.category,
          explanation: `"${verb.modified}" has the ${verb.category} sound at the end.`
        };
      }
    });

    setQuestions(testQuestions);
    setActiveTest(config);
    setCurrentIdx(0);
    setScore(0);
    setIsFinished(false);
    setUserAnswers([]);
    setShowExplanation(false);
    setSelectedOption(null);
  };

  const handleAnswer = (option: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const isCorrect = option === questions[currentIdx].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      speak("Correct! Well done.");
    } else {
      speak("Not quite. Listen again!");
    }
    
    setUserAnswers(prev => [...prev, isCorrect]);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  if (!activeTest) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-black text-sky-900 tracking-tight">Mini Tests</h2>
          <p className="text-gray-500 font-bold text-lg">Challenge yourself and earn cool badges!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTests.map(test => (
            <button
              key={test.id}
              onClick={() => generateTest(test)}
              className="bg-white p-6 md:p-8 rounded-[40px] border-4 border-gray-50 hover:border-sky-400 hover:shadow-2xl transition-all group flex flex-col items-center text-center gap-4"
            >
              <div className={`w-24 h-24 ${test.color} rounded-[32px] flex items-center justify-center text-white text-4xl group-hover:scale-110 transition-transform shadow-lg group-hover:rotate-3`}>
                <i className={`fas ${test.icon}`}></i>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-gray-800 group-hover:text-sky-600 transition-colors">{test.title}</h3>
                <p className="text-gray-500 font-bold text-sm leading-snug mt-2">{test.description}</p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <span className="bg-gray-100 px-4 py-1.5 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest">10 Qs</span>
                  <span className="bg-green-100 px-4 py-1.5 rounded-2xl text-[10px] font-black text-green-600 uppercase tracking-widest">Skill Up</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isFinished) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="bg-white rounded-[50px] p-8 md:p-16 border-4 border-sky-50 shadow-2xl text-center space-y-10 animate-popIn max-w-2xl mx-auto">
        <div className="relative inline-block">
          <div className="text-9xl mb-6 transform hover:scale-110 transition-transform">
            {percentage >= 90 ? '💎' : percentage >= 70 ? '🏆' : percentage >= 50 ? '🥈' : '🥉'}
          </div>
          {percentage >= 90 && (
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center animate-bounce shadow-xl border-4 border-white">
              <i className="fas fa-star"></i>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">You did it!</h2>
          <p className="text-2xl font-black text-sky-600">
            Final Score: {score} / {questions.length}
          </p>
        </div>

        <div className="grid grid-cols-10 gap-2 max-w-sm mx-auto p-4 bg-gray-50 rounded-3xl border-2 border-gray-100">
          {userAnswers.map((correct, i) => (
            <div key={i} className={`h-4 rounded-full ${correct ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.3)]'}`}></div>
          ))}
        </div>

        <div className="bg-yellow-50 p-8 rounded-[40px] border-4 border-yellow-100 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
            <i className="fas fa-quote-right text-6xl text-yellow-600"></i>
          </div>
          <h4 className="font-black text-yellow-900 text-xl mb-3 flex items-center gap-3">
            <i className="fas fa-star text-yellow-500 animate-pulse"></i>
            Teacher Jessica's Word
          </h4>
          <p className="text-yellow-800 font-bold text-lg leading-relaxed relative z-10">
            {percentage === 100 ? "Absolutely perfect! You are a Sound Superhero. Why not try the Mega Mix to stay sharp?" :
             percentage >= 80 ? "Super job! Your ears are getting very sharp. Just watch out for those tricky vowel sounds!" :
             percentage >= 50 ? "Good work! You've got the basics down. Try playing some games to practice the sounds you missed." :
             "Keep your head up! Listening is a skill that grows with practice. Try the Rule section again, you can do it!"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 pt-6">
          <button
            onClick={() => setActiveTest(null)}
            className="flex-1 bg-gray-100 py-5 rounded-[28px] font-black text-gray-600 text-xl hover:bg-gray-200 transition-all active:scale-95"
          >
            All Tests
          </button>
          <button
            onClick={() => generateTest(activeTest)}
            className="flex-1 bg-sky-600 py-5 rounded-[28px] font-black text-white text-xl hover:bg-sky-700 shadow-xl shadow-sky-200 transition-all active:scale-95"
          >
            Play Again!
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
      <div className="flex items-center justify-between bg-white p-5 rounded-[32px] border-2 border-gray-50 shadow-md">
        <button 
          onClick={() => setActiveTest(null)}
          className="w-12 h-12 rounded-2xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center group"
        >
          <i className="fas fa-times text-xl group-hover:rotate-90 transition-transform"></i>
        </button>
        <div className="flex-1 px-10">
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner p-0.5">
            <div 
              className="h-full bg-sky-500 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-sky-50 px-5 py-2 rounded-2xl">
          <span className="font-black text-sky-600 text-lg">
            {currentIdx + 1}<span className="text-sky-300 mx-1">/</span>{questions.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-[50px] p-8 md:p-12 border-4 border-gray-50 shadow-sm min-h-[500px] flex flex-col transition-all">
        <div className="mb-10 text-center">
          <span className="inline-block bg-yellow-100 text-yellow-700 px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
            {activeTest.title}
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">
            {q.question}
          </h3>
        </div>

        {(q.type === 'identification' || q.type === 'voicing-check') && (
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="bg-sky-50 p-12 rounded-[50px] border-4 border-dashed border-sky-100 flex flex-col items-center gap-6 w-full max-w-md group">
               <span className="text-5xl md:text-6xl font-black text-sky-600 group-hover:scale-110 transition-transform">{q.verb.modified}</span>
               <button 
                 onClick={() => speak(q.verb.modified)}
                 className="w-24 h-24 bg-sky-600 rounded-3xl text-white flex items-center justify-center hover:bg-sky-500 shadow-xl active:scale-95 transition-all animate-bounce-slow"
               >
                 <i className="fas fa-volume-up text-4xl"></i>
               </button>
            </div>
          </div>
        )}

        <div className={`grid gap-5 ${q.type === 'odd-one-out' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
          {q.options.map((option: string, i: number) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === q.correctAnswer;
            
            let btnClass = "bg-white border-4 border-gray-50 hover:border-sky-300 hover:bg-sky-50 text-gray-700 hover:-translate-y-1";
            if (selectedOption !== null) {
              if (isCorrect) btnClass = "bg-green-100 border-green-500 text-green-700 shadow-lg scale-[1.02] z-10";
              else if (isSelected) btnClass = "bg-red-100 border-red-500 text-red-700 shadow-lg scale-[1.02] z-10";
              else btnClass = "bg-gray-50 border-gray-50 opacity-40 scale-[0.98]";
            }

            return (
              <button
                key={i}
                disabled={selectedOption !== null}
                onClick={() => handleAnswer(option)}
                className={`py-8 px-8 rounded-[32px] text-2xl font-black transition-all text-center flex items-center justify-center group ${btnClass} relative min-h-[100px]`}
              >
                <span className="flex-1">{option}</span>
                {q.type === 'odd-one-out' && (
                  <div 
                    onClick={(e) => { e.stopPropagation(); speak(option); }}
                    className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all shadow-sm flex-shrink-0 ml-3"
                  >
                    <i className="fas fa-volume-up text-lg"></i>
                  </div>
                )}
                {selectedOption !== null && isCorrect && (
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm shadow-lg border-4 border-white">
                    <i className="fas fa-check"></i>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="mt-10 animate-popIn">
            <div className={`p-8 rounded-[32px] border-4 ${selectedOption === q.correctAnswer ? 'bg-green-50 border-green-100 text-green-900' : 'bg-red-50 border-red-100 text-red-900'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${selectedOption === q.correctAnswer ? 'bg-green-500' : 'bg-red-500'} text-white shadow-lg`}>
                   <i className={`fas ${selectedOption === q.correctAnswer ? 'fa-check' : 'fa-info'} text-xl`}></i>
                </div>
                <div>
                  <h4 className="font-black text-xl mb-1">{selectedOption === q.correctAnswer ? 'Splendid!' : 'Not quite right'}</h4>
                  <p className="font-bold opacity-80 leading-snug text-lg">{q.explanation}</p>
                </div>
              </div>
            </div>
            <button
              onClick={nextQuestion}
              className="w-full mt-8 bg-sky-600 py-6 rounded-[32px] font-black text-white text-xl hover:bg-sky-700 shadow-2xl shadow-sky-100 transition-all flex items-center justify-center gap-4 group"
            >
              <span>{currentIdx < questions.length - 1 ? 'Next Challenge' : 'See Results'}</span>
              <i className="fas fa-chevron-right group-hover:translate-x-2 transition-transform"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniTest;
