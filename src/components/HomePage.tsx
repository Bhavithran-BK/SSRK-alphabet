import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCompletionCount } from '../utils/progress';

export default function HomePage() {
  const navigate = useNavigate();
  const lcCount = getCompletionCount('lowercase');
  const ucCount = getCompletionCount('uppercase');

  return (
    <div className="min-h-screen bg-[#fbfbfe] text-[#1e1b4b] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* Top Header with Logo and School Name */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Sri Sairam Kids Play School"
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-[#1e1b4b] tracking-tight">
              Sri Sairam Kids Play School
            </span>
            <span className="text-xs sm:text-sm font-semibold text-indigo-600">
              we make your child genius
            </span>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            Alphabet Learning Portal
          </span>
          <span className="text-xs text-emerald-600 font-bold">
            Interactive Handwriting
          </span>
        </div>
      </div>

      {/* Main Choice Section */}
      <div className="w-full max-w-4xl mx-auto my-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-[#1e1b4b] mb-2 tracking-tight">
            Learn English Alphabet Handwriting
          </h1>
          <p className="text-base sm:text-lg text-gray-600 font-medium">
            Drag the patterns, construct the letters, and learn stroke by stroke!
          </p>
        </div>

        {/* Choice Cards (rounded-none buttons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Small Letters Card */}
          <motion.button
            onClick={() => navigate('/practice/lowercase/a')}
            className="bg-white border-2 border-indigo-200 hover:border-indigo-600 p-8 text-center cursor-pointer transition-all shadow-sm hover:shadow-md rounded-none group flex flex-col items-center justify-between"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="w-24 h-24 mb-4 flex items-center justify-center">
              <img
                src="/mascot.png"
                alt="Small Letters"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1e1b4b] mb-1">
                Small Letters Practice
              </h2>
              <div className="text-sm font-bold text-indigo-600 mb-2">
                a – z (26 Letters)
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Construct small letters using Standing Lines, Curves, and Dots
              </p>
            </div>
            <div className="w-full py-2.5 bg-indigo-600 text-white font-bold text-sm group-hover:bg-indigo-700 transition-colors rounded-none">
              Start Small Letters →
            </div>
            {lcCount > 0 && (
              <span className="text-xs text-emerald-600 font-bold mt-2 block">
                ⭐ {lcCount}/26 Completed
              </span>
            )}
          </motion.button>

          {/* Capital Letters Card */}
          <motion.button
            onClick={() => navigate('/practice/uppercase/a')}
            className="bg-white border-2 border-indigo-200 hover:border-indigo-600 p-8 text-center cursor-pointer transition-all shadow-sm hover:shadow-md rounded-none group flex flex-col items-center justify-between"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="w-24 h-24 mb-4 bg-indigo-50 flex items-center justify-center text-6xl font-black text-indigo-600 group-hover:scale-105 transition-transform border border-indigo-100 rounded-none">
              A
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1e1b4b] mb-1">
                Capital Letters Practice
              </h2>
              <div className="text-sm font-bold text-indigo-600 mb-2">
                A – Z (26 Letters)
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Construct capital letters using Standing Lines, Crossing Lines, and Sleeping Lines
              </p>
            </div>
            <div className="w-full py-2.5 bg-indigo-600 text-white font-bold text-sm group-hover:bg-indigo-700 transition-colors rounded-none">
              Start Capital Letters →
            </div>
            {ucCount > 0 && (
              <span className="text-xs text-emerald-600 font-bold mt-2 block">
                ⭐ {ucCount}/26 Completed
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Footer with School Name & Info */}
      <div className="w-full max-w-5xl mx-auto border-t border-gray-200 pt-3 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
          <span className="font-bold text-[#1e1b4b]">Sri Sairam Kids Play School</span>
          <span>• we make your child genius</span>
        </div>
        <div>
          Interactive Letter Construction System
        </div>
      </div>
    </div>
  );
}
