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
    <div className="min-h-screen w-full bg-[#fbfbfe] text-[#1e1b4b] select-none flex flex-col justify-between">
      {/* Top Header - Full Width, Spacious with Medium-sized Options */}
      <header className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 lg:px-12 py-3.5 sm:py-4 shrink-0 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & School Name */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <img
              src="/logo.png"
              alt="Sri Sairam Kids Play School"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black text-[#1e1b4b] tracking-tight leading-tight">
                Sri Sairam Kids Play School
              </span>
              <span className="text-xs sm:text-sm font-semibold text-indigo-600">
                we make your child genius
              </span>
            </div>
          </div>

          {/* Navigation Controls - Medium Sized */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Active Case Badge */}
            <span className="text-sm font-bold bg-[#ede9fe] text-[#7c3aed] px-4 py-2 border border-purple-200 rounded-lg shadow-xs hidden sm:inline-block">
              {isLower ? 'Small Letters (a – z)' : 'Capital Letters (A – Z)'}
            </span>

            {/* Switch Case Button (Medium) */}
            <button
              onClick={() => navigate(isLower ? '/alphabet/uppercase' : '/alphabet/lowercase')}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-gray-300 hover:border-indigo-500 hover:bg-indigo-50/50 text-[#1e1b4b] text-sm font-bold transition-all cursor-pointer rounded-lg shadow-xs flex items-center gap-2"
            >
              <span>🔤</span>
              <span>{isLower ? 'Capital Letters (A – Z)' : 'Small Letters (a – z)'}</span>
            </button>

            {/* Home Button (Medium) */}
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-all cursor-pointer rounded-lg shadow-sm flex items-center gap-2"
            >
              <span>🏠</span>
              <span>Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid Area - Centered Horizontally & Vertically without empty right-side gaps */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="w-full max-w-5xl xl:max-w-6xl flex flex-col items-center">
          {/* Section Header */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-gray-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e1b4b] tracking-tight">
                Select a Letter to Practice
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                Choose any letter to construct with stroke patterns
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-lg font-bold text-sm shadow-xs">
              <span>⭐</span>
              <span>Progress: {completionCount} of 26 Completed</span>
            </div>
          </div>

          {/* 26 Letter Grid - Clean, spacious, beautifully aligned and centered */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 gap-3 sm:gap-4 w-full justify-items-stretch">
            {displayLetters.map((letter) => {
              const baseLetter = letter.toLowerCase();
              const completed = isLetterCompleted(ct, baseLetter);

              return (
                <button
                  key={letter}
                  onClick={() => navigate(`/practice/${ct}/${baseLetter}`)}
                  className={`
                    relative aspect-square text-3xl sm:text-4xl font-black flex items-center justify-center cursor-pointer transition-all border rounded-xl shadow-xs hover:shadow-md hover:scale-105 active:scale-95
                    ${completed
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-sm'
                      : 'bg-white border-gray-300 hover:border-indigo-600 text-[#1e1b4b] hover:bg-indigo-50/50'
                    }
                  `}
                >
                  {letter}
                  {completed && (
                    <span className="absolute top-1.5 right-1.5 text-xs bg-emerald-600 text-white w-5 h-5 flex items-center justify-center font-bold rounded-full shadow-xs">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Overall Progress Bar Card */}
          <div className="w-full mt-8 sm:mt-10 bg-white p-5 sm:p-6 border border-gray-200 rounded-xl shadow-xs">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm font-bold text-gray-600 whitespace-nowrap">
                Overall Progress
              </span>
              <div className="w-full flex-1 h-3.5 bg-[#ede9fe] rounded-full overflow-hidden border border-purple-100">
                <div
                  className="h-full bg-[#22c55e] transition-all duration-500 rounded-full"
                  style={{ width: `${(completionCount / 26) * 100}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-[#1e1b4b] whitespace-nowrap">
                {completionCount} / 26 Letters ({Math.round((completionCount / 26) * 100)}%)
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Full Width */}
      <footer className="w-full bg-white/80 border-t border-gray-200 px-6 lg:px-12 py-3.5 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
          <span className="font-bold text-[#1e1b4b]">Sri Sairam Kids Play School</span>
          <span>• we make your child genius</span>
        </div>
        <div>
          Interactive Letter Construction System
        </div>
      </footer>
    </div>
  );
}
