import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCompletionCount } from '../utils/progress';

export default function HomePage() {
  const navigate = useNavigate();
  const lcCount = getCompletionCount('lowercase');
  const ucCount = getCompletionCount('uppercase');

  return (
    <div className="min-h-screen w-full bg-[#fbfbfe] text-[#1e1b4b] flex flex-col select-none">
      {/* Header */}
      <header className="w-full px-6 lg:px-10 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Sri Sairam Kids Play School"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-[#1e1b4b] tracking-tight">
                Sri Sairam Kids Play School
              </span>
              <span className="text-xs sm:text-sm font-semibold text-indigo-600 tracking-wide">
                we make your child genius
              </span>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Alphabet Learning Portal
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 inline-block mt-0.5">
              Interactive Handwriting
            </span>
          </div>
        </div>
      </header>

      {/* Main Content — flex-1 to fill remaining height, centers vertically & horizontally */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-10 py-8 sm:py-12">
        {/* Hero Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-[#1e1b4b] mb-3 tracking-tight">
            Learn English Alphabet Handwriting
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-medium">
            Drag the patterns, construct the letters, and learn stroke by stroke!
          </p>
        </div>

        {/* Choice Cards — centered grid that stretches to fill available width */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Small Letters Card */}
          <motion.div
            onClick={() => navigate('/practice/lowercase/a')}
            className="bg-white border border-gray-200 hover:border-indigo-400 p-8 sm:p-10 text-center cursor-pointer transition-all shadow-sm hover:shadow-lg rounded-lg group flex flex-col items-center"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="w-28 h-28 mb-5 flex items-center justify-center">
              <img
                src="/mascot.png"
                alt="Small Letters"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e1b4b] mb-1.5">
              Small Letters Practice
            </h2>
            <div className="inline-block bg-[#ede9fe] text-[#7c3aed] text-xs sm:text-sm font-bold px-3 py-1 rounded-md mb-2">
              a – z (26 Letters)
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              Construct small letters using Standing Lines, Curves, and Dots
            </p>
            <button className="w-full py-3 px-6 bg-indigo-600 group-hover:bg-indigo-700 text-white font-bold text-sm sm:text-base rounded-md shadow-sm transition-all cursor-pointer">
              Start Small Letters →
            </button>
            {lcCount > 0 && (
              <span className="text-xs text-emerald-600 font-bold mt-3 block">
                ⭐ {lcCount}/26 Completed
              </span>
            )}
          </motion.div>

          {/* Capital Letters Card */}
          <motion.div
            onClick={() => navigate('/practice/uppercase/a')}
            className="bg-white border border-gray-200 hover:border-indigo-400 p-8 sm:p-10 text-center cursor-pointer transition-all shadow-sm hover:shadow-lg rounded-lg group flex flex-col items-center"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.995 }}
          >
            <div className="w-28 h-28 mb-5 bg-indigo-50 rounded-lg flex items-center justify-center text-6xl font-black text-indigo-600 group-hover:scale-105 transition-transform border border-indigo-100">
              A
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e1b4b] mb-1.5">
              Capital Letters Practice
            </h2>
            <div className="inline-block bg-[#ede9fe] text-[#7c3aed] text-xs sm:text-sm font-bold px-3 py-1 rounded-md mb-2">
              A – Z (26 Letters)
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              Construct capital letters using Standing Lines, Crossing Lines, and Sleeping Lines
            </p>
            <button className="w-full py-3 px-6 bg-indigo-600 group-hover:bg-indigo-700 text-white font-bold text-sm sm:text-base rounded-md shadow-sm transition-all cursor-pointer">
              Start Capital Letters →
            </button>
            {ucCount > 0 && (
              <span className="text-xs text-emerald-600 font-bold mt-3 block">
                ⭐ {ucCount}/26 Completed
              </span>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 lg:px-10 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2 bg-white/80">
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
