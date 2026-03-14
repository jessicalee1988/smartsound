
import React, { useState, useEffect } from 'react';
import { VERBS, RULES } from '../constants';
import { speak } from '../services/geminiService';
import { Verb, SoundCategory } from '../types';

const Games: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [gameState, setGameState] = useState<'selecting' | 'result'>('selecting');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);

  const generateOddOneOut = () => {
    // Pick a type (s-es or ed)
    const type = Math.random() > 0.5 ? 's-es' : 'ed';
    const typeVerbs = VERBS.filter(v => v.type === type);
    
    // Pick 3 from same category, 1 from different
    const categories = Array.from(new Set(typeVerbs.map(v => v.category)));
    const mainCat = categories[Math.floor(Math.random() * categories.length)];
    const otherCats = categories.filter(c => c !== mainCat);
    const oddCat = otherCats[Math.floor(Math.random() * otherCats.length)];

    const sameWords = typeVerbs.filter(v => v.category === mainCat).sort(() => 0.5 - Math.random()).slice(0, 3);
    const oddWord = typeVerbs.filter(v => v.category === oddCat).sort(() => 0.5 - Math.random())[0];

    const options = [...sameWords, oddWord].sort(() => 0.5 - Math.random());
    
    setCurrentQuestion({
      type: 'odd-one-out',
      question: 'Which word has a DIFFERENT ending sound?',
      options: options,
      correctId: oddWord.id,
      explanation: `${oddWord.modified} ends in ${oddWord.category}, but the others end in ${mainCat}.`
    });
  };

  const generateIdentification = () => {
    const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
    const options = RULES.filter(r => r.type === verb.type).map(r => r.sound);
    
    setCurrentQuestion({
      type: 'identification',
      verb: verb,
      question: `What is the ending sound of "${verb.modified}"?`,
      options: options,
      correctAnswer: verb.category,
      explanation: `${verb.modified} ends in ${verb.category}.`
    });
  };

  const nextQuestion = () => {
    setGameState('selecting');
    setFeedback(null);
    if (Math.random() > 0.5) {
      generateOddOneOut();
    } else {
      generateIdentification();
    }
  };

  useEffect(() => {
    nextQuestion();
  }, []);

  const handleAnswer = (selected: any) => {
    let isCorrect = false;
    if (currentQuestion.type === 'odd-one-out') {
      isCorrect = selected === currentQuestion.correctId;
    } else {
      isCorrect = selected === currentQuestion.correctAnswer;
    }

    if (isCorrect) setScore(score + 10);
    setFeedback({ isCorrect, explanation: currentQuestion.explanation });
    setGameState('result');
    
    // Speak feedback if correct
    if (isCorrect) {
      speak("Great job!");
    } else {
      speak("Not quite, try listening again.");
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="space-y-8 pb-10">
      <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <i className="fas fa-gamepad text-8xl"></i>
        </div>
        <div className="relative z-10">
          <p className="text-blue-100 font-bold text-sm uppercase tracking-widest mb-1">Current Score</p>
          <h2 className="text-5xl font-black">{score}</h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-10 border-2 border-gray-100 shadow-sm min-h-[400px] flex flex-col">
        <div className="mb-8">
           <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              {currentQuestion.type === 'odd-one-out' ? 'Odd One Out' : 'Sound Identification'}
           </div>
           <h3 className="text-2xl font-bold text-gray-800 leading-tight">
             {currentQuestion.question}
           </h3>
        </div>

        {currentQuestion.type === 'identification' && (
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gray-50 p-8 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center gap-4 w-full max-w-sm">
               <span className="text-4xl font-black text-blue-600">{currentQuestion.verb.modified}</span>
               <button 
                 onClick={() => speak(currentQuestion.verb.modified)}
                 className="w-16 h-16 bg-blue-500 rounded-2xl text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
               >
                 <i className="fas fa-volume-up text-2xl"></i>
               </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map((opt: any, idx: number) => {
            const isWord = typeof opt === 'object';
            const value = isWord ? opt.modified : opt;
            const id = isWord ? opt.id : opt;

            return (
              <button
                key={idx}
                disabled={gameState === 'result'}
                onClick={() => handleAnswer(id)}
                className={`py-6 px-6 rounded-2xl text-xl font-bold transition-all border-2 text-left flex items-center justify-between group
                  ${gameState === 'result' 
                    ? (isWord ? (id === currentQuestion.correctId ? 'bg-green-100 border-green-500 text-green-700' : 'bg-gray-50 border-gray-100 opacity-50')
                              : (value === currentQuestion.correctAnswer ? 'bg-green-100 border-green-500 text-green-700' : 'bg-gray-50 border-gray-100 opacity-50'))
                    : 'bg-white border-gray-100 hover:border-blue-400 hover:bg-blue-50 text-gray-700'
                  }`}
              >
                <span>{value}</span>
                {isWord && (
                  <div onClick={(e) => { e.stopPropagation(); speak(value); }} className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-sm group-hover:bg-blue-100">
                    <i className="fas fa-volume-up"></i>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {gameState === 'result' && feedback && (
          <div className={`mt-auto p-6 rounded-2xl animate-bounce-subtle ${feedback.isCorrect ? 'bg-green-100 border-2 border-green-200' : 'bg-red-100 border-2 border-red-200'}`}>
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${feedback.isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                 <i className={`fas ${feedback.isCorrect ? 'fa-check' : 'fa-times'}`}></i>
              </div>
              <div>
                <h4 className={`font-bold ${feedback.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {feedback.isCorrect ? 'Well done!' : 'Whoops!'}
                </h4>
                <p className={`${feedback.isCorrect ? 'text-green-700' : 'text-red-700'} text-sm mt-1`}>
                  {feedback.explanation}
                </p>
                <button
                  onClick={nextQuestion}
                  className={`mt-4 px-6 py-2 rounded-xl font-bold transition-all shadow-sm ${
                    feedback.isCorrect ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                >
                  Next Question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
