import { useParams, useNavigate } from 'react-router-dom';
import type { CaseType } from '../types';
import { isLetterCompleted, getCompletionCount } from '../utils/progress';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function AlphabetGrid() {
  const { caseType } = useParams<{ caseType: string }>();
  const navigate = useNavigate();
  const ct = (caseType as CaseType) || 'lowercase';
  const isLower = ct === 'lowercase';
  const completionCount = getCompletionCount(ct);

  const displayLetters = isLower
    ? alphabet
    : alphabet.map(l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-[#fbfbfe] text-[#1e1b4b] p-4 sm:p-6 select-none flex flex-col justify-between">
      {/* Top Header with School Logo and Name */}
      <div className="max-w-5xl mx-auto w-full border-b border-gray-200 pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <img
              src="/logo.png"
              alt="Sri Sairam Kids Play School"
              className="w-10 h-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg font-black text-[#1e1b4b]">
                Sri Sairam Kids Play School
              </span>
              <span className="text-xs font-semibold text-indigo-600">
                we make your child genius
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-bold bg-[#ede9fe] text-[#7c3aed] px-3 py-1 border border-purple-200 rounded-md">
              {isLower ? 'Small Letters (a – z)' : 'Capital Letters (A – Z)'}
            </span>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer rounded-md shadow-xs"
            >
              Home
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="max-w-5xl mx-auto w-full my-auto py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-[#1e1b4b]">
            Select a Letter to Practice
          </h2>
          <span className="text-sm font-bold text-emerald-600">
            Progress: {completionCount}/26 Completed
          </span>
        </div>

        {/* 26 Letter Grid - rounded-2xl buttons */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 gap-2.5 sm:gap-3">
          {displayLetters.map((letter) => {
            const baseLetter = letter.toLowerCase();
            const completed = isLetterCompleted(ct, baseLetter);

            return (
              <button
                key={letter}
                onClick={() => navigate(`/practice/${ct}/${baseLetter}`)}
                className={`
                  relative aspect-square text-3xl font-black flex items-center justify-center cursor-pointer transition-all border rounded-lg shadow-xs hover:shadow-md hover:scale-105
                  ${completed
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                    : 'bg-white border-gray-300 hover:border-indigo-600 text-[#1e1b4b] hover:bg-indigo-50/50'
                  }
                `}
              >
                {letter}
                {completed && (
                  <span className="absolute top-1 right-1 text-xs bg-emerald-600 text-white w-4 h-4 flex items-center justify-center font-bold rounded-full">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 bg-white p-4 border border-gray-200 rounded-lg shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Overall Progress</span>
            <div className="flex-1 h-3 bg-[#ede9fe] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#22c55e] transition-all duration-300 rounded-full"
                style={{ width: `${(completionCount / 26) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-[#1e1b4b]">
              {completionCount} / 26
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto w-full border-t border-gray-200 pt-3 text-xs text-gray-500 flex items-center justify-between">
        <span>Sri Sairam Kids Play School</span>
        <span>Alphabet Practice</span>
      </div>
    </div>
  );
}
